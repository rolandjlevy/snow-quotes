export default class Menu {
  constructor() {
    this.$ = selector => document.querySelector(selector);
    this.$$ = selector => document.querySelectorAll(selector);
    this.getVar = (elem, varName) => getComputedStyle(elem).getPropertyValue(varName).trim();
    this.setVar = (elem, varName, value) => elem.style.setProperty(varName, value);
    this.body = this.$('body');
    this.setColours();
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
      const getColours = this.toggleColourMode();
      this.setVar(this.body, '--mode-text-colour', getColours.text);
      this.setVar(this.body, '--mode-text-hover-colour', getColours.textHover);
      this.setVar(this.body, '--mode-bg-colour', getColours.bg);
    });
  }
  toggleColourMode = () => {
    this.darkMode = !this.darkMode;
    return { 
      text: this.darkMode ? this.darkModeTextColour : this.lightModeTextColour, 
      textHover: this.darkMode ? this.darkModeTextHoverColour : this.lightModeTextHoverColour, 
      bg: this.darkMode ? this.darkModeBgColour : this.lightModeBgColour
    };
  }
  setColours() {
    this.darkMode = true;
    this.darkModeTextColour = this.getVar(this.body, '--dark-mode-text-colour');
    this.darkModeTextHoverColour = this.getVar(this.body, '--dark-mode-text-hover-colour');
    this.darkModeBgColour = this.getVar(this.body, '--dark-mode-bg-colour');
    this.lightModeTextColour = this.getVar(this.body, '--light-mode-text-colour');
    this.lightModeTextHoverColour = this.getVar(this.body, '--light-mode-text-hover-colour');
    this.lightModeBgColour = this.getVar(this.body, '--light-mode-bg-colour');
  }
  inside(elem) {
    const { top, left, width, height } = elem.getBoundingClientRect();
    const menuBottom = this.$('.menu .content').getBoundingClientRect().bottom;
    const menuRight = this.$('.menu .content').getBoundingClientRect().right;
    return top + height/2 < menuBottom && left + width/2 < menuRight;
  }
}