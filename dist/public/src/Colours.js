'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function Colours() {
    _classCallCheck(this, Colours);

    this.hexChars = [];
    this.base = 16;
    this.initHexChars();
  }

  _createClass(Colours, [{
    key: 'initHexChars',
    value: function initHexChars() {
      var counter = 0;
      while (++counter < this.base) {
        var char = counter.toString(this.base);
        this.hexChars.push(char);
      }
    }
  }, {
    key: 'randomHexString',
    value: function randomHexString() {
      var result = '#';
      var counter = 0;
      while (++counter <= 6) {
        var n = Math.round(Math.random() * (this.hexChars.length - 1));
        result += this.hexChars[n];
      }
      return result;
    }
  }]);

  return Colours;
}();