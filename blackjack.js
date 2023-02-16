var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0;

var hidden;
var deck;

var canHit = true; //allows the player (you) to draw while yourSum <= 21
//buildong a deck
window.onload = function () {
  buildDeck();
  shuffleDeck();
  startGame();
};
//listing the values
function buildDeck() {
  let values = [
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
  ];
  //types of cards
  let types = ["C", "D", "H", "S"];
  deck = [];

  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
    }
  }
  // console.log(deck);
}
//looking through all the cards in the deck and getting a random value
function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  console.log(deck);
}

function startGame() {
  hidden = deck.pop();
  dealerSum += getValue(hidden);
  dealerAceCount += checkAce(hidden);
  // console.log(hidden);
  // console.log(dealerSum);
  while (dealerSum < 17) {
    //<img src="./cards/4-C.png">
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg);
  }
  console.log(dealerSum);
  //starting game with 2 cards
  for (let i = 0; i < 2; i++) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);
  }

  console.log(yourSum);
  document.getElementById("hit").addEventListener("click", hit);
  document.getElementById("stay").addEventListener("click", stay);
}

//if the buttons can hit,enables hitting
function hit() {
  if (!canHit) {
    return;
  }

  let cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = "./cards/" + card + ".png";
  yourSum += getValue(card);
  yourAceCount += checkAce(card);
  document.getElementById("your-cards").append(cardImg);
  //limiting the amount of cards to be
  if (reduceAce(yourSum, yourAceCount) > 21) {
    //A, J, 8 -> 1 + 10 + 8
    canHit = false;
  }
}

function stay() {
  dealerSum = reduceAce(dealerSum, dealerAceCount);
  yourSum = reduceAce(yourSum, yourAceCount);

  canHit = false;
  document.getElementById("hidden").src = "./cards/" + hidden + ".png";
  let textElement = document.getElementById("results");
  let message = "";

  let play = document.getElementById("stay");
  //base function enabling playing sounds
  function playSound() {
    let audio;
    audio.loop = false;
    audio.play();
  }
  play.addEventListener("click", playSound);
  //adding conditions to win or lose
  if (yourSum > 21) {
    textElement.style.color = "red";
    message = `You Lose! 👎`;
    //message.textcolor("red");
    // message.style.color = "red";
    let audio = new Audio("hasbulla_laugh.mp3");
    audio.play();
  } else if (dealerSum > 21) {
    textElement.style.color = "green";
    message = `You win! 🤑`;
    let audio = new Audio("Ronaldo-suiii-1.mp3");
    audio.play();
  }
  //both you and dealer <= 21
  else if (yourSum == dealerSum) {
    message = "Tie!";
  } else if (yourSum > dealerSum) {
    textElement.style.color = "green";
    message = "You Win! 🤑";
    let audio = new Audio("Ronaldo-suiii-1.mp3");
    audio.play();
  } else if (yourSum < dealerSum) {
    textElement.style.color = "red";
    message = "You Lose! 👎";
    let audio = new Audio("hasbulla_laugh.mp3");
    audio.play();
  }

  document.getElementById("dealer-sum").innerText = dealerSum;
  document.getElementById("your-sum").innerText = yourSum;
  document.getElementById("results").innerText = message;
}

// if(message == "You Win!")t
// {
//   document.getElemetById('results');

// }
// else{
//   document.getElemetById(resuls.style.color = 'red');
// }

function getValue(card) {
  let data = card.split("-"); // "4-C" -> ["4", "C"]
  let value = data[0];

  if (isNaN(value)) {
    //A J Q K
    if (value == "A") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}
//
function checkAce(card) {
  if (card[0] == "A") {
    return 1;
  }
  return 0;
}

function reduceAce(playerSum, playerAceCount) {
  while (playerSum > 21 && playerAceCount > 0) {
    playerSum -= 10;
    playerAceCount -= 1;
  }
  return playerSum;
}
