let generateRandomNumber = () => Math.floor(100 * Math.random() + 1);
let randomNumber = generateRandomNumber();

const submit = document.querySelector('#sub')
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector('.lastResult');
const startOver = document.querySelector('.resultPress');
const lowOrHi = document.querySelector('.lowOrHi');
const hintP = document.querySelector('.hintP');
const p = document.querySelector('p');


//restart game function
const restart =document.querySelector("#restart");
restart.addEventListener("click", Restrat);

function Restrat(){
    document.location.reload(true);

}

//hint function
const hintBtn = document.querySelector('#hint');

hintBtn.addEventListener('click',giveHint);

function giveHint(){

    hintP.innerHTML = '';
    lowOrHi.innerHTML = '';

    let hintArr = [randomNumber];
        while (hintArr.length < 5) {
            let num = generateRandomNumber();
            if (!hintArr.includes(num) && !previousGuesses.includes(num)) {
                hintArr.push(num);
            }
        }

    hintP.innerHTML += `<span class="hint_div">${shuffle(hintArr)}</span>`;   
}

function shuffle(array){
let lastIndex = array.length, temp, i;
    while (lastIndex) {
        i = Math.floor(Math.random() * lastIndex--);
        temp = array[lastIndex];
        array[lastIndex] = array[i];
        array[i] = temp;
    }
    return array; 
}

//play game
let previousGuesses = [];
let numGuesses = 1;
let playGame = true;

if(playGame){
    submit.addEventListener('click',function(e){
        e.preventDefault();

        const guess = parseInt(userInput.value);

        validateGuess(guess);
    })
}

//validate input
function validateGuess(guess){
    if(isNaN(guess)){
        alert('Please enter a valid number.');
    }else if(guess < 1 || guess > 100){
        alert('Please enter a number between 1 and 100.')
    }else{
        previousGuesses.push(guess); //add input into Array
        displayGuesses(guess);

        if(numGuesses > 5 && guess != randomNumber){
            dissplayMessage(`Game Over! Number was ${randomNumber}`);
            endGame();
        }else{ 
            checkGuess(guess);
        }
    }
}

//check input
function checkGuess(guess){
    if (guess === randomNumber){
        dissplayMessage(`You Win! &#127881&#127881&#127881`)
        endGame();
    }else if (guess < randomNumber){
        dissplayMessage(`Too low! Try again!&#128170`);
    }else if (guess > randomNumber){
        dissplayMessage(`Too High! Try again!&#128170`);
    }
}

//dispaly previous input and chances
function displayGuesses(guess){

    userInput.value = '';
    hintP.innerHTML = '';
    guessSlot.innerHTML += `<span class="guesses_div">${guess}</span>`;
    numGuesses++;   
    remaining.innerHTML = `${6 - numGuesses}`;

}

//display message
function dissplayMessage(message){
    lowOrHi.innerHTML = `<h1>${message}</h1>`
}

//end game
function endGame(){
    userInput.value = '';
    userInput.setAttribute('disabled','');
    playGame =false;
 }


