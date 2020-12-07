export default class Utils {
  constructor() {
    this.animationEvent =  'onanimationend' in document.documentElement ? 'animationend' : 'webkitAnimationEnd';
    this.mobileView = 'ontouchstart' in document.documentElement;
  }
  $(selector) {
    return document.querySelector(selector);
  }
  $$(selector) {
    return document.querySelectorAll(selector);
  }
  getVar(elem, varName) {
    return getComputedStyle(elem).getPropertyValue(varName).trim();
  }
  setVar(elem, varName, value) {
    elem.style.setProperty(varName, value);
  }
  isTag(str) {
    return /<[^>]*>/g.test(str);
  }
  withinFontFaceSet(str) {
    return /^[0-9a-zA-Z.]+$/g.test(str);
  }
}