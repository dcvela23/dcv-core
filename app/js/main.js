(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _Navbar = require('./modules/Navbar.js');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _ServicesMenu = require('./modules/ServicesMenu.js');

var _ServicesMenu2 = _interopRequireDefault(_ServicesMenu);

var _Banner = require('./modules/Banner.js');

var _Banner2 = _interopRequireDefault(_Banner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var NavbarInit = new _Navbar2.default(document.querySelector("#nav"));
})();

},{"./modules/Banner.js":2,"./modules/Navbar.js":3,"./modules/ServicesMenu.js":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _offset = require('./../utils/offset');

var _classes = require('./../utils/classes');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Banner = function () {
  function Banner(el) {
    _classCallCheck(this, Banner);

    this.banner = { el: el };
    this.bannerEl = this.banner.el;
    this.bannerTop = (0, _offset.offset)(this.bannerEl).top;
    this.bannerHeight = this.bannerEl.offsetHeight;
    this.bannerBottom = this.bannerTop + this.bannerHeight;
    this.bannerWrapper = this.bannerEl.querySelector('.banner__wrapper');
    this.initEvents();
  }

  _createClass(Banner, [{
    key: 'initEvents',
    value: function initEvents() {
      var that = this;
      document.addEventListener("scroll", function () {
        that.addSticky();
      });
    }
  }, {
    key: 'addSticky',
    value: function addSticky() {
      var windowHeight = window.innerHeight;
      var windowTop = document.documentElement.scrollTop;
      var windowBottom = windowTop + windowHeight;
      var navbarRight = document.querySelector('.navbar__right');
      var navbarRight = document.querySelector('.navbar__right');
      var navbarTop = (0, _offset.offset)(document.querySelector('#nav')).top;

      if (navbarTop > 500 && windowBottom - this.bannerWrapper.offsetHeight < this.bannerBottom) {
        if (!(0, _classes.hasClass)(this.bannerWrapper, 'sticky')) {
          (0, _classes.addClass)(this.bannerWrapper, 'sticky');
          (0, _classes.removeClass)(this.bannerWrapper, 'bottom');
          //
          if (window.matchMedia("(min-width: 1024px)").matches) {
            navbarRight.style.transform = 'translateX(245px)';
          }
        }
      } else if (windowBottom - this.bannerWrapper.offsetHeight > this.bannerBottom) {
        (0, _classes.removeClass)(this.bannerWrapper, 'sticky');
        (0, _classes.addClass)(this.bannerWrapper, 'bottom');
      } else {
        (0, _classes.removeClass)(this.bannerWrapper, 'sticky');
        if (window.matchMedia("(min-width: 1024px)").matches) {
          navbarRight.style.transform = 'translateX(0px)';
        }
      }
    }
  }]);

  return Banner;
}();

exports.default = Banner;

},{"./../utils/classes":7,"./../utils/offset":8}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _offset = require('./../utils/offset');

var _classes = require('./../utils/classes');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Navbar = function () {
  function Navbar(el) {
    _classCallCheck(this, Navbar);

    this.navbar = { el: el };
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

  _createClass(Navbar, [{
    key: 'initEvents',
    value: function initEvents() {
      if (document.querySelectorAll('#home').length > 0) {
        this.moveToSection();
      }
    }
  }, {
    key: 'initDesktopEvents',
    value: function initDesktopEvents() {
      var that = this;
      document.addEventListener("scroll", function () {
        that.addSticky();
      });
    }
  }, {
    key: 'initMobileEvents',
    value: function initMobileEvents() {
      var that = this;
      this.navbarMobileMenu.addEventListener("click", function () {
        that.showNavMobile();
      });
      if (document.querySelectorAll('#services').length > 0) {
        this.navbarEl.querySelectorAll('.navbar__links--dropdown__items a').forEach(function (link) {
          link.addEventListener("click", function () {
            (0, _classes.toggleClass)(that.navbarWrapper, 'opened');
          });
        });
      }
    }
  }, {
    key: 'moveToSection',
    value: function moveToSection() {
      var that = this;
      this.navbarLinks.forEach(function (link) {
        if (link.getAttribute('data-link') !== null) {
          link.addEventListener("click", function () {
            event.preventDefault();
            var sectionTo = document.querySelector('#' + link.getAttribute('data-link') + '');
            window.scrollTo({
              top: (0, _offset.offset)(sectionTo).top - 75,
              left: 0,
              behavior: 'smooth'
            });
            (0, _classes.toggleClass)(that.navbarWrapper, 'opened');
          });
        }
      });
    }
  }, {
    key: 'addSticky',
    value: function addSticky() {
      this.navbarTop = (0, _offset.offset)(this.navbarEl).top;

      if (this.navbarTop > 100) {
        if (!(0, _classes.hasClass)(this.navbarEl, 'sticky')) {
          (0, _classes.addClass)(this.navbarEl, 'sticky');
        }
      } else {
        (0, _classes.removeClass)(this.navbarEl, 'sticky');
      }
    }
  }, {
    key: 'showNavMobile',
    value: function showNavMobile() {
      (0, _classes.toggleClass)(this.navbarWrapper, 'opened');
    }
  }]);

  return Navbar;
}();

exports.default = Navbar;

},{"./../utils/classes":7,"./../utils/offset":8}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _offset = require('./../utils/offset');

