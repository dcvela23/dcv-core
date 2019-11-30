import Navbar from './modules/Navbar.js';
import SvgTransitions from './modules/animation/svg-transitions.js';
import SmoothScroll from './modules/animation/smooth-scroll.js';
import TexTrail from './modules/animation/text-trail.js';
import ThreeImage1 from './modules/animation/three-img-1.js';


(function() {
  if (document.querySelectorAll('#animation--svg-transitions').length > 0) {
    var SvgTransitionsInit = new SvgTransitions(document.querySelector("#animation--svg-transitions"))
  }
  if (document.querySelectorAll('#animation--smooth-scroll').length > 0) {
    var SmoothScrollInit = new SmoothScroll(document.querySelector("#animation--smooth-scroll"))
  }

  if (document.querySelectorAll('#animation--text-trail').length > 0) {
    var TexTrailInit = new TexTrail(document.querySelector("#animation--text-trail"))
  }

  if (document.querySelectorAll('#animation--three-img1').length > 0) {
    var ThreeImage1Init = new ThreeImage1(document.querySelector("#animation--three-img1"))
  }


  var NavbarInit = new Navbar(document.querySelector("#nav"));
})()
