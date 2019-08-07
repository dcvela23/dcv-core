import { offset } from './../utils/offset'
import { hasClass, addClass, removeClass, toggleClass } from './../utils/classes'

class Navbar {
  constructor(el){
    this.navbar = {el: el};
    this.navbarEl = this.navbar.el;
    this.navbarHeight = this.navbarEl.offsetHeight;
    this.navbarTop;
    this.navbarBottom = this.navbarHeight + this.navbarTop;
    this.navbarLinks = this.navbarEl.querySelectorAll('a');
    this.navbarWrapper = this.navbarEl.querySelector('.navbar');
    this.navbarMobileMenu = this.navbarEl.querySelector('.navbar__mobile');
    this.initEvents();

    if (window.matchMedia("(min-width: 1024px)").matches) {
      this.initDesktopEvents();
    }
    if (window.matchMedia("(max-width: 1023px)").matches) {
      this.initMobileEvents();
    }
  }
  initEvents(){
    if (document.querySelectorAll('#home').length > 0) {
      this.moveToSection();
    }
  };
  initDesktopEvents(){
    var that = this;
    document.addEventListener("scroll", function(){
      that.addSticky();
    });
  };
  initMobileEvents(){
    var that = this;
    this.navbarMobileMenu.addEventListener("click", function(){
      that.showNavMobile();
    });
    if (document.querySelectorAll('#services').length > 0) {
      this.navbarEl.querySelectorAll('.navbar__links--dropdown__items a').forEach(function(link){
        link.addEventListener("click", function(){
          toggleClass(that.navbarWrapper, 'opened')
        });
      })
    }
  }
  moveToSection(){
    var that = this;
    this.navbarLinks.forEach(function(link){
      if (link.getAttribute('data-link') !== null) {
        link.addEventListener("click", function(){
          event.preventDefault();
          var sectionTo = document.querySelector('#' + link.getAttribute('data-link') + '')
          window.scrollTo({
            top: offset(sectionTo).top - 75,
            left: 0,
            behavior: 'smooth'
          });
          toggleClass(that.navbarWrapper, 'opened')
        });

      }
    })
  };
  addSticky(){
    this.navbarTop = offset(this.navbarEl).top;

    if (this.navbarTop > 100){
      if (!hasClass(this.navbarEl, 'sticky')){
        addClass(this.navbarEl, 'sticky')
      }
    } else {
      removeClass(this.navbarEl, 'sticky')
    }
  }
  showNavMobile(){
    toggleClass(this.navbarWrapper, 'opened')
  }
} export default Navbar;
