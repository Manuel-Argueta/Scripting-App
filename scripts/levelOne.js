import { createLevelGrid, displayMap, resetLevelMap, resetConsole, processUserCode, checkIfCompleted } from './compiler.js';

const levelMapW = 30,levelMapH = 30;
let submitCodeBtn = document.getElementById("submitCode");
let resetMapBtn = document.getElementById("resetMapButton");
let resetConsoleBtn = document.getElementById("resetConsoleButton");
const GOAL_BLOCK = 94;

createLevelGrid(levelMapW, levelMapH, GOAL_BLOCK);
window.onload = () => {
  displayMap(levelMapW, levelMapH, "levelOneMapBox");
}

submitCodeBtn.addEventListener("click", () => {
  processUserCode(levelMapW, levelMapH, "levelOneMapBox",true, GOAL_BLOCK);
  checkIfCompleted(GOAL_BLOCK);
});
resetMapBtn.addEventListener("click", () => {
  resetLevelMap(levelMapW, levelMapH, "levelOneMapBox", GOAL_BLOCK);
});
resetConsoleBtn.addEventListener("click", () => {
  resetConsole();
})