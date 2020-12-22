import Utils from './Utils.js';

export default class Menu extends Utils {
  constructor() {
    super();
    this.darkMode = true;
    this.init();
  }
  init() {
    this.$$('.content .menu-icon > i').forEach(item => {
      item.addEventListener('click', (e) => e.preventDefault());
    });
    this.$('.content .menu-icon > i#font').addEventListener('click', (e) => {
      this.$$('.snowflake').forEach(item => item.classList.toggle('abc'));
    });
    this.$('.content .menu-icon > i#home').addEventListener('click', (e) => {
      location.href = '/';
    });
    this.$('.content .menu-icon > i#mode').addEventListener('click', (e) => {
      this.darkMode = !this.darkMode;
      this.setColourMode('text');
      this.setColourMode('text-hover');
      this.setColourMode('bg');
    });
  }
  setColourMode(prop) {
    const body = this.$('body');
    const type = this.darkMode ? 'dark' : 'light';
    const getColour = this.getVar(body, `--${type}-mode-${prop}-colour`);
    this.setVar(body, `--mode-${prop}-colour`, getColour);
  }
  inside(elem) {
    const { top, left, width, height } = elem.getBoundingClientRect();
    const menuBottom = this.$('.menu .content').getBoundingClientRect().bottom;
    const menuRight = this.$('.menu .content').getBoundingClientRect().right;
    return top + height/2 < menuBottom && left + width/2 < menuRight;
  }
}