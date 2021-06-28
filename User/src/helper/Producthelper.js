import products from "../data/product.json";

function getProduct(id) {
    return products.filter(product => { return product.id === parseInt(id) })[0];
}


export { getProduct };