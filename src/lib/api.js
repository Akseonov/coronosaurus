import { RequestError } from '@/lib/classes/error';
import axios from '@/plugins/axios';

/**
 * Отправка GET запроса.
 **/
function apiGet( {
	url,
	headers = {},
	data = {},
	cancelToken,
} ) {
	return apiCall( {
		url, method: 'GET', params: data, headers, cancelToken,
	} );
}

/**
 * Отправка POST запроса.
 */
function apiPost( {
	url,
	headers = {},
	data = {},
	cancelToken,
} ) {
	return apiCall( {
		url, method: 'POST', headers, data, cancelToken,
	} );
}

/**
 * Отправка запроса.
 *
 * Отправляет запрос и возвращает Promise, который завершится с объектом ответа
 * с ключами result, error, errorMessage.
 *
 * @param {String} url - адрес запроса
 * @param {String} method - метод запроса
 * @param {Object} headers - заголовки запроса
 * @param {Object} params - параметры GET-запроса
 * @param {Object} data - данные POST-запроса
 * @param {CancelToken} cancelToken - токен объекта создданного через axios API
 *                                    для ручного прерывания запроса
 *
 * @return {Promise}
 */
function apiCall( {
	url,
	method = 'GET',
	headers = {
		'Access-Control-Allow-Origin': '*',
	},
	params,
	data,
	cancelToken,
} ) {
	// return new Promise( async( resolve, reject ) => {
	return new Promise( ( resolve, reject ) => {
		axios( {
			url,
			method,
			headers,
			params,
			data,
			cancelToken,
		} )
			.then( response => {
				try {
					console.log( response );
					resolve( response.data );
				} catch ( e ) {
					reject( e );
				}
			} )
			.catch( e => {
				const data = e.response || e.request;

				if ( data ) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					// or the request was made but no response was received
					const { status, statusText } = data;
					reject( new RequestError( statusText, status ) );
				} else {
					// Something happened in setting up the request that triggered an Error
					reject( e );
				}
			} );
	} );
}

export default {
	get: apiGet,
	post: apiPost,
};
