let blockSize = 25;
let rows = 20;
let columns = 20;

board = document.getElementById('board');
board.height = rows*blockSize;
board.width = columns*blockSize;

let context = board.getContext('2d');


//snake head
let snakeX = blockSize *5;
let snakeY = blockSize * 5;

//snake velocity
let velocityX = 0;
let velocityY = 0;

//snake's body
let snakeBody = [];

//food
let foodX = blockSize * 10;
let foodY = blockSize *10

let gameOver = false;


function update(){
    if (gameOver===true) return;

    context.fillStyle = 'Black';
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = 'Red';
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX===foodX && snakeY===foodY){
        snakeBody.push([foodX, foodY]);
        placefood();
    }

    for (let i = snakeBody.length - 1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length > 0){
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = 'Lime';
    snakeX+=velocityX * blockSize;
    snakeY+=velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    
    for (let i=0; i<snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }


    if (snakeX<0 || snakeX > columns*blockSize -1 || snakeY< 0 || snakeY > rows * blockSize -1){
        gameOver = true;
        alert('game over');
    }

    for (let i=0; i<snakeBody.length; i++){
        if (snakeX===snakeBody[i][0] && snakeY===snakeBody[i][1]){
            gameOver = true;
            alert('game over');
        }
    }
}

function placefood(){
    foodX = Math.floor(Math.random()*columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(e){
    let key = e.key;
    if ((key==='ArrowUp' || key==='w' || key==='i') && velocityY!==1){
        velocityX = 0;
        velocityY = -1;
    }
    else if ((key==='ArrowDown' || key==='s' || key==='k') && velocityY!==-1){
        velocityX = 0;
        velocityY = 1;
    }
    else if ((key==='ArrowRight' || key==='d' || key==='l') && velocityX!==-1){
        velocityX = 1;
        velocityY = 0;
    }
    else if ((key==='ArrowLeft' || key==='a' || key==='j') && velocityX!==1){
        velocityX = -1;
        velocityY = 0;
    }
}

placefood();
document.addEventListener('keydown', changeDirection);
//update();
setInterval(update, 1000/10);

