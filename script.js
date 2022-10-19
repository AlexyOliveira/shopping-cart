// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,

// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições!
const sectionItens = document.querySelector('.items');
const cartItemsList = document.querySelector('.cart__items');
const cleanButton = document.querySelector('.empty-cart');
const totalPrice = document.querySelector('.total-price');
const inputSearcher = document.querySelector('#inputSearch');
const searcherButton = document.querySelector('#btn');
const excludeItem = document.querySelector('.excludeItem')
// const addCartButton = document.querySelectorAll('item__add');
// Fique a vontade para modificar o código já escrito e criar suas próprias funções!
/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
};

let totalPriceSum = 0; 

const thePrice = async (price) => {
 totalPriceSum += price;
 totalPrice.innerText = totalPriceSum
 .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  
const saveCart = [];

const cartItemClickListener = async (event) => {
  
  event.target.parentNode.remove();
  const saveEvent = event.target.parentNode;
  const saveId = saveEvent.innerText.split(' ')[1];
  const res = await fetchItem(saveId);
  const getPrice = res.price;
  totalPriceSum -= getPrice;
  totalPrice.innerText = totalPriceSum
  .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};
/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) =>
//   product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = async ({ id, title, price }) => {
  const div = document.createElement('div')
  div.innerText = 'x'
  div.className = 'excludeItem btn btn-danger'
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITULO: ${title} | VALOR: $${price}`;
  div.addEventListener('click', cartItemClickListener);
  thePrice(await price);
  li.appendChild(div)
  return li;
};

const endingLoadingText = () => {
  const loading = document.querySelector('.loading');
  loading.remove();
 };

async function addElements(param) {
  const resul = fetchProducts(param).then((dd) => dd.results);
  const final = await resul;
  final.forEach((element) =>
    sectionItens.appendChild(createProductItemElement(element)));
   endingLoadingText();
  /// //addToCart

  const btns = document.querySelectorAll('.item__add');
  btns.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const idCode = btn.parentNode.firstChild.innerText;
      const obj = fetchItem(idCode).then((code) => code);
      const last = await obj;
      cartItemsList.appendChild(await createCartItemElement(last));
    saveCart.push(last);
    saveCartItems(saveCart);
      /// //////
    });
  });
}
cleanButton.addEventListener('click', () => {
  cartItemsList.innerHTML = '';
  totalPrice.innerText = 'Carrinho vazio';
  totalPriceSum = 0;
  localStorage.removeItem('cartItems');
});

const loadingText = () => {
 const span = document.createElement('span');
span.className = 'loading btn btn-warning';
span.innerText = 'carregando...';
document.body.appendChild(span);
};

/////////////////////
const saveToLocalStorage = () => {
console.log(excludeItem)
}
///////////////////////

const searchForProducts = () => {
  if (inputSearcher.value === '') {
    alert('Para pesquisar por favor insira algo no campo de busca!');
    return;
  }
  loadingText();
  sectionItens.innerHTML = '';
  addElements(inputSearcher.value);
};
searcherButton.addEventListener('click', searchForProducts);
window.onload = () => {
  addElements();
  loadingText();
  if (localStorage.getItem('cartItems')) {
  getSavedCartItems().forEach((element) => saveCart.push(element));
getSavedCartItems()
.forEach(async (element) => cartItemsList.appendChild(await createCartItemElement(element))); 
  }
};
