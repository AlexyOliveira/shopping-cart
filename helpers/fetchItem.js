const fetchItem = async (id) => {
  const url = fetch(`https://api.mercadolibre.com/items/${id}`);
  const response = await url;
  const jsonReturn = await response.json();
  return jsonReturn;
};
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
