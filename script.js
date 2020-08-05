const cells = Array.from(document.querySelectorAll('.cell'));
const par = document.querySelector('#p');
const start = document.querySelector('.start');
const input1 = document.querySelector('[name="player1"]');
const input2 = document.querySelector('[name="player2"]');
const container = document.querySelector('#container');
const body = document.querySelector('body');
const Gameboard = (() => {
    let board = ['','','','','','','','',''];
    const getBoard = () => board;
    const update = (cell, marker) => {
        board[cell] = marker;
    };
    const clear = () => board = ['','','','','','','','',''];
    const checkForWin = (marker) => {
        if(board[0] === board[1] && board[1] === board[2] && board[2] === marker) return true;
        else if(board[3] === board[4] && board[4] === board[5] && board[3] === marker) return true;
        else if(board[6] === board[7] && board[7] === board[8] && board[6] === marker) return true;
        else if(board[0] === board[3] && board[3] === board[6] && board[0] === marker) return true;
        else if(board[1] === board[4] && board[4] === board[7] && board[1] === marker) return true;
        else if(board[2] === board[5] && board[5] === board[8] && board[2] === marker) return true;
        else if(board[0] === board[4] && board[4] === board[8] && board[0] === marker) return true;
        else if(board[2] === board[4] && board[4] === board[6] && board[2] === marker) return true;
        else return false;
    }
    const checkForDraw = () =>  !board.some(cell => cell == '');
    const display = () => {
        for(let i = 0; i < 9; i++) {
            cells[i].textContent = board[i];
        }
    }
    return {getBoard, update, clear, checkForWin, display, checkForDraw};
})();

const player = (name, marker) => {
    return {name, marker};
}
function cellClicked() {
    const pos = parseInt(this.dataset.position);
    Gameboard.update(pos, game.players[game.currentPlayer].marker);
    Gameboard.display();
    if(Gameboard.checkForWin(game.players[game.currentPlayer].marker))  handleWin();
    else if(Gameboard.checkForDraw()) handleDraw();
    game.currentPlayer = (game.currentPlayer === 0) ? 1 : 0;
    this.removeEventListener('click', cellClicked);
}
function handleWin() {
    cells.forEach(cell => cell.removeEventListener('click', cellClicked));
    par.textContent = `You won ${game.players[game.currentPlayer].name}`;
    body.style.backgroundColor = '#040e42';
}
function handleDraw() {
    par.textContent =  `It's a tie`;
    body.style.backgroundColor = 'orange';
}
const setUp = (player1, player2) => {
    game.players = [];
    game.players.push(player1, player2);
};
function startGame() {
    const player1 = player(input1.value, 'X');
    const player2 = player(input2.value, 'O');
    game.setUp(player1, player2);
    this.textContent = 'Restart';
    game.currentPlayer = 0;
    game.play();
    body.style.backgroundColor = '#181a1b';
}
const game = (() => {
    let players = [];
    let currentPlayer = 0;
    const play = () => {
        cells.forEach(cell => cell.addEventListener('click', cellClicked));
        Gameboard.clear();
        Gameboard.display();
        par.textContent = '';
    }
    return {setUp, play, currentPlayer, players};
})()
start.addEventListener('click', startGame);
