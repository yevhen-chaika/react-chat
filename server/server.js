const { createServer } = require('http');
const WebSocket = require('ws');
const express = require('express');

const port = 3030;

const server = createServer(express);
const wss = new WebSocket.Server({server});

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        })
    });

    ws.on('close', function () {
        console.log('stopping client interval');
        clearInterval();
    });
});

server.listen(port, function () {
    console.log(`Server is listening on ${port}`);
});
