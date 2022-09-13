import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";

document.addEventListener("DOMContentLoaded", () =>{
    CategoryView.setCategory();
    CategoryView.creatCategory();

    ProductView.setProduct();
   // console.log(ProductView)
    ProductView.createProduct(ProductView.products);
})