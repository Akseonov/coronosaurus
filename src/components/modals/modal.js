export class Modal {
	/**
	 * Создаем модальное окно и передаем параметры во внутренние свойства
	 * @param element {string} класс dom элемента, при нажатии на который будет открываться модальное окно
	 * @param options {object} объект с наименованиями классов других dom элементов
	 */
	constructor( element, options ) {
		this.element = element;
		this.config = options;
		this.options = Object.assign( {}, this.config );
		this.init();
	}

	/**
	 * Метод инициализации
	 */
	init() {
		this.findElements();
		this.handleActions( this.options.out_block );
	}

	/**
	 * Осуществляет поиск dom элементов по классам из свойства this.options. Если строка начинается не с '.', то
	 * свойство объекта остается неизменным, для дольнейшего использование в classList
	 */
	findElements() {
		for ( const key in this.options ) {
			if ( Object.prototype.hasOwnProperty.call( this.options, key ) ) {
				if ( this.options[key] ) {
					if ( this.options[key][0] === '.' || this.options[key][0] === '#' || this.options[key][0] === '[' ) {
						this.options[key] = document.querySelector( this.options[key] );
					}
				}
			}
		}
	}

	/**
	 * Навешиваем обработчики событий
	 * @param outBlock {boolean} параметр говорящий, имеется ли задний фон у модального окна или нет
	 */
	handleActions( outBlock = false ) {

	}

	/**
	 * Навешиваем обработчик событий для открытия модального окна по клику на блок this.element
	 * @param outBlock {boolean} параметр говорящий, имеется ли задний фон у модального окна или нет
	 */
	actionOpen( outBlock ) {
		if ( this.element ) {
			this.element.addEventListener( 'click', evt => {
				const item = evt.target.closest( `[${ this.options.open_item }]` );
				if ( item ) {
					if ( this.options.container_modal ) {
						this.options.container_modal.classList.toggle( this.options.toggle_class );
					}

					if ( outBlock ) {
						if ( this.options.back_btn ) {
							this.options.back_btn.classList.toggle( this.options.back_toggle );
						}
					}
				}
			} );
		}
	}

	/**
	 * Навешиваем обработчик событий для закрытия модального окна по клику на кнопку закрыть
	 * @param outBlock {boolean} параметр говорящий, имеется ли задний фон у модального окна или нет
	 */
	actionClose( outBlock ) {
		if ( this.options.close_btn ) {
			this.options.close_btn.addEventListener( 'click', evt => {
				const item = evt.target.closest( `[${ this.options.close_item }]` );
				if ( item ) {
					if ( this.options.container_modal ) {
						this.options.container_modal.classList.toggle( this.options.toggle_class );
					}

					if ( outBlock ) {
						if ( this.options.back_btn ) {
							this.options.back_btn.classList.toggle( this.options.back_toggle );
						}
					}
				}
			} );
		}
	}

	/**
	 * Навешиваем обработчик событий для закрытия модального окна по клику на якорную ссылку
	 * @param outBlock {boolean} параметр говорящий, имеется ли задний фон у модального окна или нет
	 */
	actionCloseLink( outBlock ) {
		if ( this.options.close_link ) {
			this.options.close_link = document.querySelectorAll( `[${ this.options.close_link }]` );

			if ( this.options.close_link.length !== 0 ) {
				this.options.close_link.forEach( link => {
					link.addEventListener( 'click', evt => {
						if ( this.options.container_modal ) {
							this.options.container_modal.classList.toggle( this.options.toggle_class );
						}

						if ( outBlock ) {
							if ( this.options.back_btn ) {
								this.options.back_btn.classList.toggle( this.options.back_toggle );
							}
						}
					} );
				} );
			}
		}
	}

	/**
	 * Навешиваем обработчик событий для закрытия модального окна через клавишу ESC
	 * @param outBlock {boolean} параметр говорящий, имеется ли задний фон у модального окна или нет
	 */
	actionCloseEsc( outBlock ) {
		document.addEventListener( 'keydown', key => {
			if ( key.key === "Escape" ) {
				if ( !this.options.container_modal.classList.contains( this.options.toggle_class ) ) {
					if ( this.options.container_modal ) {
						this.options.container_modal.classList.add( this.options.toggle_class );
					}

					if ( outBlock ) {
						if ( this.options.back_btn ) {
							this.options.back_btn.classList.add( this.options.back_toggle );
						}
					}
				}
			}
		} );
	}

	/**
	 * Навешиваем обработчик событий для закрытия модального окна по клику на задний фон модального окна
	 */
	actionCloseBack() {
		if ( this.options.back_btn ) {
			this.options.back_btn.addEventListener( 'click', () => {
				if ( this.options.container_modal ) {
					this.options.container_modal.classList.toggle( this.options.toggle_class );
				}

				this.options.back_btn.classList.toggle( this.options.back_toggle );
			} );
		}
	}

	/**
	 * Навешиваем обработчик событий для открытия модального окна по клику в мобильной версии
	 * @param outBlock {boolean} параметр говорящий, имеется ли задний фон у модального окна или нет
	 */
	actionOpenMobile( outBlock ) {
		if ( this.options.open_mobile_btn ) {
			this.options.open_mobile_btn.addEventListener( 'click', evt => {
				const item = evt.target.closest( `[${ this.options.open_mobile_item }]` );
				if ( item ) {
					if ( this.options.container_modal ) {
						this.options.container_modal.classList.toggle( this.options.toggle_class );
					}

					if ( outBlock ) {
						if ( this.options.back_btn ) {
							this.options.back_btn.classList.toggle( this.options.back_toggle );
						}
					}
				}
			} );
		}
	}

	/**
	 * Навешиваем обработчик событий для возврата на предыдущий уровень мобильного меню
	 */
	actionBack() {
		if ( this.options.sub_container_modal ) {
			const back = this.options.sub_container_modal.querySelector( `[${ this.options.back_arrow }]` );
			if ( back ) {
				back.addEventListener( 'click', () => {
					back.closest( '.mobile-menu-sub' ).classList.toggle( this.options.toggle_class );
				} );
			}
		}
	}
}
