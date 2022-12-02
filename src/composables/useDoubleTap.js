export default (el, callback) => {
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
    console.log('Tapped twice');
    callback();
  };

  el.addEventListener('touchstart', tapHandler);
};
