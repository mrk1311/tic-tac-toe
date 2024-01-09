const Gameboard = (() => {
    const board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    const getBoard = () => board;

    const mark = function(row, column, marker) {
        board[row][column] = marker;
        const cell = document.getElementById(`${row}${column}`);
        cell.textContent = marker;
    };

    const isMarked = function(row, column) {
        return board[row][column] !== null;
    };

    const isFull = function() {
        return board.every(row => row.every(cell => cell !== null));
    };

    const isWinner = function(marker) {
        const isWinningRow = row => row.every(cell => cell === marker);
        const isWinningColumn = column => board.every(row => row[column] === marker);
        const isWinningDiagonal = () => {
            const leftDiagonal = [board[0][0], board[1][1], board[2][2]];
            const rightDiagonal = [board[0][2], board[1][1], board[2][0]];
            return (
                leftDiagonal.every(cell => cell === marker) ||
                rightDiagonal.every(cell => cell === marker)
            );
        };
        const isWinning = () => {
            for (let i = 0; i < 3; i++) {
                if (isWinningRow(board[i]) || isWinningColumn(i)) {
                    return true;
                }
            }
            return isWinningDiagonal();
        };
        return isWinning();
    };


    const show = function() {
        console.log(board);
    };

    const reset = function() {
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
    };

    return { show, getBoard, mark, isMarked, isFull, isWinner, reset};

})();

function createPlayer(name, marker) {
    // const name = name;
    // const marker = this.marker;
    return { name, marker };
};

const Game = (() => {
    const player2 = createPlayer("Player 2", "O");
    const player1 = createPlayer("Player 1", "X");
    const gameboard = Gameboard.getBoard();
    let currentPlayer = player1;
    const winner = null;

    Gameboard.show()
    
    const start = function() {
        console.log("Game started");
        console.log(`Current player: ${currentPlayer.name}`);
    };

    const switchPlayer = function() {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    const play = function(row, column) {
        if (Gameboard.isWinner(currentPlayer.marker)) {
            console.log(`${currentPlayer.name} won!`);
            return;
        }
        if (Gameboard.isMarked(row, column)) {
            console.log("Cell already marked. Pick another one.");
            return;
        }
        Gameboard.mark(row, column, currentPlayer.marker);
        Gameboard.show();
        if (Gameboard.isWinner(currentPlayer.marker)) {
            console.log(`${currentPlayer.name} won!`);
            return;
        }
        if (Gameboard.isFull()) {
            console.log("It's a tie!");
            return;
        }
        switchPlayer();
        console.log(`Current player: ${currentPlayer.name}`);
    };

    const reset = function() {
        Gameboard.reset();
        console.log("Game reset");
        start();
    };

    return { start, play, reset };
})();

Game.start();
