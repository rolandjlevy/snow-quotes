'use strict';

var _Quotes = require('./Quotes.js');

var _Quotes2 = _interopRequireDefault(_Quotes);

var _Menu = require('./Menu.js');

var _Menu2 = _interopRequireDefault(_Menu);

var _Toast = require('./Toast.js');

var _Toast2 = _interopRequireDefault(_Toast);

var _Snowflakes = require('./Snowflakes.js');

var _Snowflakes2 = _interopRequireDefault(_Snowflakes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var quotes = new _Quotes2.default();

var menu = new _Menu2.default();

var toast = new _Toast2.default();

var snowflakes = new _Snowflakes2.default();
snowflakes.init(toast, menu, quotes);