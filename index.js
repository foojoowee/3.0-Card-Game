const playAgain = document.getElementById("play-again");
const dealer = document.getElementById("dealer-hand");
const player = document.getElementById("player-hand");
const playerAddedHandCard = player.getElementsByClassName("added-hand-card");
const dealerAddedHandCard = dealer.getElementsByClassName("added-hand-card");
const toRemove = Array.from("addedHandCard");
const dealerCard = dealer.querySelectorAll("div");
const playerCard = player.querySelectorAll("div");
const handCard = player.getElementsByClassName("hand-card");

const suits = [
    "S",
    "C",
    "H",
    "D"
]

const cards = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
]


const cardsValue = [
    {"A":11},
    {"2":2},
    {"3":3},
    {"4":4},
    {"5":5},
    {"6":6},
    {"7":7},
    {"8":8},
    {"9":9},
    {"10":10},
    {"J":10},
    {"Q":10},
    {"K":10},
]


// List of hotkeys
function addHotkey(){
    document.addEventListener("keyup", e => {
        if(e.key === "d"){
            dealButton.click();
        }
    
        if(e.key === "h"){
            if(playerHandCount >1) {
            hitButton.click();
            }
        }
    
        if(e.key === "s"){
            stickButton.click();
        }
    
        if(e.key === "r"){
            resetButton.click();
        }
    })
}


let decklist = []

function shuffleDeck(){
    decklist = []
    for(let suit of suits){
        for(let obj of cardsValue){
            decklist.push({[Object.keys(obj)[0] + "-" + suit]: Object.values(obj)[0] });
        } 
    }
    decklist.sort(() => Math.random() - 0.5)
}

// Making sure the deck is shuffled at the start
window.addEventListener("load", function(){
    shuffleDeck();
})

const preplay = document.getElementById("preplay");
const playerButton = document.getElementById("player-action");
const dealButton = document.getElementById("deal-button");
const hitButton = document.getElementById("hit-button");
const stickButton = document.getElementById("stick-button");
const resetButton = document.getElementById("reset-button");

const dealerValue = document.getElementsByClassName("dealer-hand-value");
const playerValue = document.getElementsByClassName("player-hand-value");

let playerHand = [];
let dealerHand = [];
let playerHandCount = 2;
let dealerHandCount = 2;
let dealerValueTotal = 0;
let playerValueTotal = 0;
let gameEnd = false;
let dealerBJ = false;
let playerBJ = false;
let dealerAA = false;
let playerAA = false;

function dealCards(){
    preplay.style.display = `none`;
    let cardAudio = new Audio('SFX/card-deal.mp3');
    cardAudio.play();
    if (playerHand.length < 1){
        playerHand.push(decklist.pop());
        dealerHand.push(decklist.pop());
        playerHand.push(decklist.pop());
        dealerHand.push(decklist.pop());
    
        for(let i = 0; i < 2; i++){
            playerCard[i].innerHTML = `<img src="Cards/cards/${Object.keys(playerHand[i])[0]}.png" alt=""></img>`
        }

        player.style.animation = 'popUp 1s';
        dealer.style.animation = 'popUp 1s';
        playerButton.style.display = `flex`;
        dealButton.style.display = `none`;
        countValue();

    } else{
        alert("Wait for the hand to end before you deal another!")
    }
    setTimeout(() => {
        initialCheck();
        if(gameEnd == true){
            endGame();
        }
    }, 1000);
}

function countPlayerValue(){
    playerValueTotal = 0;
    for(let i = 0; i < playerHandCount; i++){
        playerValueTotal += Object.values(playerHand[i])[0];
    }
}

function countDealerValue(){
    dealerValueTotal = 0;
    for(let i = 0; i < dealerHandCount; i++){
        dealerValueTotal += Object.values(dealerHand[i])[0];
    }
}

function initialCheck(){
    let ace_count = 0;
    countPlayerValue();
    countDealerValue();

    if (dealerHandCount == 2 && dealerValueTotal == 22){
        dealerValue[0].textContent = `Dealer has Pocket Aces`
        playerAction.style.display = `none`
        dealerAA = true;
        gameEnd = true;
    }

    if (dealerHandCount == 2 && dealerValueTotal == 21){
        dealerValue[0].textContent = `Dealer has BlackJack!`
        console.log('checking')
        playerAction.style.display = `none`
        dealerBJ = true;
        gameEnd = true;
    }

    if (playerHandCount == 2 && playerValueTotal == 22){
        playerValue[0].textContent = `You have Pocket Aces`
        playerAction.style.display = `none`
        playerAA = true;
        gameEnd = true;
    }

    if (playerHandCount == 2 && playerValueTotal == 21){
        playerValue[0].textContent = `You have BlackJack!`
        playerAction.style.display = `none`
        playerBJ = true;
        gameEnd = true;
    }


}

