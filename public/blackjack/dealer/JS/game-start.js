const socket = io();

socket.on('dealer_connected', (game) => {
    console.log(game);
})

socket.on('player_connected', (playerList) => {
    console.log('Jugador conectado:', playerList);
});

document.getElementById('start').addEventListener('click', function() {
    console.log('Game Started');
    socket.emit('start_game');
});