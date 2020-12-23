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

var Snowflakes = function (_Utils) {
  _inherits(Snowflakes, _Utils);

  function Snowflakes() {
    _classCallCheck(this, Snowflakes);

    var _this = _possibleConstructorReturn(this, (Snowflakes.__proto__ || Object.getPrototypeOf(Snowflakes)).call(this));

    _this.tooltipOn = false;
    return _this;
  }

  _createClass(Snowflakes, [{
    key: 'init',
    value: function init(toast, menu, quotes) {
      var _this2 = this;

      this.$$('.snowflake').forEach(function (item) {
        item.addEventListener('mouseenter', function (e) {
          if (!_this2.tooltipOn && !menu.inside(item)) {
            var pos = Number(e.currentTarget.id) || parseInt(e.currentTarget.id);
            var q = quotes.list[pos];
            var author = q && !!q.author ? ' ' + q.author : '';
            var quoteHtml = '<span class="quote">' + q.text + '</span>' + author;
            _this2.$('.tooltip').innerHTML = quoteHtml;
            _this2.$('.tooltip').classList.add('active');
            _this2.tooltipOn = true;
            e.currentTarget.style.animationPlayState = 'paused';
            e.currentTarget.style.opacity = 1;
            e.currentTarget.classList.add('hover');
          }
        });
        // Hide quote
        item.addEventListener('mouseleave', function (e) {
          _this2.tooltipOn = false;
          _this2.$('.tooltip').classList.remove('active');
          e.currentTarget.style.animationPlayState = 'running';
          e.currentTarget.style.opacity = _this2.getVar(e.currentTarget, '--opacity');
          e.currentTarget.classList.remove('hover');
        });
        // Trigger toast message when clicking on a snowflake
        item.addEventListener('click', function (e) {
          toast.triggerMessage(item, e, menu, quotes);
        });
      });
    }
  }]);

  return Snowflakes;
}(_Utils3.default);

exports.default = Snowflakes;