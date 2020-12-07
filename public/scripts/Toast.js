import Utils from './Utils.js';

export default class Toast extends Utils {
  constructor() {
    super();
    this.reset();
  }
  // Trigger toast message when clicking on a snowflake
  triggerMessage(item, e, menu, quotes) {
    if (this.mobileView || menu.inside(item)) return;
    const id = Number(e.currentTarget.id);
    const { text, author } = quotes.list[id];
    $('.toast-message').style.animationPlayState = 'running';
    $('.toast-message').classList.remove('none');
    $('input.hidden.quote-text').value = `"${text}" by ${author}`;
    $('input.hidden.quote-text').select();
    document.execCommand('copy');
  }
  // Reset toast message for settings copied
  reset() {
    this.$('.toast-message').addEventListener(this.animationEvent, (e) => {
      e.currentTarget.classList.add('none');
    });
  }
  // Run toast message for settings copied
  init() {
    $('.btn.copy').addEventListener('click', (e) => {
      this.$('.toast-message').style.animationPlayState = 'running';
      this.$('.toast-message').classList.remove('none');
      this.$('input.hidden.url').select();
      document.execCommand('copy');
    });
    // Reset toast message for settings copied
    this.$('.toast-message').addEventListener(this.animationEvent, (e) => {
      e.currentTarget.classList.add('none');
    });
  }
}