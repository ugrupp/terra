//
// JS entry file
// --------------------------------------------------

// import svgs to build sprite
const svgs = import.meta.globEager('../svg/*.svg')
svgs;

// Load scripts in development and on staging
if (import.meta.env.DEV || !!import.meta.env.VITE_LOAD_BLOCKED_SCRIPTS) {
  const scriptTags = document.querySelectorAll('script[data-cookieconsent]');
  scriptTags.forEach((scriptTag) => {
    scriptTag.type = 'text/javascript';
    eval(scriptTag.innerText);
  });
}

// module imports
import './modules/fontfaceobserver';
import './modules/slider';
import './modules/slider-beta';
import './modules/reveal-animations';
import './modules/gmap';

import Menu from './modules/menu';
import Topbar from './modules/topbar';
import Inputs from './modules/inputs';

// init modules
let menu = new Menu();
new Topbar(menu);
new Inputs();
