//CONSTANTS
const lookup = {
    '1': 'hotpink',
    '-1': 'aqua',
    'null': 'black'
  };

const winningCombos = [
    //rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    //columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    //diagonals
    [2, 4, 6],
    [0, 4, 8]
];

// VARIABLES
let board, turn, winner;

//cached elements
const squares = document.querySelectorAll('td div');
const winningMsg= document.querySelector('h2');

//EVENT LISTENERS
// need to click everywhere on the document 
// need to click button
document.querySelector('button').addEventListener('click', init);
document.querySelector('table').addEventListener('click', handleMove);

//FUNCTIONS

init();

// get the index of squares
// check if the square is open if it's not then return
// update turn, winner, and board


function handleMove(event) {
    const idx = parseInt(event.target.id.replace('square',''));
    if (board[idx] || winner) return;
    board[idx] = turn;
    turn *= -1;
    winner = getWinner();
    render ();
}

// How to get the winner?
// loop through all the winning combos
// need to get 3 
function getWinner() {
    for (let index = 0; index < winningCombos.length; index++) {
        if (Math.abs(board[winningCombos[index][0]]+ board[winningCombos[index][1]]+ board[winningCombos[index][2]]) === 3) return board[winningCombos[index][0]];
        
    }
    if (board.includes(null)) return null;
    return 'T';
}

function render() {
    board.forEach(function(square,idx) {
        squares[idx].style.background = lookup[square];
    });
    if (winner === 'T') {
        winningMsg.innerHTML = 'Tie!';
    } else if (winner) {
        winningMsg.innerHTML = `Yay ${lookup[winner]}!`;
    } else {
        winningMsg.innerHTML = `${lookup[turn]}'s Turn`;
    }
}

// start game
// board should be empty
// no winner
function init(){
    board = new Array(9).fill(null);
    turn = 1;
    winner = false;
    render();
}
