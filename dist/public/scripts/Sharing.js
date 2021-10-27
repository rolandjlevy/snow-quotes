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

var Sharing = function (_Utils) {
  _inherits(Sharing, _Utils);

  function Sharing(menu, quotes) {
    _classCallCheck(this, Sharing);

    var _this = _possibleConstructorReturn(this, (Sharing.__proto__ || Object.getPrototypeOf(Sharing)).call(this));

    _this.init();
    return _this;
  }

  _createClass(Sharing, [{
    key: 'test',
    value: function test(longUrl) {
      var url = location.origin + '/shorten?longurl=' + longUrl;
      this.getShortUrl(url).then(function (result) {
        console.log(result);
      });
    }
  }, {
    key: 'init',
    value: function init() {
      var _this2 = this;

      this.sharingLinks = {
        whatsapp: 'https://wa.me/?text=Check+out+the+Snow+Quotes+app+by+@rolandjlevy+-+',
        facebook: 'https://www.facebook.com/sharer/sharer.php?text=Check+out+the+Snow+Quotes+app+by+@rolandjlevy&u=',
        twitter: 'https://twitter.com/intent/tweet?hashtags=node,express,pug,javascript,css&text=Check+out+the+Snow+Quotes+app+by+@rolandjlevy+-&url='
      };
      this.longUrl = location.origin + '/shorten?longurl=' + encodeURIComponent(location.origin);
      this.getShortUrl(this.longUrl).then(function (url) {
        console.log('getShortUrl', url);
        $('input.hidden.url').value = url;
        $('.btn.whatsapp').href = _this2.sharingLinks['whatsapp'] + url;
        $('.btn.twitter').href = _this2.sharingLinks['twitter'] + url;
        $('.btn.facebook').href = _this2.sharingLinks['facebook'] + url;
      });
      this.$('.btn.start').href = this.getQueryString();
    }
  }, {
    key: 'getQueryString',
    value: function getQueryString() {
      var letters = encodeURIComponent(this.$('input.letters').value);
      var quantity = encodeURIComponent(this.$('input.quantity').value);
      var colour = encodeURIComponent(this.$('input.colour').value);
      var multicolour = encodeURIComponent(this.$('input[name=multicolour]').value);
      var str = '/snow?letters=' + letters + '&quantity=' + quantity + '&colour=' + colour + '&multicolour=' + multicolour;
      return str;
    }
  }, {
    key: 'getShortUrl',
    value: function getShortUrl(url) {
      return new Promise(function (resolve, reject) {
        return fetch(url).then(function (res) {
          return res.text();
        }).then(function (data) {
          resolve(data);
        }).catch(function (err) {
          console.log('getShortUrl error:', err);
          reject(err);
        });
      });
    }
  }]);

  return Sharing;
}(_Utils3.default);

exports.default = Sharing;