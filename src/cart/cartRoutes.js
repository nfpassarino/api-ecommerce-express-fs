const express = require('express');
const cartRoutes = express.Router();
const cartController = require('./cartController');

cartRoutes.get('/:id/productos', (req, res) => {
    const { id } = req.params;
    cartController.fetchCartById(id)
        .then(result => {
            result === null
                ? res.json({
                    message: 'Carrito no encontrado :(',
                })
                : res.json({
                    message: 'Carrito encontrado',
                    data: result.Carts
                })
        })
        .catch(e => console.error(e));
});

cartRoutes.post('/', (req, res) => {
    const isAdmin = req.body.isAdmin;
    if (isAdmin) {
        const newCart = req.body.Cart;
        cartController.writeNewCart(newCart)
            .then(id => {
                cartController.fetchCartById(id)
                    .then(car => res.json({
                        message: 'Carrito guardado',
                        data: car
                    }))
            })
            .catch(e => console.error(e));
    } else {
        res.json({
            error: -1,
            description: 'ruta/metodo no autorizada',
        });
    }
});

cartRoutes.delete('/:id', (req, res) => {
    const { id } = req.params;
    const isAdmin = req.body.isAdmin;
    if (isAdmin) {
        cartController.deleteCart(id)
            .then(all => res.json({
                message: 'Carrito eliminado',
                data: all
            }))
            .catch(e => console.error(e));
    } else {
        res.json({
            error: -1,
            description: 'ruta/metodo no autorizada',
        });
    }
});

module.exports = cartRoutes;
