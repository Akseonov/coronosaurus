const Handlebars = require( 'handlebars/runtime' );

module.exports = function( compilation ) {
    const sprite = compilation.assets['legacy-sprite.svg'].source();
    return new Handlebars.SafeString( sprite );
};
