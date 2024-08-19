const minBetSelect = document.getElementById('min-bet-select');
const maxBetSelect = document.getElementById('max-bet-select');

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

