const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs'); // Módulo para manejar archivos

const app = express();
const port = 3000;

// Middleware para poder leer datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para manejar el formulario de contacto
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Crear el mensaje a guardar
    const contactMessage = `
    Nombre: ${name}
    Correo electrónico: ${email}
    Mensaje: ${message}
    ----------------------------------------
    `;

    // Guardar el mensaje en el archivo 'messages.txt'
    fs.appendFile('messages.txt', contactMessage, (err) => {
        if (err) {
            return res.status(500).send('Hubo un error al guardar el mensaje.');
        }
        res.status(200).send('Mensaje enviado correctamente.');
    });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
