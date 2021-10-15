import worldMap from '@/lib/jvectormap/content/world-mill';

const $ = require( 'jquery' );
require( 'jvectormap-next' )( $ );

export class WorldMap {
	constructor( elem ) {
		this.init( elem );
	}

	init( elem ) {
		const $mountNode = $( elem );
		// $mountNode.empty().css( 'height', 250 );

		$.fn.vectorMap( 'addMap', 'world_mill', worldMap );
		// $mountNode.vectorMap( {
		// 	map: 'world_mill',
		// } );

		const gdpData = {
			AF: 16.63,
			AL: 11.58,
			DZ: 158.97,
			RU: 1500,
		};

		$mountNode.vectorMap( {
			map: 'world_mill',
			backgroundColor: '#ffffff',
			transX: 0,
			transY: 0,
			scale: 3,
			baseTransX: 0,
			baseTransY: 0,
			baseScale: 1,
			regionStyle: {
				initial: {
					// fill: '#ff4747',
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
					values: gdpData,
					scale: [ '#ffb8b8', '#ff6868' ],
					normalizeFunction: 'polynomial',
				} ],
			},
			// onRegionTipShow: function( e, el, code ) {
			// 	el.html( el.html() + ' (GDP - ' + gdpData[code] + ')' );
			// },
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
