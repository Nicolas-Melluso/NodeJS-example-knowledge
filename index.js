require('dotenv').config()
const express = require("express");
const path = require('path');
const SocketIO = require('socket.io');

const app = express();

app.set('port', process.env.PORT || 3000); //port

app.use(express.static(path.join(__dirname, 'public'))); //front


const server = app.listen(app.get('port'), () => {
    console.log(`Server listening in port ${app.get('port')}`);
})

const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('new connection', socket.id);
})