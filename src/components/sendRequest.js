import req from '@/lib/api';

export class GetRequest {
	constructor( element, options ) {
		this.url = options.url;
		this.data = {};
		this.sendRequest();
	};

	async sendRequest() {
		return req.get( {
			url: this.url,
		} );
	};
}
