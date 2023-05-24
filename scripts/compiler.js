
let map = [];
let pepeCurrentI = 0, pepeCurrentJ = 0;
const restrictedWalls = ['block898', 'block868', 'block869','block899']

export const createGrid = (width, height) => {
  let uniqueId = 0;
  for (let i = 0; i < width; i++) {
    map[i] = [];
    for (let j = 0; j < height; j++) {
      let tmpDiv = document.createElement("div");
      tmpDiv.innerHTML = " ";
      tmpDiv.className = "block";
      tmpDiv.id = "block" + uniqueId.toString();
      map[i][j] = tmpDiv;
      uniqueId++;
    }
  }
}

export const createLevelGrid = (width, height, goalBlock) => {
  restrictedWalls.push(`block${goalBlock}`)
  let uniqueId = 0;
  for (let i = 0; i < width; i++) {
    map[i] = [];
    for (let j = 0; j < height; j++) {
      let tmpDiv = document.createElement("div");
      tmpDiv.innerHTML = " ";
      tmpDiv.className = "block";
      tmpDiv.id = "block" + uniqueId.toString();
      if (tmpDiv.id == `block${goalBlock}`) {
        tmpDiv.style["background-color"] = "white";
      }
      map[i][j] = tmpDiv;
      uniqueId++;
    }
  }
}

export const createBlockedGrid = (width, height, goalBlock,wallList) => {
  let uniqueId = 0;
  let currentWallI = 0;
  for (let i = 0; i < width; i++) {
    map[i] = [];
    for (let j = 0; j < height; j++) {
      let tmpDiv = document.createElement("div");
      tmpDiv.innerHTML = " ";
      tmpDiv.className = "block";
      tmpDiv.id = "block" + uniqueId.toString();
      if (tmpDiv.id == `block${goalBlock}`) {
        tmpDiv.style["background-color"] = "white";
      }
      if (wallList[currentWallI]) {
        tmpDiv.style["background-color"] = "red";
      }
      map[i][j] = tmpDiv;
      uniqueId++;
      currentWallI++;
    }
  }
}

export const deleteMap = (width, height) => {
  let uniqueId = 0;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let tmpId = "block" + uniqueId.toString();
      let divToRemove = document.getElementById(tmpId)
      divToRemove.remove();
      uniqueId++;
    }
  }
}

export const displayMap = (width, height, elementID) => {
  let mapBox = document.getElementById(elementID);
  let charSprite = document.createElement("img");
  charSprite.id = "pepe_sprite"
  charSprite.src = "../assets/pepe_sprite.png"
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (map[i][j].id == "block" + ((height * width) - 1).toString()) {
        map[i][j].appendChild(charSprite);
        (pepeCurrentI = i), (pepeCurrentJ = j);
        map[pepeCurrentI][pepeCurrentJ].style["background-color"] = "green"
      }
      mapBox.appendChild(map[i][j]);
    }
  }
}

export const refreshMap = (width, height, elementID, goalBlock, wallList) => {
  deleteMap(width, height);
  createBlockedGrid(width, height, goalBlock, wallList);
  displayMap(width, height, elementID);
}


