import { createBlockedGrid, displayMap, resetLevelMap, resetConsole, processUserCode, checkIfCompleted} from './compiler.js';

const levelMapW = 30,levelMapH = 30;
let submitCodeBtn = document.getElementById("submitCode");
let resetMapBtn = document.getElementById("resetMapButton");
let resetConsoleBtn = document.getElementById("resetConsoleButton");
const GOAL_BLOCK = 12;

createBlockedGrid(levelMapW, levelMapH, GOAL_BLOCK,100,0.1);
window.onload = () => {
  displayMap(levelMapW, levelMapH, "levelTwoMapBox");
}

submitCodeBtn.addEventListener("click", () => {
  processUserCode(levelMapW, levelMapH, "levelTwoMapBox",2, GOAL_BLOCK);
  checkIfCompleted(GOAL_BLOCK);
});
resetMapBtn.addEventListener("click", () => {
  resetLevelMap(levelMapW, levelMapH, "levelTwoMapBox",2, GOAL_BLOCK);
});
resetConsoleBtn.addEventListener("click", () => {
  resetConsole();
})

