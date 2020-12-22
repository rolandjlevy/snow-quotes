'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils2 = require('./Utils.js');

var _Utils3 = _interopRequireDefault(_Utils2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_Utils) {
  _inherits(Menu, _Utils);

  function Menu() {
    _classCallCheck(this, Menu);

    var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this));

    _this.darkMode = true;
    _this.init();
    return _this;
  }

  _createClass(Menu, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      this.$$('.content .menu-icon > i').forEach(function (item) {
        item.addEventListener('click', function (e) {
          return e.preventDefault();
        });
      });
      this.$('.content .menu-icon > i#font').addEventListener('click', function (e) {
        _this2.$$('.snowflake').forEach(function (item) {
          return item.classList.toggle('abc');
        });
      });
      this.$('.content .menu-icon > i#home').addEventListener('click', function (e) {
        location.href = '/';
      });
      this.$('.content .menu-icon > i#mode').addEventListener('click', function (e) {
        _this2.darkMode = !_this2.darkMode;
        _this2.setColourMode('text');
        _this2.setColourMode('text-hover');
        _this2.setColourMode('bg');
      });
    }
  }, {
    key: 'setColourMode',
    value: function setColourMode(prop) {
      var body = this.$('body');
      var type = this.darkMode ? 'dark' : 'light';
      var getColour = this.getVar(body, '--' + type + '-mode-' + prop + '-colour');
      this.setVar(body, '--mode-' + prop + '-colour', getColour);
    }
  }, {
    key: 'inside',
    value: function inside(elem) {
      var _elem$getBoundingClie = elem.getBoundingClientRect(),
          top = _elem$getBoundingClie.top,
          left = _elem$getBoundingClie.left,
          width = _elem$getBoundingClie.width,
          height = _elem$getBoundingClie.height;

      var menuBottom = this.$('.menu .content').getBoundingClientRect().bottom;
      var menuRight = this.$('.menu .content').getBoundingClientRect().right;
      return top + height / 2 < menuBottom && left + width / 2 < menuRight;
    }
  }]);

  return Menu;
}(_Utils3.default);

exports.default = Menu;