export const makeMove = (moveType, height, elementID) => {
  let mapBox = document.getElementById(elementID);
  let errorLog = document.createElement("p"), endLog = document.createElement("p");
  endLog.innerHTML = " > Program terminated with OUT OF BOUNDS error."
  let charSprite = document.getElementById("pepe_sprite");
  let userConsole = document.getElementById("console-output")
  if (moveType == "U") {
    if (pepeCurrentI - 1 >= 0) {
      if (checkIfWallCollision(pepeCurrentI - 1, pepeCurrentJ)) {
        console.log("The UP Move is a Wall");
        return 0;
      } else {
        map[pepeCurrentI - 1][pepeCurrentJ].style["background-color"] = "green"
        map[pepeCurrentI - 1][pepeCurrentJ].appendChild(charSprite);
        mapBox.replaceChild(map[pepeCurrentI - 1][pepeCurrentJ], map[pepeCurrentI - 1][pepeCurrentJ]);
        pepeCurrentI -= 1;
      }
    } else {
      errorLog.innerHTML = " > Error - U Move Out Of BOUNDS";
      userConsole.appendChild(errorLog);
      userConsole.appendChild(endLog)
      return 0
    }
  } else if (moveType == "D") {
    if (pepeCurrentI + 1 < height) {
      if (checkIfWallCollision(pepeCurrentI + 1, pepeCurrentJ)) {
        return 0;
      } else {
        map[pepeCurrentI + 1][pepeCurrentJ].style["background-color"] = "green"
        map[pepeCurrentI + 1][pepeCurrentJ].appendChild(charSprite);
        mapBox.replaceChild(map[pepeCurrentI + 1][pepeCurrentJ], map[pepeCurrentI + 1][pepeCurrentJ]);
        pepeCurrentI += 1;
      }
    } else {
      errorLog.innerHTML = " > Error - D Move Out Of BOUNDS";
      userConsole.appendChild(errorLog);
      userConsole.appendChild(endLog)
      return 0
    }
  } else if (moveType == "R") {
    if (map[pepeCurrentI][pepeCurrentJ + 1] != undefined) {
      if (checkIfWallCollision(pepeCurrentI, pepeCurrentI)) {
        return 0;
      } else {
        map[pepeCurrentI][pepeCurrentJ + 1].style["background-color"] = "green"
        map[pepeCurrentI][pepeCurrentJ + 1].appendChild(charSprite);
        mapBox.replaceChild(map[pepeCurrentI][pepeCurrentJ + 1], map[pepeCurrentI][pepeCurrentJ + 1]);
        pepeCurrentJ += 1;
      }
    } else {
      errorLog.innerHTML = " > Error - R Move Out Of BOUNDS";
      userConsole.appendChild(errorLog);
      userConsole.appendChild(endLog)
      return 0
    }
  } else if (moveType == "L") {
    if (map[pepeCurrentI][pepeCurrentJ - 1] != undefined) {
      if (checkIfWallCollision(pepeCurrentI, pepeCurrentJ-1)) {
        return 0;
      } else {
        map[pepeCurrentI][pepeCurrentJ - 1].style["background-color"] = "green"
        map[pepeCurrentI][pepeCurrentJ - 1].appendChild(charSprite);
        mapBox.replaceChild(map[pepeCurrentI][pepeCurrentJ - 1], map[pepeCurrentI][pepeCurrentJ - 1]);
        pepeCurrentJ -= 1;
      }
    } else {
      errorLog.innerHTML = " > Error - L Move Out Of BOUNDS";
      userConsole.appendChild(errorLog);
      userConsole.appendChild(endLog)
      return 0
    }
  }
}

export const checkBasicLineSyntax = (currLine) => {
  if (currLine == "") {
    return true
  } else {
    let re = /GO\s*(U|D|L|R)[(]\s*(([1-9]|[1-9][0-9]|[1-9][0-9][0-9])|\s*)\s*[)]\s*/
    return re.test(currLine)
  }
}

