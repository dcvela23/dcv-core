
import Navbar from './modules/Navbar.js';
import Banner from './modules/Banner.js';
import SvgTransitions from './modules/animation/svg-transitions.js';

(function() {

  if (document.querySelectorAll('#animation--svg-transitions').length > 0) {
    var SvgTransitionsInit = new SvgTransitions(document.querySelector("#animation--svg-transitions"))
  }
  var NavbarInit = new Navbar(document.querySelector("#nav"));
})()
