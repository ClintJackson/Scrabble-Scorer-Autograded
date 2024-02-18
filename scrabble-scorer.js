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
   word = word.toLowerCase();
   let score = 0;
   //plz dnt forget
   //newPointStructure[word[i]] is using word[i] as a key. 
   //instead of looping, as originally planned, you simply access via index. 
   //so newPointStructure's key is access via index, which is a letter, which is word[i].
   //this spits out the value paired with that. 
   //mission accomplished
   for (let i = 0; i < word.length; i++) {
      score += newPointStructure[word[i]];
      }
   
   return score;
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

function transform(oldStructure) {
   let newStructure = {};
   /*I'm going to forget this:
      It's looping through.  
      score in old point structure below is the key for oldStructure object.
      The value assigned to the score (key) is an array. We want to access each of the values in the array. 
      oldStructure[score] is the array. So, assign it to a variable to work with it. "originalArray"

      
      Now we want to loop through the contents of the array, stored in originalArray. 
      Remember: "in" is in Object. "of" is of array. 
      We want to work with each individual letter. So, access via: 
         let letter of originalArray
      Now build the new structure by assigning it via letter. 
      newStructure[letter] creates a new key in newStructure.
         -the key is whatever "letter" is during this iteration of this array.
         -the paired value with this new key is "score" from the loop going through the object.
      I'm still not 100% sure why "Number" is working...except that I think keys are strings?
         so number changes them to data type: number? otherwise they're string keys paired with string values still?
            -i'm gonna go with that. 


       
   */
   for (let score in oldStructure) {
      let originalArray = oldStructure[score];//the array is now available for independent work.
      for (let letter of originalArray) {
         newStructure[letter.toLowerCase()] = Number(score);
      }
      }
      return newStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   scorerPrompt();
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
