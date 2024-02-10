// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");
let userWord = "";
const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!");
   userWord = input.question("Input a word to score: ");
   console.log(oldScrabbleScorer(userWord));
   return userWord;
};

function simpleScorer(word) {
   
   let simpleScore = word.length;
   return simpleScore;
};

function vowelBonusScorer (word) {
   const vowels = ["A", "E", "I", "O", "U"];
   word = word.toUpperCase();
   let vowelScore = 0;
   for (i = 0; i < word.length; i++){
      if (vowels.includes(word[i])){
         vowelScore = vowelScore + 3;
      }
      else {
         vowelScore = vowelScore + 1;
      }
   }
   return vowelScore;
}


function scrabbleScorer (word) {
   return 1;
};

const scoringAlgorithms = [
   {
      name: "Simple Scorer",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer,
   }, 
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer,
   }, 
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm",
      scorerFunction: scrabbleScorer,
   },
];

function scorerPrompt() {
   console.log(`There are three word-scoring methods available: 
   0: Simple Scorer
   1: Bonus Vowels 
   2: Scrabble.
   Select a scoring method by entering the corresponding number.`);
   let scoringSelection = input.question("Which one would you like?: ");

   if (!(NaN === scoringSelection) && scoringSelection >= 0 && scoringSelection <= 2) {
      console.log(`You've Selected: ${scoringAlgorithms[scoringSelection].name}.
      Your Score: ${scoringAlgorithms[scoringSelection].scorerFunction(userWord)}` )
   }
}

function transform() {};

let newPointStructure;

function runProgram() {
   initialPrompt();
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
