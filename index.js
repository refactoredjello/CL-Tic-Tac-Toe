const util = require('util');
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
  } else {
    Board[position.row][position.col] = piece
  }
}
process.stdin.resume();
process.stdin.setEncoding('utf8');


let playerOneTurn = true
process.stdin.on('data', function (text) {
  let position = {row: 0, col: 0}
  let parsedText= text
  position.row = parsedText[0]
  position.col = parsedText[2]

  if (playerOneTurn) {
    processMove(position, 1)
    playerOneTurn = false
  } else {
    processMove(position, 0)
    playerOneTurn = true
  }
  printBoard()
  if (text === 'quit\n') {
    done();
  }
  console.log('\nPlease make a move \n')
});

function done() {
  console.log('Now that process.stdin is paused, there is nothing more to do.');
  process.exit();
}
console.log('please select a position, e.g. 1,2')


