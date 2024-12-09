const express = require('express');
const http = require('http');
const path = require('path');
const profileRoutes = require('./routes/profileRoutes');
const { init } = require('./websocket/io');  // Importa a inicialização do WebSocket

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas de perfil
app.use('/api/profiles', profileRoutes);

// Inicializa o WebSocket
init(server);

server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
