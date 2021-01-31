// Challenge 1: Your Age in Days
function ageInDays() {
    let birthYear = prompt("what year were you born?");
    let age = (2018 - birthYear) * 365;
    let h1 = document.createElement('h1');
    let textAnswer = document.createTextNode('You are ' + age + ' days old');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
    document.getElementById('ageInDays').remove();
}

// Challenge 2: Cat Generator
function generateCat() {
    let image = document.createElement('img');
    let div = document.getElementById('flex-cat-gen');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

// Challenge 3: Rock, Paper, Scissors
function rpsGame(yourChoice){
    let humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = ['rock','paper','scissors'][Math.floor(Math.random() * 3)];
    results = decideWinner(humanChoice, botChoice); // [0,1] human lost | bot won
    message = finalMessage(results); // {'message': 'You won!', 'color': 'green'}
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function decideWinner(yourChoice, computerChoice){
    let rpsDatabase = {
        'rock': {'scissors' : 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock' : 1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'paper' : 1, 'scissors': 0.5, 'rock': 0}
    }
    
    let yourScore = rpsDatabase[yourChoice][computerChoice];
    let computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]){
    if(yourScore === 0){
        return {'message': 'You lost!', 'color': 'red'};
    } else if(yourScore === 0.5){
        return {'message': 'You tied!', 'color': 'yellow'};
    } else{
        return {'message': 'You won!', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    let imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    // Remove all images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    let humanDiv = document.createElement('div');
    let messageDiv = document.createElement('div');
    let botDiv = document.createElement('div');

    let humanImg = document.createElement('img');
    humanImg.src = imagesDatabase[humanImageChoice];
    humanImg.classList.add('human-class');
    humanDiv.appendChild(humanImg);

    let messageText = document.createElement('h1');
    messageText.classList.add('message-class');
    messageText.style.color = finalMessage['color'];
    messageText.textContent = finalMessage['message'];
    messageDiv.appendChild(messageText);

    let botImg = document.createElement('img');
    botImg.src = imagesDatabase[botImageChoice];
    botImg.classList.add('bot-class');
    botDiv.appendChild(botImg);

    //humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);')>";
    //messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px;'>" + finalMessage['message'] + "</h1>";
    //botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);')>";

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

// Challenge 4: Change the Color of All Buttons
let all_buttons = document.getElementsByTagName('button');

let copyAllButtons = [];
for(let i = 0; i < all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1])
}

function buttonColorChange(buttonThingy){
    if(buttonThingy.value === 'red'){
        buttonsRed();
    } else if(buttonThingy.value === 'green'){
        buttonsGreen();
    } else if(buttonThingy.value === 'reset'){
        buttonColorReset();
    } else if(buttonThingy.value === 'random'){
        randomColors();
    }
}

function buttonsRed(){
    for(let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen(){
    for(let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset() {
    for(let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors() {
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];
    let len = choices.length;
    for(let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[Math.floor(Math.random() * len)]);
    }
}

// Challenge 5: Blackjack
let blackJackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
    '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];
const CARDS = blackJackGame['cards'];

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackJackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackJackDeal);

// User hit button functionality
function blackJackHit(){
    if(blackJackGame['isStand'] === false){
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function randomCard(){
    return blackJackGame['cards'][Math.floor(Math.random() * 13)]
}

// Add and show drawn cards on front-end
function showCard(card, activePlayer){
    if(activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

// Update score when card drawn
function updateScore(card, activePlayer){
    if(card === 'A'){ 
        // If adding 11 below 21, add 11. Otherwise, add 1
        if(activePlayer['score'] + blackJackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackJackGame['cardsMap'][card][1];
        } else{
            activePlayer['score'] += blackJackGame['cardsMap'][card][0];
        }  
    } else{
        activePlayer['score'] += blackJackGame['cardsMap'][card];
    }
}

// Displays and modifies score
function showScore(activePlayer){
    if (activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Dealer AI
async function dealerLogic(){
    blackJackGame['isStand'] = true;

    while(DEALER['score'] < 16 && blackJackGame['isStand'] === true){
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

    if (blackJackGame['turnsOver'] === false){
        let winner = computeWinner();
        showResult(winner);
    }
    blackJackGame['turnsOver'] = true;
}

// Compute and return winner
// Updates wins, draws, and losses
function computeWinner(){
    let winner;

    // condition: you don't bust
    if(YOU['score'] <= 21){
        // condition: higher score than dealer or when dealers busts but you're 21 or under
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            blackJackGame['wins']++;
            winner = YOU;
        } else if(YOU['score'] < DEALER['score']){
            blackJackGame['losses']++;
            winner = DEALER;
        } else if(YOU['score'] === DEALER['score']){
            blackJackGame['draws']++;
        }

    // condition: when you bust but dealer doesn't  
    } else if(YOU['score'] > 21 && DEALER['score'] <= 21){
        blackJackGame['losses']++;
        winner = DEALER;

    //condition: when you and dealer bust   
    } else if(YOU['score'] > 21 && DEALER['score'] > 21){
        blackJackGame['draws']++;
    }
    return winner;
}

// Display winner and modify score on front-end
function showResult(winner){
    let message, messageColor;

    if(winner === YOU){
        document.querySelector('#wins').textContent = blackJackGame['wins'];
        message = 'You won!';
        messageColor = 'green';
        winSound.play();
    } else if(winner === DEALER){
        document.querySelector('#losses').textContent = blackJackGame['losses'];
        message = 'You lost!';
        messageColor = 'red';
        lossSound.play();
    } else{
        document.querySelector('#draws').textContent = blackJackGame['draws'];
        message = 'You drew!';
        messageColor = 'black';
    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
}

// Reset blackjack
function blackJackDeal(){
    if(blackJackGame['turnsOver'] === true){
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        blackJackGame['isStand'] = false;

        for(let i = 0; i < yourImages.length; i++){
            yourImages[i].remove();
        }

        for(let i = 0; i < dealerImages.length; i++){
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector('#your-blackjack-result').style.color = 'white';
        document.querySelector('#dealer-blackjack-result').style.color = 'white';

        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackJackGame['turnsOver'] = false;
    }
}