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

const players = []

io.on('connection', (socket) => {
    //io todos socket jugador

    // Asignar un ID único al jugador
    players.push(socket.id)
    socket.emit('player-id', `Your id is ${socket.id}`);

    io.emit('player_connected', players);

    // Cuando un jugador se desconecta
    socket.on('disconnect', () => {
        console.log('Jugador desconectado:', socket.id);
        io.emit('player_disconnected', socket.id);
    });
});

