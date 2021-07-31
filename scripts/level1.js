let levelMap = [];
let pepeCurrentI = 0,
  pepeCurrentJ = 0;
const levelMapW = 20,
  levelMapH = 20;

createLevelGrid();

function createLevelGrid() {
  let uniqueId = 0;
  for (let i = 0; i < levelMapW; i++) {
    levelMap[i] = [];
    for (let j = 0; j < levelMapH; j++) {
      let tmpDiv = document.createElement("div");
      tmpDiv.innerHTML = " ";
      tmpDiv.className = "block";
      tmpDiv.id = "block" + uniqueId.toString();
      if (tmpDiv.id == "block94") {
          tmpDiv.style["background-color"] = "black"
      }
      levelMap[i][j] = tmpDiv;
      uniqueId++;
    }
  }
}

function deleteLevelMap() {
  let uniqueId = 0;
  for (let i = 0; i < levelMapW; i++) {
    for (let j = 0; j < levelMapH; j++) {
      let tmpId = "block" + uniqueId.toString();
      let divToRemove = document.getElementById(tmpId)
      divToRemove.remove();
      uniqueId++;
    }
  }
}

function displayLevelMap() {
  let mapBox = document.getElementById("levelOneMapBox");
  //<img id = "pepe_sprite" src = "../assets/pepe_sprite.jpg">
  let charSprite = document.createElement("img");
  charSprite.id = "pepe_sprite"
  charSprite.src = "../assets/pepe_sprite.jpg"
  for (let i = 0; i < levelMapW; i++) {
    for (let j = 0; j < levelMapH; j++) {
      
      if (levelMap[i][j].id == "block"+((levelMapH*levelMapW)-levelMapW).toString()) {
        levelMap[i][j].appendChild(charSprite);
        (pepeCurrentI = i), (pepeCurrentJ = j);
        levelMap[pepeCurrentI][pepeCurrentJ].style["background-color"] = "green"
      }
      mapBox.appendChild(levelMap[i][j]);
    }
  }
}

function updateLevelMap() {
  let mapBox = document.getElementById("levelOneMapBox");
  for (let i = 0; i < levelMapW; i++) {
    for (let j = 0; j < levelMapH; j++) {
      mapBox.appendChild(levelMap[i][j]);
    }
  }
}

function checkIfCompleted() {
    let endLog = document.createElement("p");
    let userConsole = document.getElementById("console-output")
    if (levelMap[pepeCurrentI][pepeCurrentJ].id == "block94") {
      endLog.innerHTML = "You have reached the end goal! You have completed this challenge."
      userConsole.appendChild(endLog)
      return 0
    } else {
        endLog.innerHTML = "You have NOT reached the end goal! Please retry this challenge."
        userConsole.appendChild(endLog)
        return 0
    }

}

function makeMove(moveType) {
  let errorLog = document.createElement("p"), endLog = document.createElement("p");
  endLog.innerHTML = "Program terminated with OUT OF BOUNDS error."
  let charSprite = document.getElementById("pepe_sprite");
  let userConsole = document.getElementById("console-output")
  if (moveType == "U") {
    if (pepeCurrentI - 1 >= 0) {
      levelMap[pepeCurrentI - 1][pepeCurrentJ].style["background-color"] = "green"
      levelMap[pepeCurrentI - 1][pepeCurrentJ].appendChild(charSprite);
      updateLevelMap();
      pepeCurrentI -= 1;
    } else {
      errorLog.innerHTML = "Error- U Move Out Of BOUNDS";
      userConsole.appendChild(errorLog);
      userConsole.appendChild(endLog)
      return 0
    }
  } else if (moveType == "D") {
    if (pepeCurrentI + 1 < levelMapH) {
      levelMap[pepeCurrentI + 1][pepeCurrentJ].style["background-color"] = "green"
      levelMap[pepeCurrentI + 1][pepeCurrentJ].appendChild(charSprite);
      updateLevelMap();

      pepeCurrentI += 1;
    } else {
      errorLog.innerHTML = "Error- D Move Out Of BOUNDS";
      userConsole.appendChild(errorLog);
      userConsole.appendChild(endLog)
      return 0
    }
  } else if (moveType == "R") {
    if (levelMap[pepeCurrentI][pepeCurrentJ + 1] != undefined) {
      levelMap[pepeCurrentI][pepeCurrentJ + 1].style["background-color"] = "green"
      levelMap[pepeCurrentI][pepeCurrentJ + 1].appendChild(charSprite);
      updateLevelMap();
      pepeCurrentJ += 1;
    } else {
      errorLog.innerHTML = "Error- R Move Out Of BOUNDS";
      userConsole.appendChild(errorLog);
      userConsole.appendChild(endLog)
      return 0
    }
  } else if (moveType == "L") {
    if (levelMap[pepeCurrentI][pepeCurrentJ - 1] != undefined) {
      levelMap[pepeCurrentI][pepeCurrentJ - 1].style["background-color"] = "green"
      levelMap[pepeCurrentI][pepeCurrentJ - 1].appendChild(charSprite);
      updateLevelMap();
      pepeCurrentJ -= 1;
    } else {
      errorLog.innerHTML = "Error- L Move Out Of BOUNDS";
      userConsole.appendChild(errorLog);
      userConsole.appendChild(endLog)
      return 0
    }
  }
}

