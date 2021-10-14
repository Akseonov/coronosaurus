document.addEventListener( 'mouseover', event => {
	const target = event.target.closest( '[data-behaviour=hello-world]' );

	if ( !target ) return;

	alert( 'Hello world from behaviour!' );
} );
