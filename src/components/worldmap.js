import worldMap from '@/lib/jvectormap/content/world-mill';
import { GetRequest } from '@/components/sendRequest';
import { addCharsIntoString } from "@/lib/classes/utility";

const $ = require( 'jquery' );
require( 'jvectormap-next' )( $ );

export class WorldMap {
	constructor( elem ) {
		this.init( elem );
	}

	async init( elem ) {
		const items = await new GetRequest( '', {
			url: '/v3/covid-19/countries',
		} ).sendRequest();
		console.log( items );

		const getData = {};
		const allData = {};

		items.forEach( item => {
			getData[`${ item.countryInfo.iso2 }`] = item.cases;
			allData[`${ item.countryInfo.iso2 }`] = {
				recovered: item.recovered,
				cases: item.cases,
				deaths: item.deaths,
			};
		} );

		console.log( getData );

		const $mountNode = $( elem );

		$.fn.vectorMap( 'addMap', 'world_mill', worldMap );

		$mountNode.vectorMap( {
			map: 'world_mill',
			backgroundColor: '#ffffff',
			regionStyle: {
				initial: {
					fill: "white",
					"stroke-width": 1,
					stroke: '#9a9a9a',
				},
				hover: {
					"fill-opacity": 0.5,
					cursor: 'pointer',
				},
				selected: {
					fill: 'yellow',
				},
				selectedHover: {
				},
			},
			series: {
				regions: [ {
					values: getData,
					scale: [ '#ffe7e7', '#ff1f1f' ],
					normalizeFunction: 'polynomial',
				} ],
			},
			onRegionTipShow: function( e, el, code ) {
				el.html( `${ el.html() }
				<br><br>Заболевших <br> ${ addCharsIntoString( allData[code].cases, ' ', 3 ) }
				<br><br>Умерших <br> ${ addCharsIntoString( allData[code].deaths, ' ', 3 ) }
				<br><br>Выздоровевших <br> ${ addCharsIntoString( allData[code].recovered, ' ', 3 ) }` );
			},
		} );
	}
}

// const $ = require( 'jquery' );

// var $mountNode = $( '#world-map' );
// $mountNode.empty().css( 'height', 500 );

// require('jvectormap-next')($);
// $.fn.vectorMap( 'addMap', 'world_mill', require( '@/lib/jvectormap/content/world-mill' ) );

// var gdpData = {
// 	'AF': 16.63,
// 	'AL': 11.58,
// 	'DZ': 158.97,
// 	// ...
// }

// $mountNode.vectorMap( {
// map: 'world_mill',
// series: {
// 	regions: [{
// 		values: gdpData,
// 		scale: ['#C8EEFF', '#0071A4'],
// 		normalizeFunction: 'polynomial'
// 	}]
// },
// onRegionTipShow: function(e, el, code){
// 	el.html(el.html()+' (GDP - '+gdpData[code]+')');
// }
// } );
