import '@/assets/scss/main.scss';
import '@/assets/scss/vendors/index.scss';
import '@/plugins/svg-import';
import '@/behaviors/hello-world';
import { createUiComponents, log } from '@/lib/classes/utility';
import { HelloWorld } from '@/components/hello-world';
import { GetRequest } from '@/components/sendRequest';

async function init() {
	try {
		createUiComponents( '.hello-world', HelloWorld );
		createUiComponents( '.get-request', GetRequest, {
			options: {
				url: '/v3/covid-19/all',
			},
		} );
	} catch ( e ) {
		log( e.message );
	}
}

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', init );
} else {
	init();
}
