const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const animationEvent =  'onanimationend' in document.documentElement ? 'animationend' : 'webkitAnimationEnd';
const mobileView = 'ontouchstart' in document.documentElement;