function countValue(){
    let ace_count = 0;
    countPlayerValue();

    for(let i = 0; i < playerHand.length; i++){
        if (Object.keys(playerHand[i])[0].charAt(0) === "A"){
            ace_count += 1;
        }
    }
    if (playerHandCount > 2){
        playerValueTotal -= 11*ace_count
    }
    if (ace_count == 1 && playerHandCount === 3 && playerValueTotal <= 11){
        playerValueTotal += 10
    } else if (ace_count == 1 && playerHandCount === 3 && playerValueTotal > 11){
        playerValueTotal += 1
    }else if (ace_count > 0 && playerHandCount >3){
        playerValueTotal += 1*ace_count;
    }
    if(ace_count >1 && playerHandCount > 2){
        playerValueTotal += 1*ace_count
    }
    
    playerValue[0].textContent = `Hand Value: ${playerValueTotal}`;

    if (playerHandCount == 5 && playerValueTotal < 21){
        playerValue[0].textContent = `You win drawing 5 cards and not busting!`
        endGame();
    } else if (playerHandCount == 5 && playerValueTotal == 21){
        playerValue[0].textContent = `Jesus Christ, you did it. 5 cards 21`
        endGame();
    } else if (playerHandCount == 5 && playerValueTotal > 21){
        playerValue[0].textContent = `You bombed with 5 cards. Lose 2x bet!`
        endGame();
    }

    if (playerValueTotal < 16){
        stickButton.disabled = true;
    } else {
        stickButton.disabled = false;
    }

    if (playerHandCount > 2 && playerValueTotal > 20){
        hitButton.disabled = true;
    } else {
        hitButton.disabled = false;
    }
}

function countValueDealer(){
    let ace_count = 0;
    countDealerValue();

    for(let i = 0; i < dealerHand.length; i++){
        if (Object.keys(dealerHand[i])[0].charAt(0) === "A"){
            ace_count += 1;
        }
    }
    if (dealerHandCount > 2){
        dealerValueTotal -= 11*ace_count
    }
    if (ace_count == 1 && dealerHandCount === 3 && dealerValueTotal <= 11){
        dealerValueTotal += 10
    }else if (ace_count == 1 && dealerHandCount === 3 && dealerValueTotal > 11){
        dealerValueTotal += 1
    }else if (ace_count > 0 && dealerHandCount >3){
        dealerValueTotal += 1*ace_count;
    }

    if(ace_count >1 && dealerHandCount > 2){
        dealerValueTotal += 1*ace_count
    }
    
    dealerValue[0].textContent = `Hand Value: ${dealerValueTotal}`;

    if (dealerHandCount == 5 && dealerValueTotal < 21){
        dealerValue[0].textContent = `Dealer won drawing 5 cards and not busting!`
        endGame();
    } else if (dealerHandCount == 5 && dealerValueTotal == 21){
        dealerValue[0].textContent = `Dealer just destroyed you. Pay up`
        endGame();
    } else if (dealerHandCount == 5 && dealerValueTotal > 21){
        dealerValue[0].textContent = `... Well Now.`
        endGame();
    }
}

// window.addEventListener('resize', function() {
//     let screenWidth = window.innerWidth/2;
//     let screenHeight = window.innerHeight/2;
//     console.log('Screen width is ' + screenWidth);
//     console.log('Screen height is ' + screenHeight);
//     let element = document.getElementById("bet")
//     let elementPos = element.getBoundingClientRect();
//     console.log('The element is at ' + elementPos.top)
// })

function hit(){
    let cardAudio = new Audio('SFX/card-deal-2.mp3');
    cardAudio.play();
    playerHand.push(decklist.pop());
    playerHandCount += 1;
    let newDiv = document.createElement("div");
    newDiv.className = "added-hand-card";
    newDiv.innerHTML = `<img src="Cards/cards/${Object.keys(playerHand[playerHandCount-1])[0]}.png" alt=""></img>`;
    player.appendChild(newDiv);
    countValue();
}

const playerAction = document.getElementById("player-action")

function stick(){
    let stick = new Audio("SFX/stick.mp3");
    stick.play();
    playerAction.style.display = 'none';
    revealDealer();
    dealerTurn();
}

// function gameEnd(){

// }

// function dealerTurn();

const gameText = document.getElementById("game-text")

