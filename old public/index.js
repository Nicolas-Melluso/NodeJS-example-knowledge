const playerBtn = document.getElementById('player');

playerBtn.addEventListener('click', searchParty);

function searchParty() {
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

const search = document.getElementById('search');
const gameId = document.getElementById('game-id');

search.addEventListener('click', searchGame);

function searchGame() {
    if(gameId.value) {
        const gameFounded = localStorage.getItem(`game#${gameId.value}`);
        if(gameFounded) {
            window.location.replace("/blackjack/player/blackjack-player.html");
        } else {
            gameId.value = 'Game ID not founded';
            setTimeout(() => {
                gameId.value = '';
            }, 1500);
        }
    } else {
        gameId.value = 'Game ID not provided';
        setTimeout(() => {
            gameId.value = '';
        }, 1000);
    }    
}