var _classes = require('./../utils/classes');

var _checkInView = require('./../utils/checkInView');

var _checkMainEl = require('./../utils/checkMainEl');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServicesMenu = function () {
  function ServicesMenu(el) {
    _classCallCheck(this, ServicesMenu);

    this.menu = { el: el };
    this.menuEl = this.menu.el;
    this.menuTop;
    this.menuBottom;
    this.menuHeight = this.menuEl.offsetHeight;
    this.menuLinks = this.menuEl.querySelectorAll('.list__item');
    this.initEventsDesktop();
    this.initEventsMobile();
  }

  _createClass(ServicesMenu, [{
    key: 'initEventsDesktop',
    value: function initEventsDesktop() {
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
  }, {
    key: 'initEventsMobile',
    value: function initEventsMobile() {
      var that = this;
      if (window.matchMedia("(max-width: 767px)").matches) {
        if (document.querySelectorAll('#home').length > 0) {
          that.menuHomeNavMobile();
        }
      }
    }
  }, {
    key: 'menuHomeNavDesktop',
    value: function menuHomeNavDesktop() {
      var descriptionsHome = document.querySelectorAll('.home-services__descriptions');
      //
      (0, _classes.addClass)(this.menuLinks[0], 'active');
      (0, _classes.addClass)(descriptionsHome[0], 'active');
      this.menuLinks.forEach(function (link) {
        link.addEventListener("click", function () {
          var activeLink = document.querySelector('.list__item.active');
          var activeDescription = document.querySelector('.home-services__descriptions.active');
          var sectionToData = this.querySelector('div').getAttribute('data-item');
          var sectionTo = document.querySelector('.home-services__descriptions[data-description=' + sectionToData + ']');
          (0, _classes.removeClass)(activeLink, 'active');
          (0, _classes.removeClass)(activeDescription, 'active');
          (0, _classes.addClass)(this, 'active');
          (0, _classes.addClass)(sectionTo, 'active');
        });
      });
    }
  }, {
    key: 'menuHomeNavMobile',
    value: function menuHomeNavMobile() {
      this.menuLinks.forEach(function (link) {
        link.addEventListener("click", function () {
          var sectionToData = this.querySelector('div').getAttribute('data-item');
          window.location.href = "/services.html#" + sectionToData;
        });
      });
    }
  }, {
    key: 'menuServicesMenuDesktop',
    value: function menuServicesMenuDesktop() {
      var that = this;
      //
      var sections = document.querySelectorAll('.services-services__description');
      //
      var firstSection = sections[0];
      var firstSectionTop = (0, _offset.offset)(firstSection).top;
      //
      var lastSection = sections[sections.length - 1];
      var lastSectionHeight = lastSection.offsetHeight;
      var lastSectionTop = (0, _offset.offset)(lastSection).top;
      var lastSectionBottom = lastSectionHeight + lastSectionTop;
      //
      document.addEventListener("scroll", function () {

        var windowTop = document.documentElement.scrollTop;
        //
        that.menuTop = (0, _offset.offset)(that.menuEl).top;
        that.menuBottom = that.menuHeight + that.menuTop;
        //aside Menu position
        if (windowTop + 120 >= firstSectionTop - 150 && windowTop + 120 + that.menuHeight < lastSectionBottom) {
          (0, _classes.addClass)(that.menuEl, 'fixed');
          (0, _classes.removeClass)(that.menuEl, 'bottom');
        } else if (windowTop + 115 + that.menuHeight >= lastSectionBottom) {
          (0, _classes.addClass)(that.menuEl, 'bottom');
          (0, _classes.removeClass)(that.menuEl, 'fixed');
        } else if (windowTop + 115 < firstSectionTop) {
          (0, _classes.removeClass)(that.menuEl, 'fixed');
        }
        //check description active
        var sectionsInView = [];
        sections.forEach(function (section) {
          if ((0, _checkInView.checkInView)(section)) {
            sectionsInView.push(section);
          }
        });
        if (sectionsInView.length > 0) {
          var mainSection = (0, _checkMainEl.checkMainEl)(sectionsInView);
          if (mainSection === undefined) {
            return;
          }
          var mainSectionId = mainSection.getAttribute("data-description");
          var menuItemActive = document.querySelector('.list__item div[data-item=' + mainSectionId + ']').parentNode;
          that.menuLinks.forEach(function (item) {
            (0, _classes.removeClass)(item, 'active');
          });
          (0, _classes.addClass)(menuItemActive, 'active');
        }
      });
    }
  }, {
    key: 'menuServicesNavDesktop',
    value: function menuServicesNavDesktop() {
      var descriptionsServices = document.querySelectorAll('.services-services__description');
      //
      this.menuLinks.forEach(function (link) {
        link.addEventListener("click", function () {
          var sectionToData = this.querySelector('div').getAttribute('data-item');
          var sectionTo = document.querySelector('.services-services__description[data-description=' + sectionToData + ']');
          window.scrollTo({
            top: (0, _offset.offset)(sectionTo).top,
            left: 0,
            behavior: 'smooth'
          });
        });
      });
    }
  }]);

  return ServicesMenu;
}();

exports.default = ServicesMenu;

},{"./../utils/checkInView":5,"./../utils/checkMainEl":6,"./../utils/classes":7,"./../utils/offset":8}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkInView = undefined;

