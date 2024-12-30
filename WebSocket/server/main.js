// server/main.js
const WebSocket = require('ws');

const mainServer = new WebSocket.Server({ port: 8080 });
const pingServer = new WebSocket.Server({ port: 8081 });
const pongServer = new WebSocket.Server({ port: 8082 });

let pingSocket = null;
let pongSocket = null;
let clientSocket = null;
let isRunning = false;

// Handle main client connections
mainServer.on('connection', (ws) => {
    console.log('Client connected to main server');
    clientSocket = ws;

    ws.on('message', (message) => {
        const command = message.toString();
        console.log('Received command:', command);

        if (command === 'start' && !isRunning) {
            isRunning = true;
            console.log('Starting ping-pong sequence');
            // Initiate the sequence
            if (pingSocket) {
                pingSocket.send('start');
                clientSocket.send('System starting...');
            }
        } else if (command === 'stop' && isRunning) {
            isRunning = false;
            clientSocket.send('System stopped');
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected from main server');
        clientSocket = null;
    });
});

// Handle ping server
pingServer.on('connection', (ws) => {
    console.log('Ping server connected');
    pingSocket = ws;

    ws.on('message', (message) => {
        if (!isRunning) return;
        
        const msg = message.toString();
        console.log('Ping server sent:', msg);
        
        if (clientSocket) {
            clientSocket.send(`Ping Server: ${msg}`);
        }
        
        // Forward to pong server
        if (pongSocket) {
            pongSocket.send(msg);
        }
    });

    ws.on('close', () => {
        pingSocket = null;
    });
});

// Handle pong server
pongServer.on('connection', (ws) => {
    console.log('Pong server connected');
    pongSocket = ws;

    ws.on('message', (message) => {
        if (!isRunning) return;
        
        const msg = message.toString();
        console.log('Pong server sent:', msg);
        
        if (clientSocket) {
            clientSocket.send(`Pong Server: ${msg}`);
        }
        
        // Forward to ping server
        if (pingSocket) {
            pingSocket.send(msg);
        }
    });

    ws.on('close', () => {
        pongSocket = null;
    });
});

console.log('Main server running on port 8080');
console.log('Ping server running on port 8081');
console.log('Pong server running on port 8082');