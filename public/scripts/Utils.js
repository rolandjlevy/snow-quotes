export default class Utils {
  constructor() {
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
}