import Utils from './Utils.js';

export default class Menu extends Utils {
  constructor() {
    super();
    this.body = this.$('body');
    this.darkMode = true;
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
      const colours = this.toggleColourMode();
      this.setVar(this.body, '--mode-text-colour', colours.text);
      this.setVar(this.body, '--mode-text-hover-colour', colours.textHover);
      this.setVar(this.body, '--mode-bg-colour', colours.bg);
    });
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
  setColoursProps() {
    this.cols = {
      'dmts': this.getVar(this.body, '--dark-mode-text-colour'),
      'dmthc': this.getVar(this.body, '--dark-mode-text-hover-colour'),
      'dmbc': this.getVar(this.body, '--dark-mode-bg-colour'),
      'lmtc': this.getVar(this.body, '--light-mode-text-colour'),
      'lmthc': this.getVar(this.body, '--light-mode-text-hover-colour'),
      'lmbc': this.getVar(this.body, '--light-mode-bg-colour')
    }
  }
  toggleColourMode = () => {
    this.darkMode = !this.darkMode;
    return { 
      text: this.darkMode ? this.darkModeTextColour : this.lightModeTextColour, 
      textHover: this.darkMode ? this.darkModeTextHoverColour : this.lightModeTextHoverColour, 
      bg: this.darkMode ? this.darkModeBgColour : this.lightModeBgColour
    };
  }
  inside(elem) {
    const { top, left, width, height } = elem.getBoundingClientRect();
    const menuBottom = this.$('.menu .content').getBoundingClientRect().bottom;
    const menuRight = this.$('.menu .content').getBoundingClientRect().right;
    return top + height/2 < menuBottom && left + width/2 < menuRight;
  }
}