const fetchProducts = async (param) => {
  const url = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${param}`);
  const response = await url;
  const jsonReturn = await response.json();
  return jsonReturn;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