export const processUserCode = (width, height, elementID, levelNum, goalBlock, wallList) => {
  if (levelNum == 1)
    resetLevelMap(width, height, elementID, goalBlock);
  else if (levelNum == 0)
    resetMap(width, height, elementID)
  else if (levelNum == 2) 
    refreshMap(width, height, elementID, goalBlock, wallList)
  const re = '\n'
  const validDir = ['U', 'D', 'L', 'R']
  let currMove = { moveType: "", moveRep: "" }, moveList = []
  let userConsole = document.getElementById("console-output")
  let processLog = document.createElement("p"), errorLog = document.createElement("p"), endLog = document.createElement("p");
  endLog.innerHTML = " > Program terminated with SYNTAX error."
  processLog.innerHTML = "> Proccesing program..."
  userConsole.appendChild(processLog)
  let inputedProgram = document.getElementById('text-editor').value.toString()
  if (!inputedProgram) {
    endLog.innerHTML = " > No program to run yet..."
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
        let currCopy = currentLine
        if ((/\d/.test(currentLine))) {
          currMove.moveRep = currCopy.replace(/[^0-9]/g, '')
        }
        if (!(/\d/.test(currentLine))) {
          currMove.moveRep = 1
        }
      }
      moveList.push(currMove)
    } else {
      errorLog.innerHTML = " > Error - Syntax Error on Line " + (i + 1).toString() + "."
      userConsole.appendChild(errorLog)
      userConsole.appendChild(endLog)
      return 0
    }
  }

  runUserCode(moveList, width, height, elementID);
}

export const runUserCode = (moves, width, height, elementID) => {
  let userConsole = document.getElementById("console-output")
  let runLog = document.createElement("p"), endLog = document.createElement("p")
  runLog.innerHTML = " > Running program..."
  userConsole.appendChild(runLog)
  for (let i = 0; i < moves.length; i++) {
    for (let j = 0; j < parseInt(moves[i].moveRep); j++) {
      if (makeMove(moves[i].moveType, height, elementID) == 0) {
        return 0
      }
    }
  }
  endLog.innerHTML = " > Program terminated succesfully."
  userConsole.appendChild(endLog)
}

export const resetConsole = () => {
  let userConsole = document.getElementById("console-output")
  while (userConsole.firstChild) {
    userConsole.removeChild(userConsole.firstChild);
  }
}

export const checkIfCompleted = (goalBlock) => {
  let endLog = document.createElement("p");
  let userConsole = document.getElementById("console-output")
  if (map[pepeCurrentI][pepeCurrentJ].id == `block${goalBlock}`) {
    endLog.innerHTML = "You have reached the end goal! You have completed this challenge."
    userConsole.appendChild(endLog)
    return 0
  } else {
    endLog.innerHTML = "You have NOT reached the end goal! Please retry this challenge."
    userConsole.appendChild(endLog)
    return 0
  }

}
export const checkIfWallCollision = (i,j) => {
  let endLog = document.createElement("p");
  let userConsole = document.getElementById("console-output")
  if (map[i][j].style["background-color"] == "red") {
    endLog.innerHTML = "You have hit a wall! Please retry this challenge."
    userConsole.appendChild(endLog)
    return true;
  }

  return false;
}

export const resetMap = (width, height, elementID) => {
  deleteMap(width, height);
  createGrid(width, height);
  displayMap(width, height, elementID);
}

export const resetLevelMap = (width, height, elementID, goalBlock) => {
  deleteMap(width, height);
  createLevelGrid(width, height, goalBlock);
  displayMap(width, height, elementID);
}


export const getBlockedWalls = (width, height, numWalls, density, goalBlock) => {
  restrictedWalls.push(`block${goalBlock}`)
  restrictedWalls.push(`block${goalBlock - 1}`)
  restrictedWalls.push(`block${goalBlock + 1}`)
  restrictedWalls.push(`block${goalBlock + 29}`)
  restrictedWalls.push(`block${goalBlock + 30}`)
  restrictedWalls.push(`block${goalBlock + 31}`)
  restrictedWalls.push(`block${goalBlock - 29}`)
  restrictedWalls.push(`block${goalBlock - 30}`)
  restrictedWalls.push(`block${goalBlock - 31}`)
  let tempWalls = [];
  let currID = 0;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (Math.random() <= density && numWalls > 0 && !restrictedWalls.includes(`block${currID}`)) {
        tempWalls.push(true);
        numWalls--;
      } else {
        tempWalls.push(false);
      }
      currID++
    }
  }
  return tempWalls;
}

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}