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

var Toast = function (_Utils) {
  _inherits(Toast, _Utils);

  function Toast() {
    _classCallCheck(this, Toast);

    var _this = _possibleConstructorReturn(this, (Toast.__proto__ || Object.getPrototypeOf(Toast)).call(this));

    _this.reset();
    return _this;
  }
  // Trigger toast message when clicking on a snowflake


  _createClass(Toast, [{
    key: 'triggerMessage',
    value: function triggerMessage(item, e, menu, quotes) {
      if (this.mobileView || menu.inside(item)) return;
      var id = Number(e.currentTarget.id);
      var _quotes$list$id = quotes.list[id],
          text = _quotes$list$id.text,
          author = _quotes$list$id.author;

      $('.toast-message').style.animationPlayState = 'running';
      $('.toast-message').classList.remove('none');
      $('input.hidden.quote-text').value = '"' + text + '" by ' + author;
      $('input.hidden.quote-text').select();
      document.execCommand('copy');
    }
    // Reset toast message for settings copied

  }, {
    key: 'reset',
    value: function reset() {
      this.$('.toast-message').addEventListener(this.animationEvent, function (e) {
        e.currentTarget.classList.add('none');
      });
    }
    // Run toast message for settings copied

  }, {
    key: 'init',
    value: function init() {
      var _this2 = this;

      $('.btn.copy').addEventListener('click', function (e) {
        _this2.$('.toast-message').style.animationPlayState = 'running';
        _this2.$('.toast-message').classList.remove('none');
        _this2.$('input.hidden.url').select();
        document.execCommand('copy');
      });
      // Reset toast message for settings copied
      this.$('.toast-message').addEventListener(this.animationEvent, function (e) {
        e.currentTarget.classList.add('none');
      });
    }
  }]);

  return Toast;
}(_Utils3.default);

exports.default = Toast;