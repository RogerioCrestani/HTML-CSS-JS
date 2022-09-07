function visibleCalculateProfit() {
    document.getElementById('calculate-profit-freight').classList.remove('invisible');
    document.getElementById('calculate-min-value').classList.add('invisible');
    document.getElementById('btn-swap-calculate-profit').classList.add('btn-swap-clicked');
    document.getElementById('btn-swap-min-value').classList.remove('btn-swap-clicked');
}

function visibleCalculateMinValue() {
    document.getElementById('calculate-profit-freight').classList.add('invisible');
    document.getElementById('calculate-min-value').classList.remove('invisible');
    document.getElementById('btn-swap-calculate-profit').classList.remove('btn-swap-clicked');
    document.getElementById('btn-swap-min-value').classList.add('btn-swap-clicked');
}

function alertInput(message, element) {
    document.getElementById(element).classList.add('input-error');

    /*
    let alert = document.createElement('div');
    alert.classList.add('input-error-message');
    alert.innerHTML = message;

    document.getElementById(element).after(alert);
    */
}

function resetInput(elementId, elementClass) {
    document.getElementById(elementId).classList.remove(elementClass);
    //document.querySelector('input-error-message').remove();
}

function inputVerify(elementID) {
    if(isNaN(parseFloat(document.getElementById(elementID).value))) { 
        alertInput('Preencha esse campo por gentileza!', elementID);
        return false;
    }else{
        return true;
    }
} 

function cardError(fatherElement, message) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('card-error');

    let pCard = document.createElement('p');

    pCard.innerHTML = message;

    card.appendChild(pCard);
    document.getElementById(fatherElement).appendChild(card);
}