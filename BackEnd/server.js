const express = require('express');
const cors = require('cors');
const ProductRoute = require('./src/routes/ProductRoute');
const db = require('./src/config/database.js');

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Este es el home del servidor');
});

app.use('/productos', ProductRoute);

// Inicia el servidor y verifica la conexión
app.listen(PORT, async () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
