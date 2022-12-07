export default (el: HTMLElement, callback: () => void) => {
  let tapedTwice = false;

  const tapHandler = (event: Event): boolean | void => {
    if (!tapedTwice) {
      tapedTwice = true;
      setTimeout(() => {
        tapedTwice = false;
      }, 500);
      return false;
    }
    event.preventDefault();
    callback();
  };

  el.addEventListener('touchstart', tapHandler);
};
