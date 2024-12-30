// server/pongServer.js
const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8082');

ws.on('open', () => {
    console.log('Pong server connected to main server');
});

ws.on('message', (message) => {
    const msg = message.toString().toLowerCase();
    console.log('Pong server received:', msg);
    
    if (msg === 'ping') {
        // Respond to ping with pong after a delay
        setTimeout(() => {
            ws.send('pong');
        }, 1000);
    }
});

ws.on('error', console.error);