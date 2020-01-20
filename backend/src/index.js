const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes.js')

const { setupWebsocket } = require('./websocket');
const http = require('http');
const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://apj:apj123@cluster0-aygye.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

//app.use(cors());
app.use(cors({ origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(routes);

server.listen(3333);