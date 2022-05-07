

let blackjackGame={
    'you':{'spanScore':'#your-score','div':'#your-box','score':0},
    'dealer':{'spanScore':'#dealer-score','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]}
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

var hitSound = new Audio("./sounds/swish.m4a");

const blackjackHit=()=>{
    let card=randomCard();
    showCard(YOU,card);
    updateScore(card,YOU);
    showScore(YOU)
}

const showCard=(activePlayer,card)=>{
    if(activePlayer['score'] >= 21) return;

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

    YOU['score']=0;
    DEALER['score']=0;

    showScore(YOU);
    showScore(DEALER);

    document.querySelector(YOU['spanScore']).style.color='white';
    document.querySelector(DEALER['spanScore']).style.color='white';

}

const randomCard=()=>{
    let randIndex=Math.floor(Math.random()*13);
    return blackjackGame['cards'][randIndex];
}

const updateScore=(card,activePlayer)=>{

    if(activePlayer['score'] >= 21) return;

    if(card=='A'){
        if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }else{
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }else{
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

const showScore=(activePlayer)=>{

    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['spanScore']).innerText=activePlayer['score']+' BUST!';
        document.querySelector(activePlayer['spanScore']).style.color='red';
    }else{
        document.querySelector(activePlayer['spanScore']).innerText=activePlayer['score'];
    }
    
}

document.querySelector('#hit-btn').addEventListener('click',blackjackHit);
document.querySelector('#deal-btn').addEventListener('click',blackjackDeal);