//
// JS entry file
// --------------------------------------------------

// SVG <use> polyfill
import 'svgxuse';

// Babel polyfill
// This import will transpile to single core-js module imports. Only the polyfills needed for our target browsers will be imported.
// Powered by `useBuiltIns: usage` in .babelrc
import 'babel-polyfill'; // eslint-disable-line import/no-unresolved

// module imports
import './modules/object-fit-images';
import './modules/fontfaceobserver';
import './modules/scroll-to';
import './modules/slider';
import './modules/reveal-animations';
import './modules/gmap';

import Menu from './modules/menu';
import Topbar from './modules/topbar';
import Inputs from './modules/inputs';

// init modules
let menu = new Menu();
new Topbar(menu);
new Inputs();
