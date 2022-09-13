import Storage from "./Storage.js";

class CategoryView{
    constructor(){
        this.categories = [];
        document.addEventListener("click", (e)=> this.addNewCategory(e))
    }

    addNewCategory(e){
        e.preventDefault();
        const title = document.querySelector('#category-title').value;
        const description = document.querySelector('#category-description').value;
        if(!title || !description) return;
        Storage.savedCategory({title, description});
        this.setCategory();
        this.creatCategory(this.categories);
        document.querySelector('#category-title').value = "";
        document.querySelector('#category-description').value = ""
    }

    setCategory(){
        this.categories = Storage.getAllCategories();
    }
    creatCategory(){
        let result = `<option value="" class="bg-stone-500 text-stone-300">select a category</option>`;
        this.categories.forEach(element => {
            result += `<option value=${element.id} class="bg-stone-500 text-stone-300">${element.title}</option>`
        });
        const productSelect = document.querySelector('#product-category');
        productSelect.innerHTML = result;
    }
}

export default new CategoryView();