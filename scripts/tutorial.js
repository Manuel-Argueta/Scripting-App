let tutorialMap = [];
let pepeCurrentI = 0,
  pepeCurrentJ = 0;
const tutorialMapW = 20,
  tutorialMapH = 20;

createTutorialGrid();

function createTutorialGrid() {
  let uniqueId = 0;
  for (let i = 0; i < tutorialMapW; i++) {
    tutorialMap[i] = [];
    for (let j = 0; j < tutorialMapH; j++) {
      let tmpDiv = document.createElement("div");
      tmpDiv.innerHTML = " ";
      tmpDiv.className = "block";
      tmpDiv.id = "block" + uniqueId.toString();
      tutorialMap[i][j] = tmpDiv;
      uniqueId++;
    }
  }
}

function deleteTutorialMap() {
  let uniqueId = 0;
  for (let i = 0; i < tutorialMapW; i++) {
    for (let j = 0; j < tutorialMapH; j++) {
      let tmpId = "block" + uniqueId.toString();
      let divToRemove = document.getElementById(tmpId)
      divToRemove.remove();
      uniqueId++;
    }
  }
}

function displayTutorialMap() {
  let mapBox = document.getElementById("tutorialMapBox");
  //<img id = "pepe_sprite" src = "../assets/pepe_sprite.jpg">
  let charSprite = document.createElement("img");
  charSprite.id = "pepe_sprite"
  charSprite.src = "../assets/pepe_sprite.jpg"
  for (let i = 0; i < tutorialMapW; i++) {
    for (let j = 0; j < tutorialMapH; j++) {
      if (tutorialMap[i][j].id == "block"+((tutorialMapH*tutorialMapW)-1).toString()) {
        tutorialMap[i][j].appendChild(charSprite);
        (pepeCurrentI = i), (pepeCurrentJ = j);
        tutorialMap[pepeCurrentI][pepeCurrentJ].style["background-color"] = "green"
      }
      mapBox.appendChild(tutorialMap[i][j]);
    }
  }
}

function updateTutorialMap() {
  let mapBox = document.getElementById("tutorialMapBox");
  for (let i = 0; i < tutorialMapW; i++) {
    for (let j = 0; j < tutorialMapH; j++) {
      mapBox.appendChild(tutorialMap[i][j]);
    }
  }
}

function makeMove(moveType) {
  let errorLog = document.createElement("p"), endLog = document.createElement("p");
  endLog.innerHTML = "Program terminated with OUT OF BOUNDS error."
  let charSprite = document.getElementById("pepe_sprite");
  let userConsole = document.getElementById("console-output")
  if (moveType == "U") {
    if (pepeCurrentI - 1 >= 0) {
      tutorialMap[pepeCurrentI - 1][pepeCurrentJ].style["background-color"] = "green"
      tutorialMap[pepeCurrentI - 1][pepeCurrentJ].appendChild(charSprite);
      updateTutorialMap();
      pepeCurrentI -= 1;
    } else {
      errorLog.innerHTML = "Error- U Move Out Of BOUNDS";
      userConsole.appendChild(errorLog);
      userConsole.appendChild(endLog)
      return 0
    }
  } else if (moveType == "D") {
    if (pepeCurrentI + 1 < tutorialMapH) {
      tutorialMap[pepeCurrentI + 1][pepeCurrentJ].style["background-color"] = "green"
      tutorialMap[pepeCurrentI + 1][pepeCurrentJ].appendChild(charSprite);
      updateTutorialMap();
      pepeCurrentI += 1;
    } else {
      errorLog.innerHTML = "Error- D Move Out Of BOUNDS";
      userConsole.appendChild(errorLog);
      userConsole.appendChild(endLog)
      return 0
    }
  } else if (moveType == "R") {
    if (tutorialMap[pepeCurrentI][pepeCurrentJ + 1] != undefined) {
      tutorialMap[pepeCurrentI][pepeCurrentJ + 1].style["background-color"] = "green"
      tutorialMap[pepeCurrentI][pepeCurrentJ + 1].appendChild(charSprite);
      updateTutorialMap();
      pepeCurrentJ += 1;
    } else {
      errorLog.innerHTML = "Error- R Move Out Of BOUNDS";
      userConsole.appendChild(errorLog);
      userConsole.appendChild(endLog)
      return 0
    }
  } else if (moveType == "L") {
    if (tutorialMap[pepeCurrentI][pepeCurrentJ - 1] != undefined) {
      tutorialMap[pepeCurrentI][pepeCurrentJ - 1].style["background-color"] = "green"
      tutorialMap[pepeCurrentI][pepeCurrentJ - 1].appendChild(charSprite);
      updateTutorialMap();
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
  let inputedProgram = document.getElementById('tutorial-text-editor').value.toString() 
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
  deleteTutorialMap();
  createTutorialGrid();
  displayTutorialMap();
}
