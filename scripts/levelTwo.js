import { createBlockedGrid, displayMap, refreshMap, resetConsole, processUserCode, checkIfCompleted, getBlockedWalls} from './compiler.js';

const levelMapW = 30,levelMapH = 30;
let submitCodeBtn = document.getElementById("submitCode");
let resetMapBtn = document.getElementById("resetMapButton");
let resetConsoleBtn = document.getElementById("resetConsoleButton");
let wallList;
const GOAL_BLOCK = 47;


window.onload = () => {
  wallList = getBlockedWalls(levelMapW, levelMapH, (levelMapH*levelMapW), 0.15, GOAL_BLOCK);
  createBlockedGrid(levelMapW, levelMapH, GOAL_BLOCK, wallList);
  displayMap(levelMapW, levelMapH, "levelTwoMapBox");
}

submitCodeBtn.addEventListener("click", () => {
  processUserCode(levelMapW, levelMapH, "levelTwoMapBox",2, GOAL_BLOCK, wallList);
  checkIfCompleted(GOAL_BLOCK);
});
resetMapBtn.addEventListener("click", () => {
  refreshMap(levelMapW, levelMapH, "levelTwoMapBox", GOAL_BLOCK, wallList);
});
resetConsoleBtn.addEventListener("click", () => {
  resetConsole();
})

