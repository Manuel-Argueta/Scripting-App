import { createLevelGrid, displayMap, resetLevelMap, resetConsole, processUserCode, checkIfCompleted } from './compiler.js';

const levelMapW = 30,levelMapH = 30;
let submitCodeBtn = document.getElementById("submitCode");
let resetMapBtn = document.getElementById("resetMapButton");
let resetConsoleBtn = document.getElementById("resetConsoleButton");
const GOAL_BLOCK = 94;


window.onload = () => {
  createLevelGrid(levelMapW, levelMapH, GOAL_BLOCK,100,0.1);
  displayMap(levelMapW, levelMapH, "levelOneMapBox");
}

submitCodeBtn.addEventListener("click", () => {
  processUserCode(levelMapW, levelMapH, "levelOneMapBox",1, GOAL_BLOCK);
  checkIfCompleted(GOAL_BLOCK);
});
resetMapBtn.addEventListener("click", () => {
  resetLevelMap(levelMapW, levelMapH, "levelOneMapBox", GOAL_BLOCK);
});
resetConsoleBtn.addEventListener("click", () => {
  resetConsole();
})