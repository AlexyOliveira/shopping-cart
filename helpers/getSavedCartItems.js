const getSavedCartItems = () => {
  const recoveredObject = localStorage.getItem('cartItems');
  
  return JSON.parse(recoveredObject);
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
