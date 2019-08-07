import { offset } from './../utils/offset'
import { hasClass, addClass, removeClass } from './../utils/classes'
import { checkInView } from './../utils/checkInView'
import { checkMainEl } from './../utils/checkMainEl'

class ServicesMenu {
  constructor(el){
    this.menu = {el: el};
    this.menuEl = this.menu.el;
    this.menuTop;
    this.menuBottom;
    this.menuHeight = this.menuEl.offsetHeight;
    this.menuLinks = this.menuEl.querySelectorAll('.list__item');
    this.initEventsDesktop();
    this.initEventsMobile();
  }

  initEventsDesktop(){
    var that = this;
    if (window.matchMedia("(min-width: 768px)").matches) {
      if (document.querySelectorAll('#home').length > 0) {
        that.menuHomeNavDesktop();
      }
      if (document.querySelectorAll('#services').length > 0) {
        that.menuServicesNavDesktop();
        that.menuServicesMenuDesktop();
      }
    }
  }

  initEventsMobile(){
    var that = this;
    if (window.matchMedia("(max-width: 767px)").matches) {
      if (document.querySelectorAll('#home').length > 0) {
        that.menuHomeNavMobile();
      }
    }
  }

  menuHomeNavDesktop(){
    var descriptionsHome = document.querySelectorAll('.home-services__descriptions');
    //
    addClass(this.menuLinks[0], 'active')
    addClass(descriptionsHome[0], 'active')
    this.menuLinks.forEach(function(link){
      link.addEventListener("click", function(){
        var activeLink = document.querySelector('.list__item.active');
        var activeDescription = document.querySelector('.home-services__descriptions.active');
        var sectionToData = this.querySelector('div').getAttribute('data-item');
        var sectionTo = document.querySelector('.home-services__descriptions[data-description=' + sectionToData + ']');
        removeClass(activeLink, 'active')
        removeClass(activeDescription, 'active')
        addClass(this, 'active')
        addClass(sectionTo, 'active')
      })
    })
  }

  menuHomeNavMobile(){
    this.menuLinks.forEach(function(link){
      link.addEventListener("click", function(){
        var sectionToData = this.querySelector('div').getAttribute('data-item');
        window.location.href = "/services.html#" + sectionToData;

      })
    })
  }

  menuServicesMenuDesktop(){
    let that = this;
    //
    let sections = document.querySelectorAll('.services-services__description');
    //
    let firstSection = sections[0];
    let firstSectionTop = offset(firstSection).top;
    //
    let lastSection = sections[sections.length - 1];
    let lastSectionHeight = lastSection.offsetHeight;
    let lastSectionTop = offset(lastSection).top;
    let lastSectionBottom = lastSectionHeight + lastSectionTop;
    //
    document.addEventListener("scroll", function(){

      let windowTop = document.documentElement.scrollTop;
      //
      that.menuTop = offset(that.menuEl).top;
      that.menuBottom = that.menuHeight + that.menuTop;
      //aside Menu position
      if (windowTop + 120 >= firstSectionTop  - 150 && windowTop + 120 + that.menuHeight < lastSectionBottom) {
        addClass(that.menuEl, 'fixed');
        removeClass(that.menuEl, 'bottom');
      }  else if (windowTop + 115 + that.menuHeight >= lastSectionBottom ){
        addClass(that.menuEl, 'bottom');
        removeClass(that.menuEl, 'fixed');

      } else if (windowTop + 115 < firstSectionTop){
        removeClass(that.menuEl, 'fixed');
      }
      //check description active
      let sectionsInView = [];
      sections.forEach(function(section){
          if (checkInView(section)){
            sectionsInView.push(section);
          }
      });
      if (sectionsInView.length > 0){
        let mainSection = checkMainEl(sectionsInView);
        if (mainSection === undefined) {
          return
        }
        let mainSectionId = mainSection.getAttribute("data-description");
        let menuItemActive = document.querySelector('.list__item div[data-item=' + mainSectionId +']').parentNode
        that.menuLinks.forEach(function(item){
          removeClass(item, 'active');
        })
        addClass(menuItemActive, 'active');
      }

    })
  }

  menuServicesNavDesktop(){
    var descriptionsServices = document.querySelectorAll('.services-services__description');
    //
    this.menuLinks.forEach(function(link){
      link.addEventListener("click", function(){
        var sectionToData = this.querySelector('div').getAttribute('data-item');
        var sectionTo = document.querySelector('.services-services__description[data-description=' + sectionToData + ']');
        window.scrollTo({
          top: offset(sectionTo).top,
          left: 0,
          behavior: 'smooth'
        });
      })
    })
  }

} export default ServicesMenu;
