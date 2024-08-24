const socket = io();
let player = {};
let number = 1;
let position = 20;

socket.on('player_connected', (playerList) => {
    console.log('Jugador conectado:', playerList);
    player = playerList.filter(player => player.id === socket.id);
});

socket.on('player-id', (playerId) => {
    console.log('PlayerID:', playerId);

});

socket.on('game-status', (status) => {
        console.log(status);
        
    if (status === 'waiting players') {
        const modal = document.getElementById("myModal");
        
        modal.style.display = "block";
    }

    if (player.hand) {
        player.hand.forEach(card => {
    
        const { value, suit, color} = card;
    
        document.getElementById('start').innerHTML = '';
        
        let newCard = document.createElement('div');
        newCard.classList.add('card');
        newCard.style.position = "absolute";
        newCard.style.left = `${position}vw`;
        position+=5;
        newCard.style.bottom = "30vh";
        
        newCard.innerHTML = `
            <div class="number"> ${value} </div>
            <div class="${color}"> ${suit} </div>
        `;
        
        document.getElementById('dealer-hand').appendChild(newCard);
        number++;
        });
    }
});