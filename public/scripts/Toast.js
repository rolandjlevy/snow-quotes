import Utils from './Utils.js';

export default class Toast extends Utils {
  constructor(menu, quotes) {
    super();
    this.menu = menu;
    this.quotes = quotes;
    this.animationEvent =  'onanimationend' in document.documentElement ? 'animationend' : 'webkitAnimationEnd';
    this.mobileView = 'ontouchstart' in document.documentElement;
    this.init();
  }
  // Trigger toast message when clicking on a snowflake
  triggerMessage(item, e) {
    if (this.mobileView || this.menu.inside(item)) return;
    const id = Number(e.currentTarget.id);
    const { text, author } = this.quotes.list[id];
    $('.toast-message').style.animationPlayState = 'running';
    $('.toast-message').classList.remove('none');
    $('input.hidden.quote-text').value = `"${text}" by ${author}`;
    $('input.hidden.quote-text').select();
    document.execCommand('copy');
  }
  // Reset toast message for settings copied
  init() {
    this.$('.toast-message').addEventListener(this.animationEvent, (e) => {
      e.currentTarget.classList.add('none');
    });
  }
}