const Handlebars = require( 'handlebars/runtime' );

module.exports = function( compilation ) {
    const sprite = compilation.assets['coronosaurus.svg'].source();
    return new Handlebars.SafeString( sprite );
};
