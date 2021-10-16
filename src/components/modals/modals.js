import { Modal } from '@/components/modals/modal';
import { GetRequest } from '@/components/sendRequest';
import { addCharsIntoString } from "@/lib/classes/utility";

/**
 * Класс для модального окна мобильного меню
 * this.element - атрибут общего блока, контейнера, для открытия модального окна,  должен быть обернут в []
 * this.options.open_item_class - название класса кнопок внутри общего блока this.element,
 *      если имеется несколько кнопок, если кнопока обна, то оставляем тоже самое что и в
 *      this.element, без '.' в начале
 * this.options.close_btn - атрибут общего блока, контейнера, для закрытия модального окна,  должен быть обернут в []
 * this.options.close_item_class - название класса кнопок внутри общего блока this.options.close_btn,
 *      если имеется несколько кнопок, если кнопока обна, то оставляем тоже самое что и в
 *      this.options.close_btn, без '.' в начале
 * this.options.container_modal - атрибут контейнера модального окна,  должен быть обернут в []
 * this.options.toggle_class - название класса, который скрывает модальное окно, без '.' в начале
 * this.options.out_block - true или false, по умолчанию false, определяет, имеется ли задний фон у модального
 *      окна, при клике на который оно будет закрываться.
 * this.options.back_btn - атрибут заднего фона модального окна,  должен быть обернут в []
 * this.options.back_toggle - название класса который скрывает задний фон модального окна, без '.' в начале
 */
export class ModalMobile extends Modal {
	/**
	 * Создаем модальное окно
	 * @param element {string} класс dom элемента, при нажатии на который будет открываться модальное окно
	 */
	constructor( element ) {
		super( element, {
			open_item: 'data-menu-burger',
			close_btn: '[data-mobile-menu-close]',
			close_item: 'data-mobile-menu-close',
			container_modal: '[data-mobile-menu]',
			toggle_class: 'mobile-menu__hidden',
			out_block: true,
			back_btn: '[data-mobile-menu-back]',
			back_toggle: 'mobile-menu__back__hidden',
			close_link: 'data-mobile-menu-close-link',
		} );
	}

	/**
	 * Навешиваем обработчики событий
	 * @param outBlock {boolean} параметр говорящий, имеется ли задний фон у модального окна или нет
	 */
	handleActions( outBlock ) {
		this.actionOpen( outBlock );
		this.actionClose( outBlock );
		this.actionCloseEsc( outBlock );
		this.actionCloseBack();
		this.actionCloseLink( outBlock );
	}
}

export class ModalDetail extends Modal {
	/**
	 * Создаем модальное окно
	 * @param element {string} класс dom элемента, при нажатии на который будет открываться модальное окно
	 */
	constructor( element ) {
		super( element, {
			open_item: 'data-world-map',
			close_btn: '[data-detail-info-close]',
			close_item: 'data-detail-info-close',
			container_modal: '[data-detail-info-container]',
			toggle_class: 'detail-info__hidden',
		} );
		this.data = {};
	}

	/**
	 * Навешиваем обработчики событий
	 */
	async handleActions() {
		await this.getData();
		this.actionOpen();
		this.actionClose();
		this.actionCloseEsc();
		this.render();
	}

	async getData() {
		const items = await new GetRequest( '', {
			url: '/v3/covid-19/countries',
		} ).sendRequest().catch( e => {
			console.log( e );
			return {};
		} );

		const getData = {};

		if ( Object.keys( items ).length !== 0 ) {
			items.forEach( item => {
				getData[`${ item.countryInfo.iso2 }`] = {
					country: item.country,
					recovered: item.recovered,
					cases: item.cases,
					deaths: item.deaths,
					tests: item.tests,
					active: item.active,
					todayCases: item.todayCases,
					todayDeaths: item.todayDeaths,
					todayRecovered: item.todayRecovered,
					critical: item.critical,
					casesPerOneMillion: item.casesPerOneMillion,
					deathsPerOneMillion: item.deathsPerOneMillion,
					activePerOneMillion: item.activePerOneMillion,
					testsPerOneMillion: item.testsPerOneMillion,
					recoveredPerOneMillion: item.recoveredPerOneMillion,
					criticalPerOneMillion: item.criticalPerOneMillion,
					population: item.population,
				};
			} );
		}

		this.data = getData;
	}

	/**
	 * Навешиваем обработчик событий для открытия модального окна по клику на блок this.element
	 */
	actionOpen() {
		if ( this.element ) {
			this.element.addEventListener( 'click', evt => {
				this.render( this.data[evt.target.dataset.code] );

				if ( this.options.container_modal ) {
					this.options.container_modal.classList.toggle( this.options.toggle_class );
				}
			} );
		}
	}

	/**
	 * Навешиваем обработчик событий для закрытия модального окна по клику на кнопку закрыть
	 */
	actionClose() {
		if ( this.options.close_btn ) {
			this.options.close_btn.addEventListener( 'click', evt => {
				const item = evt.target.closest( `[${ this.options.close_item }]` );
				if ( item ) {
					if ( this.options.container_modal ) {
						this.options.container_modal.classList.toggle( this.options.toggle_class );
					}
				}
			} );
		}
	}

