const saveCartItems = (toSave) => {
  localStorage.setItem('cartItems', JSON.stringify(toSave));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
