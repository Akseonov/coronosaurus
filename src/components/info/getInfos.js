import { GetInfo } from "@/components/info/getInfo";
import { addCharsIntoString } from "@/lib/classes/utility";

export class GetInfoAll extends GetInfo {
	constructor( element ) {
		super( element, {
			recovered: '#latest-data-all-recovered',
			cases: '#latest-data-all-cases',
			deaths: '#latest-data-all-deaths',
			url: '/v3/covid-19/all',
		} );
	}
}

export class GetInfoPerDay extends GetInfo {
	constructor( element ) {
		super( element, {
			recovered: '#latest-data-per-day-recovered',
			cases: '#latest-data-per-day-cases',
			deaths: '#latest-data-per-day-deaths',
			url: '/v3/covid-19/all',
		} );
	}

	render() {
		if ( Object.keys( this.items ).length !== 0 ) {
			this.options.recovered.innerHTML = addCharsIntoString( this.items.todayRecovered, ' ', 3 );
			this.options.deaths.innerHTML = addCharsIntoString( this.items.todayDeaths, ' ', 3 );
			this.options.cases.innerHTML = addCharsIntoString( this.items.todayCases, ' ', 3 );
		} else {
			this.options.recovered.innerHTML = 'Нет данных';
			this.options.deaths.innerHTML = 'Нет данных';
			this.options.cases.innerHTML = 'Нет данных';
		}
	}
}
