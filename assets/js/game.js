import { checkInput, inputTextElement } from "./check_input.js";
import {
  characters_group,
  generate_letters,
  lettersContainer,
} from "./character_names.js";

const images = [
  "https://c.tenor.com/5H996htYZAYAAAAd/dokutah-arknights.gif",
  "./assets/img/operator3.png",
];

// Choice a word
let word;
let backWord;
const setBoard = () => {
  word = generate_letters(characters_group);
  backWord = word.join("")
}
setBoard()


// Show Win Window if complete word
let modalWin = document.getElementById("modal-win")
const showWinWindow = (count) => {
  if (count == word.length) {
    modalWin.classList.remove("modal--hidden");
  }
}

// Add answers
let answer = document.getElementById("answer");
const addAnswer = () => {
  answer.innerHTML = backWord;
}


// Show Lose Window if complete hangman
let modalOver = document.getElementById("modal");
const showLoseWindow = (count, hangmanSize) => {
  if (count == hangmanSize) {
    addAnswer();
    modalOver.classList.remove("modal--hidden");
  }
}

// Add Correct Letter
let childGroup = lettersContainer.childNodes;
let letterCount = 0
const addCorrectLetter = (event) => {
  let index = word.indexOf(event.data);
  word.splice(index, 1, " ");
  inputTextElement.value = inputTextElement.value.replace(event.data, "");
  childGroup[index + 1].textContent = event.data;
  letterCount++;
  showWinWindow(letterCount)
}

// Change image incorrect
let headerImg = document.getElementById("header-img");
const changeImageIncorrect = () => {
    headerImg.src = images[1];
}

// Change image correct
const changeImageCorrect = () => {
    headerImg.src = images[0];
}

// Add hangman elements
let head = document.getElementById("head");
let body = document.getElementById("body");
let left_arm = document.getElementById("left-arm");
let right_arm = document.getElementById("right-arm");
let left_leg = document.getElementById("left-leg");
let right_leg = document.getElementById("right-leg");
let elements = [head, body, left_arm, right_arm, left_leg, right_leg];
let attempts = 0

const addHangmanElements = (event) => {
  if (event.inputType !== "deleteContentBackward") {

    elements[attempts].classList.remove("hidden");
    attempts++
    showLoseWindow(attempts, elements.length)
  }
}

// Check if contains letter
const checkIfContainsLetter = (input) => {
  if(word.includes(input.data)) {
    addCorrectLetter(input)
    changeImageCorrect()
  } else {
    addHangmanElements(input)
    changeImageIncorrect()
  }
}

// Check input
const checkInputEvent = () => {
  inputTextElement.addEventListener("input", (inputText) => {
    
    let state = checkInput(inputText);
    if (!state) {
  
      checkIfContainsLetter(inputText);
  
      let lettersWrong = new Set(inputTextElement.value)
      inputTextElement.value = Array.from(lettersWrong).join("");
    }
  });
}
checkInputEvent()