import { GetRequest } from '@/components/sendRequest';
import { addCharsIntoString } from '@/lib/classes/utility';

export class GetInfo {
	constructor( elem, options ) {
		this.element = elem;
		this.config = options;
		this.options = Object.assign( {}, this.config );
		this.items = null;
		this.init();
	}

	/**
	 * Метод инициализации
	 */
	async init() {
		this.findElements();
		await this.getInfo();
		this.render();
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
	 * Отрисовывает полученные через api данные
	 */
	render() {
		if ( Object.keys( this.items ).length !== 0 ) {
			this.options.recovered.innerHTML = addCharsIntoString( this.items.recovered, ' ', 3 );
			this.options.deaths.innerHTML = addCharsIntoString( this.items.deaths, ' ', 3 );
			this.options.cases.innerHTML = addCharsIntoString( this.items.cases, ' ', 3 );
		} else {
			this.options.recovered.innerHTML = 'Нет данных';
			this.options.deaths.innerHTML = 'Нет данных';
			this.options.cases.innerHTML = 'Нет данных';
		}
	}

	/**
	 * Запрос занных через api
	 * @return {Promise<void>}
	 */
	async getInfo() {
		const items = await new GetRequest( '', {
			url: this.options.url,
		} ).sendRequest()
			.catch( e => {
				return {};
			} );
		this.items = items;
	}
}
