const title = document.getElementById('title-select');
const time = document.getElementById('time-select');
const minBetSelect = document.getElementById('min-bet-select');
const maxBetSelect = document.getElementById('max-bet-select');
const pokerRounds = document.getElementById('rounds-poker');
const cheats = document.getElementById('cheated');


function updateMaxBetOptions() {
    const minValue = parseInt(minBetSelect.value);
    maxBetSelect.innerHTML = '';

    const maxOptions = [minValue * 2, minValue * 4, minValue * 8];
    maxOptions.forEach(optionValue => {
        const option = document.createElement('option');
        option.value = optionValue;
        option.text = optionValue;
        maxBetSelect.appendChild(option);
    });

    maxBetSelect.disabled = false;
}

minBetSelect.addEventListener('change', updateMaxBetOptions);

const readyButton = document.getElementById('send-config');

    readyButton.addEventListener('click', startRoom);

    function startRoom() {
        if(!title.value || !time.value || !minBetSelect.value || !maxBetSelect.value || !pokerRounds.value) {

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

        saveData(title.value, time.value, minBetSelect.value, maxBetSelect.value, pokerRounds.value);
        window.location.replace("blackjack-dealer.html");
    }

    function saveData(title, time, minBet, maxBet, rounds) {
        let match = Math.random().toString().substring(2);
        const game = { title, time, minBet, maxBet, rounds }
        localStorage.setItem(`game#${match}`, JSON.stringify(game));
    }