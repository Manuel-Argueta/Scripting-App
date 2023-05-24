import { createGrid, displayMap, resetMap, resetConsole, processUserCode } from './compiler.js';

const tutorialMapW = 30, tutorialMapH = 30;
let submitCodeBtn = document.getElementById("submitCode");
let resetMapBtn = document.getElementById("resetMapButton");
let resetConsoleBtn = document.getElementById("resetConsoleButton");

window.onload = () => {
  createGrid(tutorialMapW, tutorialMapH);
  displayMap(tutorialMapW, tutorialMapH, "tutorialMapBox");
}

submitCodeBtn.addEventListener("click", () => {
  processUserCode(tutorialMapW, tutorialMapH, "tutorialMapBox",0,0);
});
resetMapBtn.addEventListener("click", () => {
  resetMap(tutorialMapW, tutorialMapH, "tutorialMapBox");
});
resetConsoleBtn.addEventListener("click", () => {
  resetConsole();
})