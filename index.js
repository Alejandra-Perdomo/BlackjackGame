

let blackjackGame={
    'you':{'spanScore':'#your-score','div':'#your-box','score':0},
    'dealer':{'spanScore':'#dealer-score','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'standActive':false,
    'turnsOver':false
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

var hitSound = new Audio("./sounds/swish.m4a");
var cashSound = new Audio("./sounds/cash.mp3");
var LossSound = new Audio("./sounds/aww.mp3");

const blackjackHit=()=>{
    if(blackjackGame['standActive']==true) return;
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

    if(blackjackGame['turnsOver']==false) return;

    blackjackGame['standActive'] = false;
    blackjackGame['turnsOver'] = false;

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
    document.querySelector('#blackjack-result').innerText="Let's play again!";
    document.querySelector('#blackjack-result').style.color='white';

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

const dealerLogic=()=>{
    blackjackGame['standActive'] = true;
    let card = randomCard();
    showCard(DEALER,card);
    updateScore(card,DEALER);
    showScore(DEALER);

    if(DEALER['score']>15){
        showResult(computeWinner());
    }
}

const computeWinner=()=>{
    let winner;
    if(DEALER['score']<YOU['score'] && YOU['score']<=21){
        winner=YOU;
        blackjackGame['wins']++;
    }else if(YOU['score']<DEALER['score'] && DEALER['score']<=21){
        winner=DEALER;
        blackjackGame['losses']++;
    }else if(YOU['score']<=21 && DEALER['score']>21){
        winner=YOU;
        blackjackGame['wins']++;
    }else if(DEALER['score']<=21 && YOU['score']>21){
        winner=DEALER;
        blackjackGame['losses']++;
    }else{
        blackjackGame['draws']++;
    }

    return winner;
}

const showResult=(winner)=>{
    let message,messageColor;
    if(winner==YOU){
        message='You Won!!🥳😉';
        messageColor='blue';
        cashSound.play();
        document.querySelector('#wins').innerText = blackjackGame['wins'];
    }else if(winner==DEALER){
        message='You lost, try again!';
        messageColor='red';
        LossSound.play();
        document.querySelector('#losses').innerText = blackjackGame['losses'];
    }else{
        message='You Drew!';
        messageColor='yellow';
        document.querySelector('#draws').innerText = blackjackGame['draws'];
    }

    document.querySelector('#blackjack-result').innerText=message;
    document.querySelector('#blackjack-result').style.color=messageColor;
    blackjackGame['turnsOver'] = true;

}

document.querySelector('#hit-btn').addEventListener('click',blackjackHit);
document.querySelector('#deal-btn').addEventListener('click',blackjackDeal);
document.querySelector('#stand-btn').addEventListener('click',dealerLogic);