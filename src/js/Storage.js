const products = [
  {
    id: 1,
    title: "React.js",
    category: "frontend",
    createdAt: "2021-10-31T15:02:00.411Z",
  },
  {
    id: 2,
    title: "Node.js",
    category: "backend",
    createdAt: "2021-10-31T15:03:23.556Z",
  },
  {
    id: 3,
    title: "Vue.js",
    category: "frontend",
    createdAt: "2021-11-01T10:47:26.889Z",
  },
];

const categories = [
  {
    id: 1,
    title: "frontend",
    description: "frontend of applications",
    createdAt: "2021-11-01T10:47:26.889Z",
  },
  {
    id: 2,
    title: "backend",
    description: "the backend of the applications",
    createdAt: "2021-10-01T10:47:26.889Z",
  },
];

export default class Storage {
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem('category')) || [];
    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
    return sortedCategories;
  }

  static savedCategory(category) {
    const savedCategories = Storage.getAllCategories();
    const existedItems = savedCategories.find(c => c.id === category.id);
    if (existedItems) {
      existedItems.title = category.title;
      existedItems.description = category.description;
    } else {
      category.id = new Date().getTime();
      category.createdAt = new Date().toISOString();
      savedCategories.push(category);
    }
    localStorage.setItem('category', JSON.stringify(savedCategories));
  }

  static getAllProducts(sort = 'newest') {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const sortedProducts = savedProducts.sort((a, b) => {
      if (sort === 'newest') {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (sort === 'oldest') {
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      }
    })
    return sortedProducts;
  }

  static savedProduct(product) {
    const savedProduct = Storage.getAllProducts();
    const existedItems = savedProduct.find(p => p.id === product.id);
    if (existedItems) {
      existedItems.title = product.title;
      existedItems.quantity = product.quantity;
      existedItems.category = product.category;
    } else {
      product.id = new Date().getTime();
      product.createdAt = new Date().toISOString();
      savedProduct.push(product);
    }
    localStorage.setItem('products', JSON.stringify(savedProduct));
  }

  static deleteProduct(id) {
    const savedProducts = Storage.getAllProducts();
    const filterdproducts = savedProducts.filter(p => p.id !== parseInt(id))
    localStorage.setItem('products', JSON.stringify(filterdproducts));
  }

}