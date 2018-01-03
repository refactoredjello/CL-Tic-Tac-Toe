let Board = [
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

function processMove(position, player) {
  let piece = player === 1 ? 'X' : 'O'
  if (Board[position.row][position.col] !== '-' || Board[position.row][position.col] === undefined){
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
  if (text === 'quit\n') {
    done();
  }
  console.log('\nPlease make a move \n')
});

function done() {
  console.log('Thanks for playing!');
  process.exit();
}
console.log('please select a position, e.g. 1,2')


