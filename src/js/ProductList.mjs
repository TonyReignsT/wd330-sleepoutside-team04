import { renderListWithTemplate } from "./utils.mjs";

//Template for product card
function productCardTemplate(product) {
    return `
    <li class="product-card">
        <a href="product_pages/?product=${product.id}">
            <img src="${product.Image}" alt="Image of ${product.Name}">
            <h2 class="card__brand">${product.Brand.Name}</h2>
            <h3 class="card__name">${product.NameWithoutBrand}</h3>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>`;
}


export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category; //tents
    this.dataSource = dataSource; //the ProductData instance
    this.listElement = listElement; //where to put the products in html
  }
  async init() {
    //fetch the product data from the category
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  // renderList(list) {
  //     Clear the current contents
  //     this.listElement.innerHTML = '';

  //     Render each product using the template
  //     const html = list.map((product) => productCardTemplate(product)).join('');
  //     this.listElement.innerHTML = html;
  // }

  renderList(list) {
    // const htmlStrings = list.map(productCardTemplate);
      // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
      
      renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}