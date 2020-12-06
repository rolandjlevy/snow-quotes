const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const getVar = (elem, varName) => getComputedStyle(elem).getPropertyValue(varName).trim();
const setVar = (elem, varName, value) => elem.style.setProperty(varName, value);
const animationEvent =  'onanimationend' in document.documentElement ? 'animationend' : 'webkitAnimationEnd';
const mobileView = 'ontouchstart' in document.documentElement;