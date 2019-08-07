import { offset } from './../utils/offset'
import { hasClass, addClass, removeClass } from './../utils/classes'

class Banner {
  constructor(el){
    this.banner = {el: el};
    this.bannerEl = this.banner.el;
    this.bannerTop = offset(this.bannerEl).top;
    this.bannerHeight = this.bannerEl.offsetHeight;
    this.bannerBottom = this.bannerTop + this.bannerHeight;
    this.bannerWrapper = this.bannerEl.querySelector('.banner__wrapper');
    this.initEvents();
  }

  initEvents(){
    var that = this;
    document.addEventListener("scroll", function(){
      that.addSticky();
    });
  }

  addSticky(){
    var windowHeight = window.innerHeight;
    var windowTop = document.documentElement.scrollTop;
    var windowBottom = windowTop + windowHeight;
    var navbarRight = document.querySelector('.navbar__right');
    var navbarRight = document.querySelector('.navbar__right');
    var navbarTop = offset(document.querySelector('#nav')).top;

    if (navbarTop > 500 && windowBottom - this.bannerWrapper.offsetHeight < this.bannerBottom ){
      if (!hasClass(this.bannerWrapper, 'sticky')){
        addClass(this.bannerWrapper, 'sticky');
        removeClass(this.bannerWrapper, 'bottom');
        //
        if (window.matchMedia("(min-width: 1024px)").matches) {
          navbarRight.style.transform = 'translateX(245px)'
        }
      }
    } else if (windowBottom  - this.bannerWrapper.offsetHeight > this.bannerBottom  ) {
      removeClass(this.bannerWrapper, 'sticky')
      addClass(this.bannerWrapper, 'bottom')

    }else {
      removeClass(this.bannerWrapper, 'sticky')
      if (window.matchMedia("(min-width: 1024px)").matches) {
        navbarRight.style.transform = 'translateX(0px)'
      }
    }
  }
} export default Banner;
