require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Verifica se fetchProducts é uma função', ()=>{
    expect(typeof fetchProducts).toBe('function')
  });

  it('Verifica se a função fetch foi chamada', async ()  => {
   await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  
  it('Testa se, ao chamar a função fetchProducts com o argumento computador, a função fetch utiliza o endpoint https://api.mercadolibre.com/sites/MLB/search?q=computador', async () =>{
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  });
  
  it('Verifica se o retorno da função fetchProducts com o argumento -computador- é uma estrutura de dados igual ao objeto computadorSearch',async ()  => {
     expect(await fetchProducts('computador')).toEqual(computadorSearch);
   });
});

