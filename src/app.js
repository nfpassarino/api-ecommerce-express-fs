const express = require('express');
const app = express();
const productRoutes = require('./product/productRoutes');
const cartRoutes = require('./cart/cartRoutes');

// config

const PORT = process.env.PORT || 8080;

// middlewares

app.use(express.json());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salio mal :(');
});
app.use('/api/productos', productRoutes);
app.use('/api/carrito', cartRoutes);

// root

app.get('/', async (req, res) => {
    res.json({
        response: 'index',
    });
});

app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`);
});
