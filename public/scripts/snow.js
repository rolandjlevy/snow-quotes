import Quotes from './Quotes.js';
const quotes = new Quotes();

import Menu from './Menu.js';
const menu = new Menu();

import Toast from './Toast.js';
const toast = new Toast();

import Snowflakes from './Snowflakes.js';
const snowflakes = new Snowflakes();
snowflakes.init(toast, menu, quotes);