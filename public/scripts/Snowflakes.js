import Utils from './Utils.js';

export default class Snowflakes extends Utils {
  constructor(menu, quotes, toast) {
    super();
    this.menu = menu;
    this.quotes = quotes;
    this.toast = toast;
    this.tooltipOn = false;
    this.init();
  }
  init() {
    this.$$('.snowflake').forEach(item => {
      item.addEventListener('mouseenter', (e) => {
        if (!this.tooltipOn && !this.menu.inside(item)) {
          const pos = Number(e.currentTarget.id) || parseInt(e.currentTarget.id);
          const q = this.quotes.list[pos];
          const author = q && !!q.author ? ` ${q.author}` : '';
          const quoteHtml = `<span class="quote">${q.text}</span>${author}`;
          this.$('.tooltip').innerHTML = quoteHtml;
          this.$('.tooltip').classList.add('active');
          this.tooltipOn = true;
          e.currentTarget.style.animationPlayState = 'paused';
          e.currentTarget.style.opacity = 1;
          e.currentTarget.classList.add('hover');
        }
      });
      // Hide quote
      item.addEventListener('mouseleave', (e) => {
        this.tooltipOn = false;
        this.$('.tooltip').classList.remove('active');
        e.currentTarget.style.animationPlayState = 'running';
        e.currentTarget.style.opacity = this.getVar(e.currentTarget, '--opacity');
        e.currentTarget.classList.remove('hover');
      });
      // Trigger toast message when clicking on a snowflake
      item.addEventListener('click', (e) => {
        this.toast.triggerMessage(item, e);
      });
    });
  }

}