const fileContainer = require('../FileContainer');

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

exports.updateCart = async (id, newProduct) => {
    const productContainer = await fileContainer.initialize('carritos.txt');
    const product = await productContainer.updateById(Number(id), newProduct);
    return product;
};

exports.deleteCart = async (id) => {
    const cartContainer = await fileContainer.initialize('carritos.txt');
    await cartContainer.deleteById(Number(id));
    return await fetchAllCarts();
};