async function dealerTurn(){
    gameText.innerHTML = "It's the dealer's turn now!"
    countDealerValue();
        while (dealerValueTotal < 17){
            await new Promise(resolve => setTimeout(resolve, 1500));
            let cardAudio = new Audio('SFX/card-deal-2.mp3');
            cardAudio.play();
            
            gameText.innerHTML = "Dealer is still thinking";
            dealerValue[0].textContent = `Hand Value: ${dealerValueTotal}`;
            dealerHand.push(decklist.pop());
            dealerHandCount += 1;

            let newDiv = document.createElement("div");
            newDiv.className = "added-hand-card";
            newDiv.innerHTML = `<img src="Cards/cards/${Object.keys(dealerHand[dealerHandCount-1])[0]}.png" alt=""></img>`;
            dealer.appendChild(newDiv);
            countValueDealer();
        }
    endGame();
}

function revealDealer(){
    for(let i = 0; i < 2; i++){
        dealerCard[i].innerHTML = `<img src="Cards/cards/${Object.keys(dealerHand[i])[0]}.png" alt=""></img>`
    }
}


function endGame(){
    revealDealer();
    if(playerAA){
        gameText.innerHTML = "You won 3x with pocket Aces!"
    }
    if(dealerAA){
        gameText.innerHTML = "You lost 3x to pocket Aces!"
    }
    if (dealerAA && playerAA){
        gameText.innerHTML = "Both of you have Aces, WOW! Its a draw"
    }
    if (dealerAA && playerBJ){
        gameText.innerHTML = "You lost with BlackJack to Aces!"
    }
    if (playerAA && dealerBJ){
        gameText.innerHTML = "Dealer's BlackJack lost to your Aces!"
    }
    if (playerBJ && dealerBJ){
        gameText.innerHTML = "Both of you have BlackJack, WOW! Its a draw"
    }

    if (playerValueTotal < 22 && dealerValueTotal < 22){
        if(dealerValueTotal > playerValueTotal){
            gameText.innerHTML = "Sorry, you got rekt by the dealer"
        } else if (dealerValueTotal < playerValueTotal){
            gameText.innerHTML = "Congratulations, you won!"
        } else{
            gameText.innerHTML = "You drew with the dealer"
        }
    }
    if (playerHandCount > 2 && playerValueTotal > 21 && dealerValueTotal < 22){
        gameText.innerHTML = `You busted! You lost to dealer`
    } else if (playerHandCount > 2 && playerValueTotal > 21 && dealerValueTotal > 21){
        gameText.innerHTML = `Both you and the dealer busted. It's a draw`
    } else if(playerValueTotal < 22 && dealerValueTotal > 21 && dealerHandCount > 2){ 
        gameText.innerHTML = `The dealer busted. You win!`
    }
    if (playerHandCount == 5 && playerValueTotal < 22){
        gameText.innerHTML = `Congrats, you win 2x with 5 cards!`
    }
    if (playerHandCount == 5 && playerValueTotal == 21){
        gameText.innerHTML = `Congrats, you win 3x with 5 cards!`
    }
    if (playerHandCount == 5 && playerValueTotal > 21){
        gameText.innerHTML = `What a noob`
    }
    if (dealerHandCount == 5 && dealerValueTotal < 22){
        gameText.innerHTML = `You lost to the dealer, he drew 5 cards!`
    }
    if (dealerHandCount == 5 && dealerValueTotal == 21){
        gameText.innerHTML = `You lost 3x to dealer's miracle hand!`
    }
    if (dealerHandCount == 5 && dealerValueTotal > 21){
        gameText.innerHTML = `Dealer got overzealous and bombed.`
    }

    playerAction.style.display = 'none';
    playAgain.style.display = `block`;
}

function playAgainButton(){
    reset();
    dealCards();
}

const loadingPage = document.getElementById("loading-page")
const mainContainer =  document.getElementById("main-container")

function startGame(){
    let start = new Audio("SFX/start.mp3");
    start.play();
    loadingPage.style.animation = 'fadeOut 0.5s ease-out'
    setTimeout(() => {
        loadingPage.style.display = 'none';
        mainContainer.style.opacity = '1';
    }, 500);

}

const buyIn = document.getElementById("buy-in-main");

function buyInOpen(){
    buyIn.style.display = 'flex';
    buyIn.style.animation = 'fadeIn 0.5s ease-in';
    mainContainer.style.opacity = '0.6';
}

function buyInCancel(){
    buyIn.style.animation = 'fadeOut 0.5s ease-out';
    setTimeout(() => {
        buyIn.style.display = 'none';
    }, 400);
    
    mainContainer.style.opacity = '1';
}

