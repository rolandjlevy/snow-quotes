'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);

    this.animationEvent = 'onanimationend' in document.documentElement ? 'animationend' : 'webkitAnimationEnd';
    this.mobileView = 'ontouchstart' in document.documentElement;
  }

  _createClass(Utils, [{
    key: '$',
    value: function $(selector) {
      return document.querySelector(selector);
    }
  }, {
    key: '$$',
    value: function $$(selector) {
      return document.querySelectorAll(selector);
    }
  }, {
    key: 'getVar',
    value: function getVar(elem, varName) {
      return getComputedStyle(elem).getPropertyValue(varName).trim();
    }
  }, {
    key: 'setVar',
    value: function setVar(elem, varName, value) {
      elem.style.setProperty(varName, value);
    }
  }, {
    key: 'isTag',
    value: function isTag(str) {
      return (/<[^>]*>/g.test(str)
      );
    }
  }, {
    key: 'withinFontFaceSet',
    value: function withinFontFaceSet(str) {
      return (/^[0-9a-zA-Z.]+$/g.test(str)
      );
    }
  }]);

  return Utils;
}();

exports.default = Utils;