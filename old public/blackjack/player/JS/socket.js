const socket = io();
let player;
let number = 1;
let position = 20;
let positionBet = 30;
let playerList = [];
let ready = false;

const modal = document.getElementById("myModal");

socket.on('player_connected', (playerList) => {
    console.log('Jugador conectado:', playerList);
    playerList = playerList;
    player = playerList.filter(player => player.id === socket.id);
    player = player[0]
});

socket.on('game-status', (game) => {
    if (game.status === 'waiting players') {
        modal.style.display = "block";
    } else {
        modal.style.display = "none"; 
    }
    
    if(game.status === 'game started') {

        function createPokerChip(value) {
            const chip = document.createElement('div');
            chip.className = `poker-chip chip-${value}`;
        
            const notches = document.createElement('div');
            notches.className = 'notches';
        
            for (let i = 0; i < 4; i++) {
                const notch = document.createElement('div');
                notch.className = 'notch';
                notches.appendChild(notch);
            }
        
            chip.appendChild(notches);
            chip.innerText = value;
            return chip;
        }
        
        const container = document.getElementById('poker-chips-container');
        
        const chipValues = [1, 5, 10, 25, 50];
        chipValues.forEach(value => {
            const chip = createPokerChip(value);
            container.appendChild(chip);
            chip.addEventListener('click', () => {
                player.stack -= value;
                console.log(player.stack);

                let myBet = document.createElement('div');
                myBet.classList.add('poker-chip', `chip-${value}`);
                myBet.style.position = "absolute";
                myBet.style.left = '20vw'
                myBet.style.bottom = `${positionBet}vh`;
                positionBet+=1;
                document.getElementById('players').appendChild(myBet);

            });
        });

        if (player.hand) {
            player.hand.forEach(card => {
        
            const { value, suit, color} = card;
            
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
            
            document.getElementById('players').appendChild(newCard);
            number++;
            });
        }
    }    
});