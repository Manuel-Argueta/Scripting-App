import { createLevelGrid, displayBlockedMap, resetLevelMap, resetConsole, processUserCode, checkIfCompleted } from './compiler.js';

const levelMapW = 30,levelMapH = 30;
let submitCodeBtn = document.getElementById("submitCode");
let resetMapBtn = document.getElementById("resetMapButton");
let resetConsoleBtn = document.getElementById("resetConsoleButton");
const GOAL_BLOCK = 12;

createLevelGrid(levelMapW, levelMapH, GOAL_BLOCK);
window.onload = () => {
  displayBlockedMap(levelMapW, levelMapH, "levelTwoMapBox");
}

submitCodeBtn.addEventListener("click", () => {
  processUserCode(levelMapW, levelMapH, "levelTwoMapBox",true, GOAL_BLOCK);
  checkIfCompleted(GOAL_BLOCK);
});
resetMapBtn.addEventListener("click", () => {
  resetLevelMap(levelMapW, levelMapH, "levelTwoMapBox", GOAL_BLOCK);
});
resetConsoleBtn.addEventListener("click", () => {
  resetConsole();
})

createLevelGrid();
