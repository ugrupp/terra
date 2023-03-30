//
// JS entry file
// --------------------------------------------------

// import svgs to build sprite
const svgs = import.meta.globEager('../svg/*.svg')
svgs;

// module imports
import './modules/fontfaceobserver';
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
