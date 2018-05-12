
module.exports =(message, response,TextMessage)=> {
  let userId = response.userProfile.id
  let result = "";
  let firebase =require('./../data/firebaseFunc')



let keyboard = (board, winner, buttons) => {

  let keyboard = {
    Type: "keyboard",
    Buttons: [{
      "Columns": 2,
      "Rows": 1,
      "ActionType": "reply",
      "ActionBody": "0",
      "BgColor": "#e0e0e0",
      "Text": '-',
      "TextHAlign": "center",
      "TextVAlign": "middle",

    }, {
      "Columns": 2,
      "Rows": 1,
      "ActionType": "reply",
      "ActionBody": "1",
      "BgColor": "#e0e0e0",
      "Text": '-',
      "TextHAlign": "center",
      "TextVAlign": "middle",

    }, {
      "Columns": 2,
      "Rows": 1,
      "ActionType": "reply",
      "ActionBody": "2",
      "BgColor": "#e0e0e0",
      "Text": '-',
      "TextHAlign": "center",
      "TextVAlign": "middle",

    }, {
      "Columns": 2,
      "Rows": 1,
      "ActionType": "reply",
      "ActionBody": "3",
      "BgColor": "#e0e0e0",
      "Text": '-',
      "TextHAlign": "center",
      "TextVAlign": "middle",

    }, {
      "Columns": 2,
      "Rows": 1,
      "ActionType": "reply",
      "ActionBody": "4",
      "BgColor": "#e0e0e0",
      "Text": '-',
      "TextHAlign": "center",
      "TextVAlign": "middle",

    }, {
      "Columns": 2,
      "Rows": 1,
      "ActionType": "reply",
      "ActionBody": "5",
      "BgColor": "#e0e0e0",
      "Text": '-',
      "TextHAlign": "center",
      "TextVAlign": "middle",

    }, {
      "Columns": 2,
      "Rows": 1,
      "ActionType": "reply",
      "ActionBody": "6",
      "BgColor": "#e0e0e0",
      "Text": '-',
      "TextHAlign": "center",
      "TextVAlign": "middle",

    }, {
      "Columns": 2,
      "Rows": 1,
      "ActionType": "reply",
      "ActionBody": "7",
      "BgColor": "#e0e0e0",
      "Text": '-',
      "TextHAlign": "center",
      "TextVAlign": "middle",

    }, {
      "Columns": 2,
      "Rows": 1,
      "ActionType": "reply",
      "ActionBody": "8",
      "BgColor": "#e0e0e0",
      "Text": '-',
      "TextHAlign": "center",
      "TextVAlign": "middle",

    }]
  };
  if (board) {
    for (let i = 0; i < board.length; i++) {
      if (board[i] == "X" || board[i] == 'O') {
        keyboard.Buttons[i].Text = board[i];
        keyboard.Buttons[i].ActionBody = board[i];
      }
    }
  }
  if (winner) {
    keyboard.Buttons.push({
      "Columns": 3,
      "Rows": 1,
      "ActionType": "reply",
      "ActionBody": "game",
      "BgColor": "#42f442",
      "Text": 'Play again',
      "TextHAlign": "center",
      "TextVAlign": "middle",

    });
    keyboard.Buttons.push({
      "Columns": 3,
      "Rows": 1,
      "ActionType": "reply",
      "ActionBody": "wiki",
      "BgColor": "#f44141",
      "Text": 'I give up',
      "TextHAlign": "center",
      "TextVAlign": "middle",

    });

  }
  if (buttons) {
    keyboard.Buttons = buttons;
  }


  return keyboard
};


let getResult = () => {

  return result
};
let getEmptyPositions = (board) => {

  let emptyPosition = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] == 'E') {
      emptyPosition.push(i);
    }
  }
  return emptyPosition;
};

let fillBoard = (botMoves, userMoves) => {

  let board = ["E", "E", "E", "E", "E", "E", "E", "E", "E"];
  for (let i = 0; i < botMoves.length; i++) {
    board[botMoves[i]] = 'O'
  }
  for (let i = 0; i < userMoves.length; i++) {
    board[userMoves[i]] = 'X'
  }
  return board;
};


let checkForWin = (board) => {

  let B = board;
  //check rows
  for (let i = 0; i <= 6; i = i + 3) {
    if (B[i] !== "E" && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
      if (B[i] == 'X') {
        result = "You won"; //update the state result
      } else {
        result = "Sorry,I won"; //update the state result
      }

      return true;
    }
  }

  //check columns
  for (let i = 0; i <= 2; i++) {
    if (B[i] !== "E" && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
      if (B[i] == 'X') {
        result = "You won"; //update the state result
      } else {
        result = "Sorry,I won"; //update the state result
      }
      return true;
    }
  }

  //check diagonals
  for (let i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
    if (B[i] !== "E" && B[i] == B[i + j] && B[i + j] === B[i + 2 * j]) {
      if (B[i] == 'X') {
        result = "You won"; //update the state result
      } else {
        result = "Sorry,I won"; //update the state result
      }
      return true;
    }
  }

  let available = B.indexOf('E') > -1;
  if (!available) {
    //the game is draw
    result = "draw"; //update the state result
    return true;
  }
  else {
    return false;
  }
};
let checkForCriticalWinMove = (board) => {

  let B = board;
  let criticalWinMove = -1;
  //check rows
  for (let i = 0; i <= 6; i = i + 3) {
    let oCells = [];
    let emptyCells = [];
    for (let j = i; j < i + 3; j++) {
      if (B[j] == "O") {
        oCells.push(j);
      }
      if (B[j] == "E") {
        emptyCells.push(j);
      }
    }
    if (oCells.length == 2 && emptyCells.length == 1) {
      criticalWinMove = emptyCells[0];
      return criticalWinMove;
    }
  }

  //check columns
  for (let i = 0; i <= 2; i++) {
    let oCells = [];
    let emptyCells = [];
    for (let j = i; j <= i + 6; j = j + 3) {
      if (B[j] == "O") {
        oCells.push(j);
      }
      if (B[j] == "E") {
        emptyCells.push(j);
      }
    }
    if (oCells.length == 2 && emptyCells.length == 1) {
      criticalWinMove = emptyCells[0];
      return criticalWinMove;
    }
  }

  //check diagonals
  for (let i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
    let diagonal = [B[i], B[i + j], B[i + 2 * j]];
    let oCells = [];
    let emptyCells = [];
    for (let d = 0; d < diagonal.length; d++) {
      if (diagonal[d] == "O") {
        oCells.push(d);
      }
      if (diagonal[d] == "E") {
        emptyCells.push(d);
      }
    }
    if (oCells.length == 2 && emptyCells.length == 1) {

      switch (emptyCells[0]) {
        case 0:
          criticalWinMove = i;
          break;
        case 1:
          criticalWinMove = i + j;
          break;
        case 2:
          criticalWinMove = i + 2 * j;
          break;

      }
      return criticalWinMove;
    }

  }
  return criticalWinMove

};