var _offset = require('./offset.js');

var checkInView = exports.checkInView = function checkInView(el) {
  // console.log(document.documentElement.scrollTop || document.body.scrollTop)
  var windowHeight = window.innerHeight;
  var windowTop = document.documentElement.scrollTop;
  var windowBottom = windowTop + windowHeight;
  //
  var elHeight = el.offsetHeight;
  var elTop = (0, _offset.offset)(el).top;
  var elBottom = elHeight + elTop;
  //
  if (elTop <= windowBottom && elBottom >= windowTop) {
    return true;
  }
};

},{"./offset.js":8}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkMainEl = undefined;

var _offset = require('./offset.js');

var checkMainEl = exports.checkMainEl = function checkMainEl(arrayEl) {
  var arrayObjEl = [];
  //
  var windowHeight = window.innerHeight;
  var windowTop = document.documentElement.scrollTop;
  var windowBottom = windowTop + windowHeight;
  //
  arrayEl.forEach(function (el) {
    var objEl = { el: '' };
    //
    var elHeight = el.offsetHeight;
    var elTop = (0, _offset.offset)(el).top;
    var elBottom = elHeight + elTop;
    //
    var pxInView = void 0;
    //
    if (elTop < windowTop && elBottom > windowBottom) {
      pxInView = windowHeight;
    } else if (elTop > windowTop && elBottom < windowBottom) {
      pxInView = elHeight;
    } else if (elTop < windowTop) {
      pxInView = elBottom - windowTop;
    } else if (elBottom > windowBottom) {
      pxInView = windowBottom - elTop;
    }
    //
    var percentInView = pxInView * 100 / windowHeight;
    objEl.el = el;
    objEl.percentInView = percentInView;
    arrayObjEl.push(objEl);
  });
  //
  var higherPercent = Math.max.apply(Math, arrayObjEl.map(function (obj) {
    return obj.percentInView;
  }));
  var mainElInView = arrayObjEl.find(function (obj) {
    return obj.percentInView === higherPercent;
  });
  //
  if (mainElInView !== undefined) {
    return mainElInView.el;
  }
};

},{"./offset.js":8}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.toggleClass = toggleClass;
function hasClass(el, className) {
	return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
}

function addClass(el, className) {
	if (el.classList) {
		el.classList.add(className);
	} else if (!hasClass(el, className)) {
		el.className += ' ' + className;
	}
}

function removeClass(el, className) {
	if (el.classList) {
		el.classList.remove(className);
	} else {
		el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	}
}

function toggleClass(el, className) {
	if (el.classList) {
		el.classList.toggle(className);
	} else {
		var classes = el.className.split(' ');
		var existingIndex = classes.indexOf(className);

		if (existingIndex >= 0) classes.splice(existingIndex, 1);else classes.push(className);
		el.className = classes.join(' ');
	}
}

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var offset = exports.offset = function offset(el) {
    var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
};

},{}]},{},[1])

//# sourceMappingURL=main.js.map
