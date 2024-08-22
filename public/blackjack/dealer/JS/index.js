const socket = io();

// En la vista del dealer
socket.on('player_connected', (state) => {
    const playersDiv = document.getElementById('players');
    playersDiv.innerHTML = ''; // Limpiar jugadores anteriores
    state.players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.innerText = `Player: ${player}`;
        playersDiv.appendChild(playerDiv);
    });
});

socket.on('player_disconnected', (state) => {
    const playersDiv = document.getElementById('players');
    playersDiv.innerHTML = ''; // Limpiar jugadores anteriores
    state.players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.innerText = `Player: ${player}`;
        playersDiv.appendChild(playerDiv);
    });
});
