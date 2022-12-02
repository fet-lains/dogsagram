export default (el) => {
  let tapedTwice = false;
  const tapHandler = (event) => {
    if (!tapedTwice) {
      tapedTwice = true;
      setTimeout(() => {
        tapedTwice = false;
      }, 500);
      return false;
    }
    event.preventDefault();
  };

  el.addEventListener('touchstart', tapHandler);
};
