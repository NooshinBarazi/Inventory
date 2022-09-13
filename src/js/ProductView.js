import Storage from "./Storage.js";

const addProductBtn = document.querySelector('#add-product');
const searchInput = document.querySelector('#search');
const sortSelected = document.querySelector('#sort-select');

class ProductView{
    constructor(){
        this.products = [];
        addProductBtn.addEventListener('click', (e) => this.addNewProduct(e));
        searchInput.addEventListener('input', (e) => this.searchProduct(e));
        sortSelected.addEventListener('change', (e) => this.sortedProduct(e));

    }

    addNewProduct(e){
        e.preventDefault();
        const title = document.querySelector('#product-title').value;
        const quantity = document.querySelector('#product-quantity').value;
        const category = document.querySelector('#product-category').value;
        if(!title || !quantity || !category) return;
        Storage.savedProduct({title, quantity, category});
        this.setProduct();
        this.createProduct(this.product);
    }

    setProduct(){
        this.products = Storage.getAllProducts();
    }

    createProduct(products){
        let result = '';
        products.forEach(product => {
            const selectedCategory = Storage.getAllCategories().find(c => c.id == product.category);
            result += `<div id="product-list" class="flex justify-between p-2">
            <span class="text-stone-500 text-sm">${product.title}</span>
            <div class="felx gap-x-3">
                <span class="text-stone-500 text-sm">${new Date().toLocaleDateString('fa-IR')}</span>
                <span class="text-stone-500 text-sm border border-stone-500 rounded-xl px-2 py-0.5">${selectedCategory.title}</span>
                <span class="text-stone-500 text-sm border border-stone-500 px-1 py-0.5  rounded-xl w-7 h-7">${product.quantity}</span>
                <button class="delete-product text-orange-500 text-sm border border-orange-500 rounded-xl px-2 py-0.5" data-product-id = ${product.id}>delete</button>
            </div>
        </div>`
        });
        const productList = document.querySelector('#product-list');
        productList.innerHTML = result;

        const deleteProductBtn = [...document.querySelectorAll('.delete-product')];
        deleteProductBtn.forEach(item =>{
            item.addEventListener('click',(e) => this.deleteProduct(e))
        })

    }

    searchProduct(e){
        const value = e.target.value.trim().toLowerCase();
        const filterdproduct = this.products.filter( p => p.title.toLowerCase().includes(value));
        this.createProduct(filterdproduct);
    }

    sortedProduct(e){
        const value = e.target.value;
        this.products = Storage.getAllProducts(value);
        this.createProduct(this.products);
    }
    
    deleteProduct(e){
      const productId =  e.target.dataset.productId;
      Storage.deleteProduct(productId);
      this.products = Storage.getAllProducts();
      this.createProduct(this.products)
    }

}

export default new ProductView();