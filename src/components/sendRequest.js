import req from '@/lib/api';

export class GetRequest {
	constructor( element, options ) {
		this.url = options.url;
		this.data = {};
//		console.log( options.url );
		this.sendRequest();
	};

	async sendRequest() {
//		const word = await req.get( {
//			url: this.url,
//		} );
		console.log( req.get( { url: this.url } ) );
		req.get( {
			url: this.url,
		} )
		.then( res => {
			console.log( res );
			this.data = res;
		} ).catch( err => {
			console.log( err );
		} );
	};
}
