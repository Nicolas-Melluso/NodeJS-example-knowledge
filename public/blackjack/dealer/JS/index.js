const socket = io();

let players = [];

socket.on('player-id', (playerId) => {
    console.log('PlayerID:', playerId);
});

socket.on('player_connected', (playerList) => {
    console.log('Jugador conectado:', playerList);

    socket.emit('mind', 'mind')
});

socket.on('mind', (mind) => {
    console.log(mind);
});




function startGame() {
    // Repartir cartas a los jugadores
    players.forEach(playerId => {
        gameState.playerHands[playerId] = [gameState.deck.pop(), gameState.deck.pop()];
    });

    // Repartir cartas al dealer
    gameState.dealerHand = [gameState.deck.pop(), gameState.deck.pop()];

    // Enviar el estado inicial del juego a todos los jugadores
    io.emit('game_started', {
        dealerHand: [gameState.dealerHand[0], { suit: 'hidden', value: 'hidden' }],
        playerHands: gameState.playerHands,
    });
}

let gameState = {
    dealerHand: [],
    playerHands: {},
    deck: createDeck(),
    gameStarted: false,
};

function createDeck() {
    let suits = ['♠','♥','♦','♣'];
    let values = ['2','3','4','5','6','7','8','9','J','K','Q','A'];
    let deck = [];

    for(let suit of suits) {
        for(value of values) {
            deck.push({ suit, value });
        }
    }
    return shuffle(deck);
}

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}