/**
 * Преобразует временную метку в выбранный формат.
 */
export function formatLocaleDate(
	timestamp,
	part,
	options,
	isUnix = true,
	locale = 'ru',
) {
	timestamp = isUnix ? ( timestamp * 1000 ) : timestamp;
	const date = new Date( timestamp );

	switch ( part ) {
		case 'full':
			return date.toLocaleString( locale, options );
		case 'date':
			return date.toLocaleDateString( locale, options );
		case 'time':
			return date.toLocaleTimeString( locale, options );
		default:
			return date;
	}
}

/**
 * Очищает текст от спец. символов
 *
 * Внутри использует функцию объекта DOM, поэтому данный метод подходит
 * только для клиентской части.
 */
export function stripHtmlTags( text ) {
	const document = new DOMParser().parseFromString( text, 'text/html' );
	return document.body.textContent || '';
}

/**
 * Кодирует объект с данными в GET-параметры
 */
export function encodeToUriParams( data ) {
	let params = '';

	for ( const [ key, value ] of Object.entries( data ) ) {
		params += ( params === '' ) ? '?' : '&';
		params += key + '=' + encodeURIComponent( value );
	}

	return params;
}

export function log( message ) {
	console.log( message );
}

export function createUiComponents( selector, Component, params = {} ) {
	const {
		options = {},
		calls = [],
	} = params;

	document
		.querySelectorAll( selector )
		.forEach( item => {
			const component = new Component( item, options );

			calls.forEach( name => {
				const method = component[name];

				if ( typeof method === 'function' ) {
					method.call( component );
				}
			} );
		} );
}
