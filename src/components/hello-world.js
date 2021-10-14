export class HelloWorld {
	constructor( elem ) {
		setTimeout( () => {
			elem.innerHTML = 'Hello world!';
		}, 2000 );
	}
}
