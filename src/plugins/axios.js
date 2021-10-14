import axios                              from 'axios';
import { RequestError, ApiResponseError } from '@/lib/classes/error';

const config = {
    baseURL: '',
    timeout: 60 * 1000,
    withCredentials: true,
};
const instance = axios.create( config );

instance.interceptors.request.use(
    function( config ) {
        return config;
    },
    function( e ) {
        // The request was canceled by client with axios cancelToken
        if ( axios.isCancel( e ) ) return;

        // The request was made but no response was received
        const { status, statusText } = e.request;
        return Promise.reject( new RequestError( status, statusText ) );
    },
);

instance.interceptors.response.use(
    function( response ) {
        // The request was made and the server responded with a status code in the range of 2xx
        const { error, errorMessage, result } = response.data;

        if ( error ) {
            throw new ApiResponseError( errorMessage );
        }

        response.data = result;
        return response;
    },
    function( e ) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        const { status, statusText } = e.response;
        return Promise.reject( new RequestError( status, statusText ) );
    },
);

export { instance as $axios };