function buyInOkay(){
    updateBalance();
    buyIn.style.animation = 'fadeOut 0.5s ease-out';
    setTimeout(() => {
        buyIn.style.display = 'none';
    }, 400);
    
    mainContainer.style.opacity = '1';
}


let currentBet = 0;
let bet = document.getElementById("bet-size");

function updateBet(){
    currentBet = parseInt(bet.value);
    console.log(currentBet);
}

function add10bet(){
    chipAudio.currentTime = 0;
    chipAudio.play();
    let curBet = parseInt(bet.value);
    let newBet = curBet + 10;
    if(isNaN(newBet)){
        newBet = 10;
    } 
    bet.value = newBet;
    updateBet()
}

function add50bet(){
    chipAudio.currentTime = 0;
    chipAudio.play();
    let curBet = parseInt(bet.value);
    let newBet = curBet + 50;
    if(isNaN(newBet)){
        newBet = 50;
    } 
    bet.value = newBet;
    updateBet()
}

function add100bet(){
    chipAudio.currentTime = 0;
    chipAudio.play();
    let curBet = parseInt(bet.value);
    let newBet = curBet + 100;
    if(isNaN(newBet)){
        newBet = 100;
    } 
    bet.value = newBet;
    updateBet()
}

function add500bet(){
    chipAudio.currentTime = 0;
    chipAudio.play();
    let curBet = parseInt(bet.value);
    let newBet = curBet + 500;
    if(isNaN(newBet)){
        newBet = 500;
    } 
    bet.value = newBet;
    updateBet()
}


let currentBalance = 0;
let currentBalanceText = document.getElementById("player-balance");
let buyInBalance = document.getElementById("buy-in-balance");
let buyInInput = document.getElementById("buy-in-input");
buyInInput.value = "0";
let chipAudio = new Audio("/Chips/chip-sound.mp3");

function updateBalance(){
    currentBalance += parseInt(buyInInput.value);
    currentBalanceText.textContent = `${currentBalance} $`;
    buyInBalance.textContent = `Your Balance: ${currentBalance} $`;
}

function add10(){
    chipAudio.currentTime = 0;
    chipAudio.play();
    let currentValue = parseInt(buyInInput.value);
    let newValue = currentValue + 10;
    if(isNaN(newValue)){
        newValue = 10;
    } 
    buyInInput.value = newValue;
}

function add50(){
    chipAudio.currentTime = 0;
    chipAudio.play();
    let currentValue = parseInt(buyInInput.value);
    let newValue = currentValue + 50;
    if(isNaN(newValue)){
        newValue = 50;
    } 
    buyInInput.value = newValue;
}

function add100(){
    chipAudio.currentTime = 0;
    chipAudio.play();
    let currentValue = parseInt(buyInInput.value);
    let newValue = currentValue + 100;
    if(isNaN(newValue)){
        newValue = 100;
    } 
    buyInInput.value = newValue;
}

function add500(){
    chipAudio.currentTime = 0;
    chipAudio.play();
    let currentValue = parseInt(buyInInput.value);
    let newValue = currentValue + 500;
    if(isNaN(newValue)){
        newValue = 500;
    } 
    buyInInput.value = newValue;
}

function reset(){
    playerHand = [];
    dealerHand = [];
    shuffleDeck();
    try{
        while (playerAddedHandCard){
            player.removeChild(playerAddedHandCard[0]);
        }
    }catch(err){
    };
    try{
        while (dealerAddedHandCard){
            dealer.removeChild(dealerAddedHandCard[0]);
        }
    }catch(err){
    };
    for(let i = 0; i < 2; i++){
        dealerCard[i].innerHTML = `<img src="Cards/cards/BACK.png" alt=""></img>`
        playerCard[i].innerHTML = `<img src="Cards/cards/back.png" alt=""></img>`
    }
    playerHandCount = 2;
    dealerHandCount = 2;
    ace_count = 0;
    playerValueTotal = 0;
    dealerValueTotal = 0;
    dealButton.style.display = `block`;
    playerAction.style.display = `none`;
    playerValue[0].textContent = ``;
    dealerValue[0].textContent = ``;
    gameText.innerHTML = ``;
    player.style.animation = 'none';
    dealer.style.animation = 'none';
    preplay.style.display = `block`;
    playAgain.style.display = `none`;
    gameEnd = false;
    dealerBJ = false;
    playerBJ = false;
    dealerAA = false;
    playerAA = false;
    // handCard[0].innerHTML = `<img src="Cards/cards/BACK.png" alt=""></img>`
}

