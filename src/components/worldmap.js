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
		} ).sendRequest().catch( e => {
			console.log( e );
			return {};
		} );

		const getData = {};
		const allData = {};

		if ( Object.keys( items ).length !== 0 ) {
			items.forEach( item => {
				getData[`${ item.countryInfo.iso2 }`] = item.cases;
				allData[`${ item.countryInfo.iso2 }`] = {
					recovered: item.recovered,
					cases: item.cases,
					deaths: item.deaths,
				};
			} );
		}

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
				if ( allData[code] ) {
					el.html( `<div class="world-map-tip"><h2 class="world-map-tip__h2 mb-2">${ el.html() }</h2>
					<div class="world-map-tip__container">
						<div class="world-map-tip__text mb-1">Заболевших</div>
						<div class="world-map-tip__count">
							${ allData[code].cases ? addCharsIntoString( allData[code].cases, ' ', 3 ) : 'нет данных' }
						</div>
					</div>
					<div class="world-map-tip__container">
						<div class="world-map-tip__text mb-1">Умерших</div>
						<div class="world-map-tip__count">
							${ allData[code].deaths ? addCharsIntoString( allData[code].deaths, ' ', 3 ) : 'нет данных' }
						</div>
					</div>
					<div class="world-map-tip__container">
						<div class="world-map-tip__text mb-1">Выздоровевших</div>
						<div class="world-map-tip__count">
							${ allData[code].recovered ? addCharsIntoString( allData[code].recovered, ' ', 3 ) : 'нет данных' }
						</div>
					</div>` );
				} else {
					el.html( `<div class="world-map-tip"><h2 class="world-map-tip__h2 mb-2">${ el.html() }</h2></div>
						<div class="world-map-tip__container">
							<div class="world-map-tip__text mb-1">Нет данных</div>
						</div>
					` );
				}
			},
		} );
	}
}
