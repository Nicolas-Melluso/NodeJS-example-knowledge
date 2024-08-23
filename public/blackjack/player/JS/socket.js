const socket = io();

socket.on('player_connected', (playerList) => {
    console.log('Jugador conectado:', playerList);
});

socket.on('player-id', (playerId) => {
    console.log('PlayerID:', playerId);
});

socket.on('game-status', (status) => {
    alert('status')
    console.log('Server status', status);
});