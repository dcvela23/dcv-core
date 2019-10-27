(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _Navbar = require('./modules/Navbar.js');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _svgTransitions = require('./modules/animation/svg-transitions.js');

var _svgTransitions2 = _interopRequireDefault(_svgTransitions);

var _smoothScroll = require('./modules/animation/smooth-scroll.js');

var _smoothScroll2 = _interopRequireDefault(_smoothScroll);

var _textTrail = require('./modules/animation/text-trail.js');

var _textTrail2 = _interopRequireDefault(_textTrail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {

  if (document.querySelectorAll('#animation--svg-transitions').length > 0) {
    var SvgTransitionsInit = new _svgTransitions2.default(document.querySelector("#animation--svg-transitions"));
  }
  if (document.querySelectorAll('#animation--smooth-scroll').length > 0) {
    var SmoothScrollInit = new _smoothScroll2.default(document.querySelector("#animation--smooth-scroll"));
  }

  if (document.querySelectorAll('#animation--text-trail').length > 0) {
    var TexTrailInit = new _textTrail2.default(document.querySelector("#animation--text-trail"));
  }

  var NavbarInit = new _Navbar2.default(document.querySelector("#nav"));
})();

},{"./modules/Navbar.js":2,"./modules/animation/smooth-scroll.js":3,"./modules/animation/svg-transitions.js":5,"./modules/animation/text-trail.js":6}],2:[function(require,module,exports){
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

},{"./../utils/classes":7,"./../utils/offset":8}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _offset = require('./../../utils/offset');

var _classes = require('./../../utils/classes');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// helpers

var MathUtils = {
  // map number x from range [a, b] to [c, d]
  map: function map(x, a, b, c, d) {
    return (x - a) * (d - c) / (b - a) + c;
  },
  // linear interpolation
  lerp: function lerp(a, b, n) {
    return (1 - n) * a + n * b;
  }
};

var body = document.body;

// window size and recalculate on resize
var winsize = void 0;
var calcWinsize = function calcWinsize() {
  return winsize = { width: window.innerWidth, height: window.innerHeigth };
};
calcWinsize();

window.addEventListener('resize', calcWinsize);

// scrollY track
var docScroll = void 0;
var getYScroll = function getYScroll() {
  return docScroll = window.pageYOffset || document.documentElement.scrollTop;
};

getYScroll();
window.addEventListener('scroll', getYScroll);

var SmoothScroll = function () {
  // TODO: only in desktop CHROME AND SAFARI
  // TODO: preloadIMAGES in order to calculate the HEIGHT

  function SmoothScroll(el) {
    _classCallCheck(this, SmoothScroll);

    this.DOM = { main: document.querySelector('.main') };
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
        setValue: function setValue() {
          return docScroll;
        }
      }
    };
    getYScroll();
    this.initEvents();
  }

  _createClass(SmoothScroll, [{
    key: 'checkValues',
    value: function checkValues() {
      //console.log(this.renderedStyles.translationY.setValue())
    }
  }, {
    key: 'initEvents',
    value: function initEvents() {
      var _this = this;

      this.setBodySize();
      this.updateStyles(); // set the initial values and init layout
      this.setMainStyles(); // set the fixes values to main wrapper

      window.addEventListener('scroll', function () {
        return _this.checkValues();
      });
      window.addEventListener('resize', function () {
        return _this.setBodySize();
      });

      requestAnimationFrame(function () {
        return _this.render();
      });
    }
  }, {
    key: 'setBodySize',
    value: function setBodySize() {
      // set the heigh of the body in order to keep the scrollbar on the page
      body.style.height = this.DOM.scrollable.scrollHeight + 'px';
    }
  }, {
    key: 'updateStyles',
    value: function updateStyles() {
      // sets the initial value (no interpolation) - translate the scroll value
      for (var key in this.renderedStyles) {
        this.renderedStyles[key].current = this.renderedStyles[key].previous = this.renderedStyles[key].setValue();
      }
      // translate the scrollable element
      this.translateScrollable();
    }
  }, {
    key: 'translateScrollable',
    value: function translateScrollable() {
      // translates the scrollable element
      this.DOM.scrollable.style.transform = 'translate3d(0,' + -1 * this.renderedStyles.translationY.previous + 'px,0)';
    }
  }, {
    key: 'setMainStyles',
    value: function setMainStyles() {
      this.DOM.main.style.position = 'fixed';
      this.DOM.main.style.width = this.DOM.main.style.height = '100%';
      this.DOM.main.style.top = this.DOM.main.style.left = 0;
      this.DOM.main.style.overflow = 'hidden';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      for (var key in this.renderedStyles) {
        this.renderedStyles[key].current = this.renderedStyles[key].setValue();
        this.renderedStyles[key].previous = MathUtils.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].ease);
      }

      this.translateScrollable();

      // loop..
      requestAnimationFrame(function () {
        return _this2.render();
      });
    }
  }]);

  return SmoothScroll;
}();

exports.default = SmoothScroll;

},{"./../../utils/classes":7,"./../../utils/offset":8}],4:[function(require,module,exports){
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

},{"./../../utils/classes":7,"./../../utils/offset":8,"./svg-transitions-easings":4}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _offset = require('./../../utils/offset');

var _classes = require('./../../utils/classes');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TexTrail = function () {
  function TexTrail(el) {
    _classCallCheck(this, TexTrail);

    console.log('asd');

    this.initEvents();
  }

  _createClass(TexTrail, [{
    key: 'initEvents',
    value: function initEvents() {}
  }]);

  return TexTrail;
}();

exports.default = TexTrail;

},{"./../../utils/classes":7,"./../../utils/offset":8}],7:[function(require,module,exports){
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
