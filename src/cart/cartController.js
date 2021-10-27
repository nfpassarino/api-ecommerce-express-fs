const fileContainer = require('../FileContainer');
const productController = require('./../product/productController');

exports.fetchAllCarts = async () => {
    const cartContainer = await fileContainer.initialize('carritos.txt');
    return cartContainer.getAll();
};

exports.fetchCartById = async (id) => {
    const cartContainer = await fileContainer.initialize('carritos.txt');
    const obj = cartContainer.getById(Number(id));
    return obj;
};

exports.writeNewCart = async (newCart) => {
    const cartContainer = await fileContainer.initialize('carritos.txt');
    const cart = await cartContainer.save(newCart);
    return cart;
};

exports.addProductToCart = async (cartId, productId) => {
    const cartContainer = await fileContainer.initialize('carritos.txt');
    const product = await productController.fetchProductById(productId);
    const cart = await cartContainer.getById(Number(cartId));
    cart.productos.push(product);
    const newCart = await cartContainer.updateById(Number(cartId), cart);
    return newCart;
};

exports.deleteProductToCart = async (cartId, productId) => {
    const cartContainer = await fileContainer.initialize('carritos.txt');
    const cart = await cartContainer.getById(Number(cartId));
    const product = await productController.fetchProductById(productId);
    const cartWithoutProduct = {
        productos: cart.productos.filter(prod => prod.nombre !== product.nombre),
    }
    const newCart = await cartContainer.updateById(Number(cartId), cartWithoutProduct);
    return newCart;
};

exports.deleteCart = async (id) => {
    const cartContainer = await fileContainer.initialize('carritos.txt');
    await cartContainer.deleteById(Number(id));
    return await this.fetchAllCarts();
};
