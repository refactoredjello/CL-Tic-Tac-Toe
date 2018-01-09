const Board = [
  ['-','-','-'],
  ['-','-','-'],
  ['-','-','-']
]

function printRow(row) {
  return row.reduce((acc, place) => {
    acc += ' ' + place + ' '
    return acc
  },'')
}
function printBoard() {
  console.log('-------------')
  Board.forEach(row  => {
    console.log('|', printRow(row), '|')
  })
  console.log('-------------')
}
function checkRows(board) {
  for (let row of board) {
    if (row.every(piece => piece === 'X')) return 'Player 1'
    if (row.every(piece => piece === 'O')) return 'Player 2'
  }
  return false
}
function checkColumns(board) {
  let rotatedBoard = board.map(row => row.slice())
  for (let i = 0; i < rotatedBoard.length; i++) {
    for (let j = 0; j < i; j++) {
      let temp = rotatedBoard[i][j]
      rotatedBoard[i][j] = rotatedBoard[j][i]
      rotatedBoard[j][i] = temp
    }
  }
  console.log('checking columns:  ', Board )
  return checkRows(rotatedBoard)
}

function checkDiagnols(board) {
  let majorDiagIdx = 0, minorDiagIdx = 2
  let majorDiag = [], minorDiag = []
  for (let row of board) {
    majorDiag.push(row[majorDiagIdx++])
    minorDiag.push(row[minorDiagIdx--])
  }
  let xWinner = majorDiag.every(piece => piece === 'X') || minorDiag.every(piece => piece === 'X')
  let oWinner = majorDiag.every(piece => piece === 'O') || minorDiag.every(piece => piece === 'O')
  if (xWinner) return 'Player 1'
  if (oWinner) return 'Player 2'
  return false
}

function checkSolution(){
  console.log('Checking solution: ', checkRows(Board), checkColumns(Board))
  return checkRows(Board) || checkColumns(Board) || checkDiagnols(Board)
}
function processMove(position, player) {
  let piece = player === 1 ? 'X' : 'O'
  if (Board[position.row] === undefined || Board[position.row][position.col] === undefined || Board[position.row][position.col] !== '-' ) {
    console.log('Invalid move, please try again \n')
    return false
  } else {
    Board[position.row][position.col] = piece
    return true
  }
}

process.stdin.setEncoding('utf8');


let playerOneTurn = true
process.stdin.on('data', function (text) {
  let position = {row: 0, col: 0}
  let parsedText= text
  position.row = parsedText[0]
  position.col = parsedText[2]

  if (playerOneTurn) {
    let changePlayer = processMove(position, 1)
    if (changePlayer) playerOneTurn = false
  } else {
    let changePlayer = processMove(position, 0)
    if (changePlayer) playerOneTurn = true
  }
  printBoard()
  console.log(Board)
  let winner = checkSolution()
  if(winner) done(winner)
  if (text === 'quit\n') {
    done();
  }
  console.log('\nPlease make a move \n')
});

function done(winner) {
  console.log('The winnder is ', winner)
  console.log('Thanks for playing!');
  process.exit();
}
console.log('please select a position, e.g. 1,2')