	/**
	 * Навешиваем обработчик событий для закрытия модального окна через клавишу ESC
	 */
	actionCloseEsc() {
		document.addEventListener( 'keydown', key => {
			if ( key.key === "Escape" ) {
				if ( !this.options.container_modal.classList.contains( this.options.toggle_class ) ) {
					if ( this.options.container_modal ) {
						this.options.container_modal.classList.add( this.options.toggle_class );
					}
				}
			}
		} );
	}

	render( item ) {
		const elem = document.getElementById( 'detail-main' );

		if ( item ) {
			elem.innerHTML = `<div class="detail-case">
		<div class="detail-case__h2" id="detail-case-сountry">${ item.country }</div>
		<div class="detail-case__wrapper">
			<div class="detail-case__items">
\t\t\t<div class="detail-case__item">
\t\t\t\t<div class="detail-case__data" id="detail-case-cases">
\t\t\t\t\t${ item.cases ? addCharsIntoString( item.cases, ' ', 3 ) : 'Нет данных' }
\t\t\t\t</div>
\t\t\t\t<div class="detail-case__text">Выявленно случаев</div>
\t\t\t</div>
\t\t</div>
\t\t<div class="detail-case__items">
\t\t\t<div class="detail-case__item">
\t\t\t\t<div class="detail-case__data" id="detail-case-deaths">
\t\t\t\t\t${ item.deaths ? addCharsIntoString( item.deaths, ' ', 3 ) : 'Нет данных' }
\t\t\t\t</div>
\t\t\t\t<div class="detail-case__text">Количество умерших</div>
\t\t\t</div>
\t\t</div>
\t\t<div class="detail-case__items">
\t\t\t<div class="detail-case__item">
\t\t\t\t<div class="detail-case__data" id="detail-case-recovered">
\t\t\t\t\t${ item.recovered ? addCharsIntoString( item.recovered, ' ', 3 ) : 'Нет данных' }
\t\t\t\t</div>
\t\t\t\t<div class="detail-case__text">Количество выздоровевших</div>
\t\t\t</div>
\t\t</div>
\t\t<div class="detail-case__items">
\t\t\t<div class="detail-case__item">
\t\t\t\t<div class="detail-case__data" id="detail-case-active">
\t\t\t\t\t${ item.active ? addCharsIntoString( item.active, ' ', 3 ) : 'Нет данных' }
\t\t\t\t</div>
\t\t\t\t<div class="detail-case__text">Количество больных</div>
\t\t\t</div>
\t\t</div>
\t\t<div class="detail-case__items">
\t\t\t<div class="detail-case__item">
\t\t\t\t<div class="detail-case__data" id="detail-case-tests">
\t\t\t\t\t${ item.tests ? addCharsIntoString( item.tests, ' ', 3 ) : 'Нет данных' }
\t\t\t\t</div>
\t\t\t\t<div class="detail-case__text">Количество тестов</div>
\t\t\t</div>
\t\t</div>
\t\t<div class="detail-case__items">
\t\t\t<div class="detail-case__item">
\t\t\t\t<div class="detail-case__data" id="detail-case-critical">
\t\t\t\t\t${ item.critical ? addCharsIntoString( item.critical, ' ', 3 ) : 'Нет данных' }
\t\t\t\t</div>
\t\t\t\t<div class="detail-case__text">Количество критически больных</div>
\t\t\t</div>
\t\t</div>
\t\t<div class="detail-case__items">
\t\t\t<div class="detail-case__item">
\t\t\t\t<div class="detail-case__data" id="detail-case-today-cases">
\t\t\t\t\t${ item.todayCases ? addCharsIntoString( item.todayCases, ' ', 3 ) : 'Нет данных' }
\t\t\t\t</div>
\t\t\t\t<div class="detail-case__text">Выявленно случаев за сегодня</div>
\t\t\t</div>
\t\t</div>
\t\t<div class="detail-case__items">
\t\t\t<div class="detail-case__item">
\t\t\t\t<div class="detail-case__data" id="detail-case-today-deaths">
\t\t\t\t\t${ item.todayDeaths ? addCharsIntoString( item.todayDeaths, ' ', 3 ) : 'Нет данных' }
\t\t\t\t</div>
\t\t\t\t<div class="detail-case__text">Количество умерших за сегодня</div>
\t\t\t</div>
\t\t</div>
\t\t<div class="detail-case__items">
\t\t\t<div class="detail-case__item">
\t\t\t\t<div class="detail-case__data" id="detail-case-today-recovered">
\t\t\t\t\t${ item.todayRecovered ? addCharsIntoString( item.todayRecovered, ' ', 3 ) : 'Нет данных' }
\t\t\t\t</div>
\t\t\t\t<div class="detail-case__text">Количество выздоровевших за сегодня</div>
\t\t\t</div>
\t\t</div>
\t\t<div class="detail-case__items">
\t\t\t<div class="detail-case__item">
\t\t\t\t<div class="detail-case__data" id="detail-case-population">
\t\t\t\t\t${ item.population ? addCharsIntoString( item.population, ' ', 3 ) : 'Нет данных' }
\t\t\t\t</div>
\t\t\t\t<div class="detail-case__text">Население страны</div>
\t\t\t</div>
\t\t</div>
		</div>

		</div>`;
		} else {
			elem.innerHTML = `<div class="detail-case">
				<div class="detail-case__h2" id="detail-case-сountry">Нет данных</div>
			</div>`;
		}
	}
}
