const socket = io();

// Cuando se asigna un ID al jugador
socket.on('assign_id', (id) => {
    document.getElementById('player-id').innerText = `Player ID: ${id}`;
});

// Cuando se actualiza el estado del juego
socket.on('update_game_state', (state) => {
    document.getElementById('connected-players').innerText = `Connected Players: ${state.players.length}`;
});

// Cuando un nuevo jugador se conecta
socket.on('player_connected', (state) => {
    document.getElementById('connected-players').innerText = `Connected Players: ${state.players.length}`;
});

// Cuando un jugador se desconecta
socket.on('player_disconnected', (state) => {
    document.getElementById('connected-players').innerText = `Connected Players: ${state.players.length}`;
});