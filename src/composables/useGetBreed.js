export default (url) => {
  const breed = url.substring(30).split('/')[0];
  return breed;
};