let checkForCriticalDeffence = (board) => {

  let B = board;
  let criticalDeffenceMove = -1;
  //check rows
  for (let i = 0; i <= 6; i = i + 3) {
    let xCells = [];
    let emptyCells = [];
    for (let j = i; j < i + 3; j++) {
      if (B[j] == "X") {
        xCells.push(j);
      }
      if (B[j] == "E") {
        emptyCells.push(j);
      }
    }
    if (xCells.length == 2 && emptyCells.length == 1) {
      criticalDeffenceMove = emptyCells[0];
      return criticalDeffenceMove;
    }
  }

  //check columns
  for (let i = 0; i <= 2; i++) {
    let xCells = [];
    let emptyCells = [];
    for (let j = i; j <= i + 6; j = j + 3) {
      if (B[j] == "X") {
        xCells.push(j);
      }
      if (B[j] == "E") {
        emptyCells.push(j);
      }
    }
    if (xCells.length == 2 && emptyCells.length == 1) {
      criticalDeffenceMove = emptyCells[0];
      return criticalDeffenceMove;
    }


    // if (B[i] !== "E" && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
    //     result = B[i] + "-won"; //update the state result
    //     return true;
    // }
  }

  //check diagonals
  for (let i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
    let diagonal = [B[i], B[i + j], B[i + 2 * j]];
    let xCells = [];
    let emptyCells = [];
    for (let d = 0; d < diagonal.length; d++) {
      if (diagonal[d] == "X") {
        xCells.push(d);
      }
      if (diagonal[d] == "E") {
        emptyCells.push(d);
      }
    }
    if (xCells.length == 2 && emptyCells.length == 1) {
      criticalDeffenceMove = emptyCells[0];
      switch (emptyCells[0]) {
        case 0:
          criticalDeffenceMove = i;
          break;
        case 1:
          criticalDeffenceMove = i + j;
          break;
        case 2:
          criticalDeffenceMove = i + 2 * j;
          break;

      }
      return criticalDeffenceMove;
    }

  }
  return criticalDeffenceMove

}

if (message.match(/game|play|игра|играи/i)) {
  firebase.starGame(response.userProfile.id);
  return (new TextMessage('Lets play Tic Tac Toe', keyboard()))

} else if (+message >= 0 && +message < 9) {
  console.log('incoming msg- '+message)
  firebase.addUserMove(message, userId).then((res) => {
      Promise.all([firebase.getUserMoves(userId), firebase.getBotMoves(userId)])
        .then(values => {
          let botMoves = values[1].val();
          let userMoves = values[0].val();
          let board = fillBoard(botMoves, userMoves);
          console.log(board)
          if (checkForWin(board)) {
            console.log('return -394')
            response.send(new TextMessage(getResult(), keyboard(board, true)))
          } else {
            if (checkForCriticalWinMove(board) != -1) {
              let bestBotMove = checkForCriticalWinMove(board);
              firebase.addBotMove(bestBotMove, userId)
                .then((err) => {
                  board[bestBotMove] = 'O';
                  if (checkForWin(board)) {
                    console.log('return -403')
                    response.send (new TextMessage(getResult(), keyboard(board, true)))
                  } else {
                    console.log('return -406')

                    response.send (new TextMessage(board.toString(), keyboard(board)))
                  }
                })
            } else if (checkForCriticalDeffence(board) != -1) {
              let bestBotMove = checkForCriticalDeffence(board);
              firebase.addBotMove(bestBotMove, userId)
                .then((error) => {
                  board[bestBotMove] = 'O';
                  if (checkForWin(board)) {
                    console.log('return -417')

                    response.send(new TextMessage(getResult(), keyboard(board, true)))
                  } else {
                    console.log('return -421')
                    response.send(new TextMessage('Nice try :)', keyboard(board)))
                  }
                })
            } else {

              let emptyCellss = getEmptyPositions(board);
              let emptyCellsNumber = emptyCellss.length - 1;
              let botMove = emptyCellss[Math.floor(Math.random() * (emptyCellsNumber + 1))]
              firebase.addBotMove(botMove, userId).then((err) => {
                board[botMove] = 'O';
                if (checkForWin(board)) {
                  console.log('return -433')
                  response.send(new TextMessage(getResult(), keyboard(board, true)))
                } else {
                  console.log('return -436')
                  response.send(new TextMessage('Your turn :)', keyboard(board)))
                }

              })

            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  );
} else {
  console.log('return -451')
  return (new TextMessage('Cheater'))
}
}
