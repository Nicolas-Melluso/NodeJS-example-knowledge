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

// Array para almacenar los jugadores conectados
let players = [];

// Cuando un jugador se conecta
io.on('connection', (socket) => {
    console.log('Nuevo jugador conectado:', socket.id);

    // Asignar un ID único al jugador
    players.push(socket.id);
    socket.emit('assign_id', socket.id);

    // Enviar el estado inicial del juego al jugador conectado
    socket.emit('update_game_state', { players });

    // Notificar a todos los jugadores que hay un nuevo jugador
    io.emit('player_connected', { players });

    // Cuando un jugador se desconecta
    socket.on('disconnect', () => {
        console.log('Jugador desconectado:', socket.id);
        players = players.filter(player => player !== socket.id);
        io.emit('player_disconnected', { players });
    });
});