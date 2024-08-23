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

let players = []

let dealer = {
    id: "",
    hand: [],
};

const game = {
    gameType: "Blackjack",
    gameStatus: "waiting players",
    deck: createDeck(),
    dealer: dealer,
    players: players,
    pot: 0
}

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

io.on('connection', (socket) => {
    //io todos socket jugador
    if (dealer.id === "") {
        game.dealer.id = socket.id;
        dealer.id = game.dealer.id;
        socket.emit('dealer_connected', game);
    } else {
        // Asignar al player sus configuraciones iniciales
        let newPlayer = {
            id: socket.id,
            hand: [],
            stack: 0
        }

        players.push(newPlayer)
        io.emit('player_connected', players);
        socket.emit('game-status', game.gameStatus);
    }

    // Cuando el dealer inicia el juego
    socket.on('start_game', () => {
        game.gameStatus = 'game started';
        io.emit('game-status', 'game-started');
    });

    // Cuando un jugador se desconecta
    socket.on('disconnect', () => {
        console.log('Jugador desconectado:', socket.id);
        players = players.filter( player => player.id != socket.io )
        io.emit('player_disconnected', socket.id);
    });

});

