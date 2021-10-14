const svgModules = require.context( '@/assets/svg', false, /\.svg$/ );
svgModules.keys().forEach( svgModules );