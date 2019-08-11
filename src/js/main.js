
import Navbar from './modules/Navbar.js';
import SvgTransitions from './modules/animation/svg-transitions.js';
import SmoothScroll from './modules/animation/smooth-scroll.js';

(function() {

  if (document.querySelectorAll('#animation--svg-transitions').length > 0) {
    var SvgTransitionsInit = new SvgTransitions(document.querySelector("#animation--svg-transitions"))
  }
  if (document.querySelectorAll('#animation--smooth-scroll').length > 0) {
    var SmoothScrollInit = new SmoothScroll(document.querySelector("#animation--smooth-scroll"))
  }
  var NavbarInit = new Navbar(document.querySelector("#nav"));
})()
