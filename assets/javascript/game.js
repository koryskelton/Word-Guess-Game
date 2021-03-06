//Pick a random word
//While the word has not been guessed {
   // Show the player their current progress
   // Get a guess from the player
   // If the player wants to quit the game {
     // Quit the game
    //}
    //Else If the guess is not a single letter {
     // Tell the player to pick a single letter
    //}
    //Else {
      //If the guess is in the word {
       // Update the player's progress with the guess
 //     }
  //} }
  //Congratulate the player on guessing the word

  var selectableWords = [ "toxic",
                "womanizer",
                "blackout",
                "circus"
];

const maxTries = 10;            // Maximum number of tries player has

var guessedLetters = [];        // Stores the letters the user guessed
var currentWordIndex;           // Index of the current word in the array
var guessingWord = [];          // This will be the word that is actually built to match the current word
var remainingGuesses = 0;       // How many tries the player has left
var gameStarted = false;        // Flag to tell if the game has started
var hasFinished = false;        // Flag for 'press any key to try again'     
var wins = 0;                   // How many wins has the player racked up

// Reset game-level variables
function resetGame() {
  remainingGuesses = maxTries;
  gameStarted = false;

  // Use Math.floor to round the random number down to the nearest whole.
  currentWordIndex = Math.floor(Math.random() * (selectableWords.length));

  // Clear out arrays
  guessedLetters = [];
  guessingWord = [];

  // CLear hangman image
  document.getElementById("hangmanImage").src = "cleared.png";

  // Build the guessing word and clear it out
  for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
      guessingWord.push("_");
  }
  // Hide game over and win images/text
  document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
  document.getElementById("gameover-image").style.cssText = "display: none";
  document.getElementById("youwin-image").style.cssText = "display: none";

  // Show display
  updateDisplay();
};
//  Updates the display on the HTML Page
function updateDisplay() {

  document.getElementById("totalWins").innerText = wins;
  document.getElementById("currentWord").innerText = "";
  for (var i = 0; i < guessingWord.length; i++) {
      document.getElementById("currentWord").innerText += guessingWord[i];
  }
  document.getElementById("remainingGuesses").innerText = remainingGuesses;
  document.getElementById("guessedLetters").innerText = guessedLetters;
  if(remainingGuesses <= 0) {
      document.getElementById("gameover-image").style.cssText = "display: block";
      document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
      hasFinished = true;
  }
};
// Update the image depending on how many guesses
function updateHangmanImage() {
  document.getElementById("hangmanImage").src = "assets/images/" + (maxTries - remainingGuesses) + ".png";
};
document.onkeydown = function(event) {
  // If game finished, dump one keystroke and reset.
  if(hasFinished) {
      resetGame();
      hasFinished = false;
  } else {
      // Check to make sure a-z was pressed.
      if(event.keyCode >= 65 && event.keyCode <= 90) {
          makeGuess(event.key.toLowerCase());
      }
  }
};
function makeGuess(letter) {
  if (remainingGuesses > 0) {
      if (!gameStarted) {
          gameStarted = true;
      }

      // Dont allow duplicate letters
      if (guessedLetters.indexOf(letter) === -1) {
          guessedLetters.push(letter);
          evaluateGuess(letter);
      }
  }
  
  updateDisplay();
  checkWin();
};

// Replaces space in word with letter
function evaluateGuess(letter) {
  // Array to store positions of letters in string
  var positions = [];

  // Loop through word finding all instances of guessed letter, store the indicies in an array.
  for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
      if(selectableWords[currentWordIndex][i] === letter) {
          positions.push(i);
      }
  }

  // if there are no matches, remove a guess and update the hangman image
  if (positions.length <= 0) {
      remainingGuesses--;
      updateHangmanImage();
  } else {
      // Loop through all the matches and replace the '_' with a letter.
      for(var i = 0; i < positions.length; i++) {
          guessingWord[positions[i]] = letter;
      }
  }
};
function checkWin() {
  if(guessingWord.indexOf("_") === -1) {
      document.getElementById("youwin-image").style.cssText = "display: block";
      document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
      wins++;
      hasFinished = true;
  }
};
