// Function to find the shortest path
import { shortestPathSearch } from './shortestPathSearch.js';

//function rungame(){
const board = document.getElementById("game-board");
const rows = 16;
const cols = 16;
const wallsN = 32;
let score = 0;
let moveNPCInterval;
const circle = document.createElement("div");
const NPC = document.createElement("div");
circle.classList.add("circle");
NPC.classList.add("npc");
let speed = 1000;


let game_board = []//[
//  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//]
//for (let i = rows; i > 0; i--) {
//  game_board.push([0][0]);
//};
game_board = Array.from({ length: rows }, () => Array(cols).fill(0));
console.log(game_board);

// Initialize the circle's position
let x = 0;
let y = 0;

// Initialize the NPC's position
let npc_x = cols-1;
let npc_y = 0;


function setBoard() {
  for (let i = wallsN; i > 0; i--) {
    ;
    let row = (Math.floor((Math.random() * rows)));
    let col = (Math.floor((Math.random() * cols)));
    game_board[row][col] = (1);
  }

};

function spawnCoin() {
  let coin_y = (Math.floor((Math.random() * rows)));
  let coin_x = (Math.floor((Math.random() * cols)));
  if(game_board[coin_y][coin_x] == 0){
    const coin = document.createElement("div");
    coin.classList.add("coin");
    board.rows[coin_y].cells[coin_x].appendChild(coin);;
  }
  else{
    spawnCoin();
  }
};
// Create the game board
function createBoard() {
  for (let i = 0; i < rows; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("td");
      row.appendChild(cell);
      if (game_board[i][j] == 1) {
        // Create a square element
        const square = document.createElement("div");
        //let walls = Math.floor((Math.random() * 3) + 1);

        square.classList.add("square1");


        cell.appendChild(square);
      }
      if (game_board[i][j] == 2) {
        // Create a coin element
        const coin = document.createElement("div");
        coin.classList.add("coin");
        cell.appendChild(coin);
      }
      board.appendChild(row);
    }
  }
  board.rows[y].cells[x].appendChild(circle);
  board.rows[npc_y].cells[npc_x].appendChild(NPC);
}



function checkCoin() {
  // Check if the coin is in the same position as the circle
  if (board.rows[y].cells[x].querySelector('.coin')) {
    score++;
    leveling();
    let currentCoin = board.rows[y].cells[x].querySelector('.coin');
    document.querySelector('.score-counter').textContent = score;
    board.rows[y].cells[x].removeChild(currentCoin);
    game_board[y][x] = 0;
    spawnCoin();
  }
}

// Function to move the circle
function moveCircle(event) {
  // Remove the circle from the current position

  let newX = x;
  let newY = y;

  switch (event.key) {
    case "ArrowUp":
      if (y > 0) {
        newY = y - 1;
      }
      break;
    case "ArrowDown":
      if (y < rows - 1) {
        newY = y + 1;
      }
      break;
    case "ArrowLeft":
      if (x > 0) {
        newX = x - 1;
      }
      break;
    case "ArrowRight":
      if (x < cols - 1) {
        newX = x + 1;
      }
      break;
    case "r":
      reset();
      newX = x;
      newY = y;
      break;
  }

  // Update the circle's position only if it's a valid move
  if (!board.rows[newY].cells[newX].querySelector('.square1')) {
    x = newX;
    y = newY;
  }

  checkCoin()

  // Add the circle to the new position
  board.rows[y].cells[x].appendChild(circle);

  // Check if the NPC is on the same position as player
  checkKill();
}

function checkKill() {
  if (npc_x == x && npc_y == y) {
    //board.rows[y].cells[x].removeChild(circle);
    //document.removeEventListener("keydown", moveCircle);
    //clearInterval(moveNPCInterval); 

    reset();
    console.log("Game Over");
     
  }
}

// Function to move the NPC
function moveNPC() {
  // Calculate the shortest path from the enemy to the player
  let path = shortestPathSearch(game_board, npc_y, npc_x, y, x);

  if (path.length > 0) {
    npc_x = path[1][1];
    npc_y = path[1][0];
  }
  board.rows[npc_y].cells[npc_x].appendChild(NPC);
  checkKill();
}

function leveling(){
  let set_score = 25;
  let inc_score = 5;
  if(score == 5){
  speed = 900;
  }
  if(score == 10){
  speed = 800;
  }
  if(score == 15){
  speed = 700;
  }
  if(score == 20){
  speed = 600;
  }
  if(score == 25){
  speed = 500;
  }
  if (score >= set_score) {
    let speed_add = 50; 
    
    if(score == set_score + inc_score){
      speed = speed - speed_add;
      set_score = score;
    }
  }
  clearInterval(moveNPCInterval);
  moveNPCInterval = setInterval(moveNPC, speed);
}




setBoard();
createBoard();
spawnCoin();

// Run moveNPC every second
moveNPCInterval = setInterval(moveNPC, speed);


// Listen for keyboard events
document.addEventListener("keydown", moveCircle);
//}
//rungame();
function reset(){
  alert("Game Over\nScore: " + score);
  
  //if(1){
    //board.rows[npc_y].cells[npc_x].removeChild(NPC);
    speed = 1000;
    score = 0;
    npc_x = cols-1;
    npc_y = 0;
    x = 0;
    y = 0;
    //moveCircle();
    document.querySelector('.score-counter').textContent = score;
    board.rows[y].cells[x].appendChild(circle);
  board.rows[y].cells[x].appendChild(circle);

    clearInterval(moveNPCInterval);
    board.rows[npc_y].cells[npc_x].appendChild(NPC);
    moveNPCInterval = setInterval(moveNPC, speed);
    document.querySelector('.score-counter').textContent = score;
    
    //resetboard();
    //createBoard();
    //leveling();

  //}
}

// function  resetboard(){
//   game_board = []
//   setBoard();
//   createBoard();

// }