import Quotes from './Quotes.js';
const quotes = new Quotes();

import Menu from './Menu.js';
const menu = new Menu();

import Toast from './Toast.js';
const toast = new Toast(menu, quotes);

import Snowflakes from './Snowflakes.js';
new Snowflakes(menu, quotes, toast);