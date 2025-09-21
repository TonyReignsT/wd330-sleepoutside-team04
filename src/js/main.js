import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const dataSource = new ProductData("tents");

//Element where the products should go
const ProductListElement = document.querySelector(".product-list");

//Instance of ProductList
const productList = new ProductList("tents", dataSource, ProductListElement);

productList.init();