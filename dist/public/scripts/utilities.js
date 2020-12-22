'use strict';

var $ = function $(selector) {
  return document.querySelector(selector);
};
var $$ = function $$(selector) {
  return document.querySelectorAll(selector);
};
var getVar = function getVar(elem, varName) {
  return getComputedStyle(elem).getPropertyValue(varName).trim();
};
var setVar = function setVar(elem, varName, value) {
  return elem.style.setProperty(varName, value);
};
var animationEvent = 'onanimationend' in document.documentElement ? 'animationend' : 'webkitAnimationEnd';
var mobileView = 'ontouchstart' in document.documentElement;