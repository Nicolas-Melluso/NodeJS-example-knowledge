const socket = io();

socket.on('player_connected', (playerList) => {
    console.log('Jugador conectado:', playerList);
});

socket.on('player-id', (playerId) => {
    console.log('PlayerID:', playerId);
});

socket.on('mind', (mind) => {
    console.log(mind);
});