(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _Navbar = require('./modules/Navbar.js');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _Banner = require('./modules/Banner.js');

var _Banner2 = _interopRequireDefault(_Banner);

var _svgTransitions = require('./modules/animation/svg-transitions.js');

var _svgTransitions2 = _interopRequireDefault(_svgTransitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {

  if (document.querySelectorAll('#animation--svg-transitions').length > 0) {
    var SvgTransitionsInit = new _svgTransitions2.default(document.querySelector("#animation--svg-transitions"));
  }
  var NavbarInit = new _Navbar2.default(document.querySelector("#nav"));
})();

},{"./modules/Banner.js":2,"./modules/Navbar.js":3,"./modules/animation/svg-transitions.js":5}],2:[function(require,module,exports){
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

},{"./../utils/classes":6,"./../utils/offset":7}],3:[function(require,module,exports){
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

},{"./../utils/classes":6,"./../utils/offset":7}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//
// these easing functions are based on the code of glsl-easing module.
// https://github.com/glslify/glsl-easings
//

var ease = {
  exponentialIn: function exponentialIn(t) {
    return t == 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
  },
  exponentialOut: function exponentialOut(t) {
    return t == 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
  },
  exponentialInOut: function exponentialInOut(t) {
    return t == 0.0 || t == 1.0 ? t : t < 0.5 ? +0.5 * Math.pow(2.0, 20.0 * t - 10.0) : -0.5 * Math.pow(2.0, 10.0 - t * 20.0) + 1.0;
  },
  sineOut: function sineOut(t) {
    var HALF_PI = 1.5707963267948966;
    return Math.sin(t * HALF_PI);
  },
  circularInOut: function circularInOut(t) {
    return t < 0.5 ? 0.5 * (1.0 - Math.sqrt(1.0 - 4.0 * t * t)) : 0.5 * (Math.sqrt((3.0 - 2.0 * t) * (2.0 * t - 1.0)) + 1.0);
  },
  cubicIn: function cubicIn(t) {
    return t * t * t;
  },
  cubicOut: function cubicOut(t) {
    var f = t - 1.0;
    return f * f * f + 1.0;
  },
  cubicInOut: function cubicInOut(t) {
    return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
  },
  quadraticOut: function quadraticOut(t) {
    return -t * (t - 2.0);
  },
  quarticOut: function quarticOut(t) {
    return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
  }
};

exports.default = ease;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _offset = require('./../../utils/offset');

var _classes = require('./../../utils/classes');

var _svgTransitionsEasings = require('./svg-transitions-easings');

var _svgTransitionsEasings2 = _interopRequireDefault(_svgTransitionsEasings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SvgTransitions = function () {
  function SvgTransitions(el) {
    _classCallCheck(this, SvgTransitions);

    this.shapesWrapper = el.querySelector('.shape-overlays');
    this.path = this.shapesWrapper.querySelectorAll('path');
    this.numBeizerPoints = 2;
    this.duration = 1300;
    this.delayPointsArray = [];
    this.delayPointsMax = 0;
    this.delayPerPath = 100;
    this.timeStart = Date.now();
    this.isOpened = false;
    this.isAnimating = false;
    this.navBtns = document.querySelectorAll('.main__wrapper ul li');

    this.initEvents();
  }

  _createClass(SvgTransitions, [{
    key: 'initEvents',
    value: function initEvents() {
      var _this = this;

      this.navBtns.forEach(function (el) {
        el.addEventListener('click', function () {
          _this.toggle();
        });
      });
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.isAnimating = true;
      for (var i = 0; i < this.numBeizerPoints; i++) {
        this.delayPointsArray[i] = 0;
      }
      if (this.isOpened === false) {
        this.open();
      } else {
        this.close();
      }
    }
  }, {
    key: 'open',
    value: function open() {
      this.isOpened = true;
      this.timeStart = Date.now();
      this.renderLoop();
    }
  }, {
    key: 'close',
    value: function close() {
      this.isOpened = false;
      this.timeStart = Date.now();
      this.renderLoop();
    }
  }, {
    key: 'updatePath',
    value: function updatePath(time) {
      var points = [];
      for (var i = 0; i < this.numBeizerPoints; i++) {
        var thisEase = this.isOpened ? i == 1 ? _svgTransitionsEasings2.default.cubicOut : _svgTransitionsEasings2.default.cubicInOut : i == 1 ? _svgTransitionsEasings2.default.cubicInOut : _svgTransitionsEasings2.default.cubicOut;
        points[i] = thisEase(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1)) * 100;
      }

      var str = '';
      str += this.isOpened ? 'M 0 0 V ' + points[0] + ' ' : 'M 0 ' + points[0] + ' ';

      for (var i = 0; i < this.numBeizerPoints - 1; i++) {
        var p = (i + 1) / (this.numBeizerPoints - 1) * 100;
        var cp = p - 1 / (this.numBeizerPoints - 1) * 100 / 2;
        str += 'C ' + cp + ' ' + points[i] + ' ' + cp + ' ' + points[i + 1] + ' ' + p + ' ' + points[i + 1] + ' ';
      }
      str += this.isOpened ? 'V 0 H 0' : 'V 100 H 0';

      return str;
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.isOpened) {
        for (var i = 0; i < this.path.length; i++) {
          this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i)));
        }
      } else {
        for (var i = 0; i < this.path.length; i++) {
          this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - i - 1))));
        }
      }
    }
  }, {
    key: 'renderLoop',
    value: function renderLoop() {
      var _this2 = this;

      this.render();
      if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) {
        requestAnimationFrame(function () {
          _this2.renderLoop();
        });
      } else {
        this.isAnimating = false;
      }
    }
  }]);

  return SvgTransitions;
}();

exports.default = SvgTransitions;

},{"./../../utils/classes":6,"./../../utils/offset":7,"./svg-transitions-easings":4}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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
