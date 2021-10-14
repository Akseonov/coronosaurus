import req from '@/lib/api';

export class GetRequest {
	constructor( element, options ) {
		this.url = options.url;
		this.data = {};
		console.log( options.url );
		this.sendRequest();
	};

	sendRequest() {
		req.get( {
			url: this.url,
		} )
		.then( data => {
			this.data = data;
			console.log( this.data );
		} );
	};
}
