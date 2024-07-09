const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Manejando conexões WebSocket
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Enviar mensagem para todos os clientes conectados
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.send('Conectado ao servidor WebSocket');
});

app.use(express.static('public'));

// Alterar a porta para 5000
const port = 5000;

server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
