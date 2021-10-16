import '@/assets/scss/main.scss';
import '@/assets/scss/vendors/index.scss';
import '@/plugins/svg-import';
import '@/behaviors/hello-world';
import { createUiComponents, log } from '@/lib/classes/utility';
import { HelloWorld } from '@/components/hello-world';
import { GetRequest } from '@/components/sendRequest';
import { WorldMap } from '@/components/worldmap';
import { ModalMobile, ModalDetail } from "@/components/modals/modals";
import { GetInfoAll, GetInfoPerDay } from '@/components/info/getInfos';

async function init() {
	try {
		createUiComponents( '.hello-world', HelloWorld );
		createUiComponents( '.get-request', GetRequest, {
			options: {
				url: '/v3/covid-19/all',
			},
		} );
		createUiComponents( '#latest-data-all', GetInfoAll );
		createUiComponents( '#latest-data-per-day', GetInfoPerDay );
		createUiComponents( '#world-map', WorldMap );
		createUiComponents( '[data-menu-burger]', ModalMobile );
		createUiComponents( '[data-world-map]', ModalDetail );
	} catch ( e ) {
		log( e.message );
	}
}

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', init );
} else {
	init();
}
