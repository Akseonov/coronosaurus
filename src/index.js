import '@/assets/scss/main.scss';
import '@/assets/scss/vendors/index.scss';
import '@/plugins/svg-import';
import '@/behaviors/hello-world';
import { createUiComponents, log } from '@/lib/classes/utility';
import { HelloWorld } from '@/components/hello-world';

async function init() {
	try {
		console.log( 'hello' );
		console.log( 'dfgdfgdgd' );
		console.log( 'dgfdfgf' );
		console.log( 'dfgdfgdgd' );
		createUiComponents( '.hello-world', HelloWorld );
	} catch ( e ) {
		log( e.message );
	}
}

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', init );
} else {
	init();
}
