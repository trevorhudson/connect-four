"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // set "board" to empty HEIGHT x WIDTH matrix array

  // use a loop to generate the rows and cells
  // let row = Array.from({length: WIDTH});
  for (let y = 0; y < HEIGHT; y++) {
    let row = [];
    for (let x = 0; x < WIDTH; x++) {
      row.push(null);
    }
    board.push(row);
  }
}


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board');

  // creates an element row with an event listener handleClick();
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // creates a cell element that is appended to the head row.

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);


  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    // TODO: Create a table row element and assign to a "row" variable
    const row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      // Create a table cell element and assign to a "cell" variable
      const cell = document.createElement("td");

      // add an id, y-x, to the above table cell element
      cell.setAttribute("id", `${y}-${x}`);

      // you'll use this later, so make sure you use y-x

      // TODO: append the table cell to the table row
      row.append(cell);
    }
    // TODO: append the row to the html board

    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 5

  for (let y = HEIGHT - 1; y >= 0; y--) {
    let targetCell = document.getElementById(`${y}-${x}`);

    // if target cell includes a div, continue loop; if empty, return y;
    let piece = document.getElement;
    if (targetCell.childElementCount === 0) return y;
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // make a div and insert into correct table cell
  let coordinate = document.getElementById(`${y}-${x}`);
  let piece = document.createElement("div");

  piece.className = `piece p${currPlayer}`;
  coordinate.appendChild(piece);


}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  //

  let filled = document.querySelectorAll('.piece').length;
  const BOARD_SIZE = (HEIGHT * WIDTH);


  if (filled === BOARD_SIZE) endGame('game over');

  currPlayer = (currPlayer === 1) ? 2 : 1;

}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */

   function _win(cells) {
    // check that array sizes are still correct;

    return cells.every(([y, x]) => (y >= 0) && (y < HEIGHT) && (x >= 0) &&
    (x < WIDTH) && (board[y][x] === currPlayer));

    // takes in coords of cells
    // gets element at coord from DOM
    // checks if elements are all same color !! and not empty
    // TODO: Check four cells to see if they're all legal & all color of current
    // player

  }


  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDL = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDR = [[y, x + 3], [y + 1, x + 2], [y + 2, x + 1], [y + 3, x]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}


makeBoard();
makeHtmlBoard();
