

let blackjackGame={
    'you':{'spanScore':'#your-score','div':'#your-box','score':0},
    'dealer':{'spanScore':'#dealer-score','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A']
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

var hitSound = new Audio("./sounds/swish.m4a");

const blackjackHit=()=>{
    let card=randomCard();
    showCard(YOU,card);
}

const showCard=(activePlayer,card)=>{
    let cardImage = document.createElement('img');
    cardImage.src = `images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
}

const blackjackDeal=()=>{
    let yourCards=document.querySelector(YOU['div']).querySelectorAll('img');
    for(let card of yourCards){
        card.remove();
    }

    let dealerCards=document.querySelector(DEALER['div']).querySelectorAll('img');
    for(let card of dealerCards){
        card.remove();
    }

}

const randomCard=()=>{
    let randIndex=Math.floor(Math.random()*13);
    return blackjackGame['cards'][randIndex];
}

document.querySelector('#hit-btn').addEventListener('click',blackjackHit);
document.querySelector('#deal-btn').addEventListener('click',blackjackDeal);