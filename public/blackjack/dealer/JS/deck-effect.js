document.getElementById('card-deck').addEventListener('click', function() {
    let number = JSON.parse(localStorage.getItem("card-serve"));
  
    if (number === null) {
        document.getElementById('start').innerHTML = '';
        localStorage.setItem('card-serve', 1);
        number = 1;
    }

    if (number >= 8) {
        localStorage.removeItem('card-serve');
        const cards = document.getElementsByClassName('card');
        Array.from(cards).forEach(card => card.remove());
        document.getElementById('start').innerHTML = 'Start';
        return;
    }
    let newCard = document.createElement('div');
    newCard.classList.add(`card-${number}`, 'card');
    
    newCard.innerHTML = `
        <div class="number"> K </div>
        <div class="red"> ♦ </div>
    `;
    
    document.getElementById('dealer-hand').appendChild(newCard);

    localStorage.setItem('card-serve', number+=1);
});
