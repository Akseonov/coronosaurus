import { Modal } from '@/components/modals/modal';

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
