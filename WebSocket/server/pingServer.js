// server/pingServer.js
const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8081');

ws.on('open', () => {
    console.log('Ping server connected to main server');
});

ws.on('message', (message) => {
    const msg = message.toString().toLowerCase();
    console.log('Ping server received:', msg);
    
    if (msg === 'start') {
        // Start the sequence with a ping
        ws.send('ping');
    } 
    else if (msg === 'pong') {
        // Respond to pong with ping after a delay
        setTimeout(() => {
            ws.send('ping');
        }, 1000);
    }
});

ws.on('error', console.error);