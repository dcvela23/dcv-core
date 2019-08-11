import { offset } from './../../utils/offset'
import { hasClass, addClass, removeClass } from './../../utils/classes'

// helpers

const MathUtils = {
  // map number x from range [a, b] to [c, d]
  map: (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c,
  // linear interpolation
  lerp: (a, b, n) => (1 - n) * a + n * b
}

const body = document.body;

// window size and recalculate on resize
let winsize;
const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeigth};
calcWinsize();

window.addEventListener('resize', calcWinsize);

// scrollY track
let docScroll;
const getYScroll = () => docScroll = window.pageYOffset || document.documentElement.scrollTop;

getYScroll();
window.addEventListener('scroll', getYScroll)

class SmoothScroll {
  // TODO: only in desktop CHROME AND SAFARI
  // TODO: preloadIMAGES in order to calculate the HEIGHT

  constructor(el){
    this.DOM = {main: document.querySelector('.main')};
    this.DOM.scrollable = this.DOM.main.querySelector('div[data-scroll]');

    this.renderedStyles = {
      translationY: {
        // interpolated value
        //we interpolate between the previous and current value to achieve the smooth scrolling effect
        previous: 0,
        // current value
        current: 0,
        // amount to interpolate
        ease: 0.05,
        // current value setter
        setValue: () => docScroll
      }
    }
    getYScroll();
    this.initEvents();
  }

  checkValues() {
    //console.log(this.renderedStyles.translationY.setValue())
  }

  initEvents() {
    this.setBodySize();
    this.updateStyles(); // set the initial values and init layout
    this.setMainStyles(); // set the fixes values to main wrapper

    window.addEventListener('scroll', () => this.checkValues())
    window.addEventListener('resize', () => this.setBodySize())

    requestAnimationFrame(() => this.render());
  }

  setBodySize() {
    // set the heigh of the body in order to keep the scrollbar on the page
    body.style.height = `${this.DOM.scrollable.scrollHeight}px`
  }

  updateStyles() {
    // sets the initial value (no interpolation) - translate the scroll value
    for (const key in this.renderedStyles) {
      this.renderedStyles[key].current = this.renderedStyles[key].previous = this.renderedStyles[key].setValue();
    }
    // translate the scrollable element
    this.translateScrollable();
  }

  translateScrollable() {
    // translates the scrollable element
    this.DOM.scrollable.style.transform = `translate3d(0,${-1*this.renderedStyles.translationY.previous}px,0)`;
  }

  setMainStyles() {
    this.DOM.main.style.position = 'fixed';
    this.DOM.main.style.width = this.DOM.main.style.height = '100%';
    this.DOM.main.style.top = this.DOM.main.style.left = 0;
    this.DOM.main.style.overflow = 'hidden';
  }

  render() {
    for (const key in this.renderedStyles) {
      this.renderedStyles[key].current = this.renderedStyles[key].setValue();
      this.renderedStyles[key].previous = MathUtils.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].ease);
    }

    this.translateScrollable();

    // loop..
    requestAnimationFrame(() => this.render());

  }



} export default SmoothScroll;