function checkBasicLineSyntax(currLine) {
  if (currLine == "") {
    return true
  } else {
    let re = /GO\s*(U|D|L|R)[(]\s*(([1-9]|[1-9][0-9]|[1-9][0-9][0-9])|\s*)\s*[)]\s*/
    return re.test(currLine)
  }
}
function proccesUserCode() {
  resetMap();
  const re = '\n'
  const validDir = ['U', 'D', 'L', 'R']
  let currMove = { moveType: "", moveRep: "" }, moveList = []
  let userConsole = document.getElementById("console-output")
  let processLog = document.createElement("p"), errorLog = document.createElement("p"), endLog = document.createElement("p");
  endLog.innerHTML = "Program terminated with SYNTAX error."
  processLog.innerHTML = "Proccesing program..."
  userConsole.appendChild(processLog)
  let inputedProgram = document.getElementById('level-text-editor').value.toString() 
  if (!inputedProgram) {
    endLog.innerHTML = "No program to run yet..."
    userConsole.appendChild(endLog);
    return 0
  }
  inputedProgram += re
  let seperatedProgram = inputedProgram.split(re);
  for (let i = 0; i < seperatedProgram.length; i++) {
    let currentLine = seperatedProgram[i];
    if (checkBasicLineSyntax(currentLine) == true) {
      currMove = { moveType: "", moveRep: "" }
      for (let j = 0; j < validDir.length; j++) {
        if (currentLine.includes(validDir[j])) {
          currMove.moveType = validDir[j];
        }
      }
      for (let j = 0; j < currentLine.length; j++) {
        c = currentLine[j]
        currCopy = currentLine
        if ((/\d/.test(currentLine))) {
          currMove.moveRep = currCopy.replace(/[^0-9]/g, '')
        }
        if (!(/\d/.test(currentLine))) {
          currMove.moveRep = 1
        }
      }
      moveList.push(currMove)
    } else {
      errorLog.innerHTML = "Error - Syntax Error on Line " + (i + 1).toString() + "."
      userConsole.appendChild(errorLog)
      userConsole.appendChild(endLog)
      return 0
    }
  }
  runUserCode(moveList);
  checkIfCompleted();
}

function runUserCode(moves) {
  let userConsole = document.getElementById("console-output")
  let runLog = document.createElement("p"), endLog = document.createElement("p")
  runLog.innerHTML = "Running program..."
  userConsole.appendChild(runLog)
  for (let i = 0; i < moves.length; i++) {
    for (let j = 0; j < parseInt(moves[i].moveRep); j++) {
      if (makeMove(moves[i].moveType) == 0) {
        return 0
      }
    }
  }
  endLog.innerHTML = "Program terminated succesfully."
  userConsole.appendChild(endLog)
}

function resetConsole() {
  let userConsole = document.getElementById("console-output")
  while (userConsole.firstChild) {
    userConsole.removeChild(userConsole.firstChild);
  }
}

function resetMap() {
  deleteLevelMap();
  createLevelGrid();
  displayLevelMap();
}
