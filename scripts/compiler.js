
let map = [];
let pepeCurrentI = 0, pepeCurrentJ = 0;
const restrictedWalls = ['block19','block360','block361','block381','block18','block38','block39']

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

//MAKE STATIC
export const displayBlockedMap = (width, height, elementID) => {
  let mapBox = document.getElementById(elementID);
  let charSprite = document.createElement("img");
  charSprite.id = "pepe_sprite"
  charSprite.src = "../assets/pepe_sprite.png"
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let possWallI = getRandomInt(0,20);
      let possWallJ = getRandomInt(0,20);
      if (restrictedWalls.includes(map[i][j].id) == false) {
            if (possWallI == i || possWallJ == j) {
            map[i][j].style["background-color"] = "red"
            }
      }
      if (map[i][j].id == "block"+((height*width)-width).toString()) {
        map[i][j].appendChild(charSprite);
        (pepeCurrentI = i), (pepeCurrentJ = j);
        map[pepeCurrentI][pepeCurrentJ].style["background-color"] = "green"
      }
      mapBox.appendChild(map[i][j]);
    }
  }
}


export const updateMap = (width, height, elementID) => {
  let mapBox = document.getElementById(elementID);
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      mapBox.appendChild(map[i][j]);
    }
  }
}

//FIX MAKE MOVE TO INCLUDE THE CHECK COLLISOIN METHOD AND PREVENT THE MAP FROM CHANGING
export const makeMove = (moveType, width, height, elementID) => {
  let errorLog = document.createElement("p"), endLog = document.createElement("p");
  endLog.innerHTML = " > Program terminated with OUT OF BOUNDS error."
  let charSprite = document.getElementById("pepe_sprite");
  let userConsole = document.getElementById("console-output")
  if (moveType == "U") {
    if (pepeCurrentI - 1 >= 0) {
      map[pepeCurrentI - 1][pepeCurrentJ].style["background-color"] = "green"
      map[pepeCurrentI - 1][pepeCurrentJ].appendChild(charSprite);
      updateMap(width, height, elementID);
      pepeCurrentI -= 1;
    } else {
      errorLog.innerHTML = " > Error - U Move Out Of BOUNDS";
      userConsole.appendChild(errorLog);
      userConsole.appendChild(endLog)
      return 0
    }
  } else if (moveType == "D") {
    if (pepeCurrentI + 1 < height) {
      map[pepeCurrentI + 1][pepeCurrentJ].style["background-color"] = "green"
      map[pepeCurrentI + 1][pepeCurrentJ].appendChild(charSprite);
      updateMap(width, height, elementID);
      pepeCurrentI += 1;
    } else {
      errorLog.innerHTML = " > Error - D Move Out Of BOUNDS";
      userConsole.appendChild(errorLog);
      userConsole.appendChild(endLog)
      return 0
    }
  } else if (moveType == "R") {
    if (map[pepeCurrentI][pepeCurrentJ + 1] != undefined) {
      map[pepeCurrentI][pepeCurrentJ + 1].style["background-color"] = "green"
      map[pepeCurrentI][pepeCurrentJ + 1].appendChild(charSprite);
      updatemap(width, height, elementID);
      pepeCurrentJ += 1;
    } else {
      errorLog.innerHTML = " > Error - R Move Out Of BOUNDS";
      userConsole.appendChild(errorLog);
      userConsole.appendChild(endLog)
      return 0
    }
  } else if (moveType == "L") {
    if (map[pepeCurrentI][pepeCurrentJ - 1] != undefined) {
      map[pepeCurrentI][pepeCurrentJ - 1].style["background-color"] = "green"
      map[pepeCurrentI][pepeCurrentJ - 1].appendChild(charSprite);
      updateMap(width, height, elementID);
      pepeCurrentJ -= 1;
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

export const processUserCode = (width, height, elementID,levelBool, goalBlock) => {
  if (levelBool)
    resetLevelMap(width, height, elementID, goalBlock);
  else 
    resetMap(width,height,elementID)
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
        //c = currentLine[j]
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
      if (makeMove(moves[i].moveType, width, height, elementID) == 0) {
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
export const checkIfWallCollision = () => {
  let endLog = document.createElement("p");
  let userConsole = document.getElementById("console-output")
  if (map[pepeCurrentI][pepeCurrentJ].style["background-color"] == "red") {
    endLog.innerHTML = "You have hit a wall! PLease retry this challenge."
    userConsole.appendChild(endLog)
    return true
  }
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


export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}