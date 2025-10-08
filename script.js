// --- GAME STATE VARIABLES ---
let board = Array(9).fill(null);
let humanPlayer = 'X';
let aiPlayer = 'O';
let currentPlayer = humanPlayer;
let gameOver = false;

// --- DOM ELEMENTS ---
const boardContainer = document.querySelector('.game-board-container');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

// --- WINNING COMBINATIONS (Indices 0-8) ---
const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// --- CORE GAME FUNCTIONS ---

/**
 * Renders the game board based on the current 'board' array state.
 */
function renderBoard() {
    boardContainer.innerHTML = '';
    board.forEach((cellValue, index) => {
        const cell = document.createElement('div');
        cell.className = `grid-cell ${cellValue ? 'cursor-default' : ''} ${cellValue === 'X' ? 'player-x' : cellValue === 'O' ? 'player-o' : 'bg-gray-700'}`;
        cell.dataset.index = index;
        cell.dataset.value = cellValue; // Used to prevent clicking filled cells
        cell.textContent = cellValue || '';

        if (!cellValue && !gameOver) {
            cell.addEventListener('click', handleCellClick);
        }
        boardContainer.appendChild(cell);
    });
}

/**
 * Handles the user clicking a cell.
 */
function handleCellClick(event) {
    const index = parseInt(event.target.dataset.index);

    if (board[index] === null && !gameOver && currentPlayer === humanPlayer) {
        // 1. Process Human Move
        makeMove(index, humanPlayer);

        // 2. Check for game end
        if (checkGameEnd()) return;

        // 3. AI's turn
        currentPlayer = aiPlayer;
        updateStatus();
        // Delay AI move slightly for better user experience
        setTimeout(aiTurn, 500);
    }
}

/**
 * Executes a move and updates the board array.
 */
function makeMove(index, player) {
    board[index] = player;
    renderBoard();
}

/**
 * Checks if the game has ended (Win or Draw).
 * @returns {boolean} True if the game is over.
 */
function checkGameEnd() {
    const result = getWinner(board);

    if (result) {
        gameOver = true;
        if (result === 'Draw') {
            statusElement.innerHTML = '<span class="text-yellow-400">It\'s a Draw!</span>';
        } else {
            const winnerClass = result === humanPlayer ? 'player-x' : 'player-o';
            statusElement.innerHTML = `Winner: <span class="${winnerClass}">${result}</span>`;
        }
        return true;
    }
    return false;
}

/**
 * Checks the board for a winner or a draw.
 * @returns {'X' | 'O' | 'Draw' | null} The winner, 'Draw', or null if game continues.
 */
function getWinner(currentBoard) {
    // Check for a win
    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
            return currentBoard[a];
        }
    }
    // Check for a draw (no winner, but no empty spots)
    if (currentBoard.every(cell => cell !== null)) {
        return 'Draw';
    }
    return null; // Game continues
}

/**
 * Updates the text showing whose turn it is.
 */
function updateStatus() {
    if (!gameOver) {
        const playerText = currentPlayer === humanPlayer 
            ? `<span class="player-x">X</span>` 
            : `<span class="player-o">O</span>`;
        statusElement.innerHTML = `Current Player: ${playerText}`;
    }
}

// --- MINIMAX AI LOGIC ---

/**
 * Main function for the AI turn.
 */
function aiTurn() {
    // Check if the game is already over
    if (gameOver) return;

    // Find the best move index using the Minimax algorithm
    const bestMoveIndex = findBestMove(board);

    // Execute the AI move
    if (bestMoveIndex !== -1) {
        makeMove(bestMoveIndex, aiPlayer);
        if (!checkGameEnd()) {
            // Switch back to human player if game is not over
            currentPlayer = humanPlayer;
            updateStatus();
        }
    }
}

/**
 * Wrapper function to initialize Minimax and return the best move index.
 * @param {Array<string | null>} currentBoard - The current state of the game board.
 * @returns {number} The index (0-8) of the optimal move.
 */
function findBestMove(currentBoard) {
    let bestScore = -Infinity;
    let move = -1;

    // Loop through all empty spots
    const availableSpots = currentBoard
        .map((val, index) => (val === null ? index : null))
        .filter(val => val !== null);

    // Edge case: If the board is full, return -1 (shouldn't happen here, but good practice)
    if (availableSpots.length === 0) return -1;
    
    // If it's the first move, pick a corner or the center for speed, or just let minimax run
    // We let minimax run for guaranteed optimal play.

    for (const index of availableSpots) {
        // 1. Try the move
        currentBoard[index] = aiPlayer;
        
        // 2. Call minimax (the maximizing player is the AI)
        // We call for the minimizing player (Human) next, and depth 0
        let score = minimax(currentBoard, 0, false); 
        
        // 3. Undo the move (backtrack)
        currentBoard[index] = null; 

        // 4. Update the best score and move
        if (score > bestScore) {
            bestScore = score;
            move = index;
        }
    }
    return move;
}

/**
 * The Minimax recursive algorithm.
 * @param {Array<string | null>} board - The current board state.
 * @param {number} depth - The depth of the search tree (not critical for TTT, but required for general Minimax).
 * @param {boolean} isMaximizing - True if we are looking for the maximum score (AI), false for minimum (Human).
 * @returns {number} The score (+10, 0, or -10) of the current position.
 */
function minimax(board, depth, isMaximizing) {
    const result = getWinner(board);

    // Base Case: If the game has ended, return the score
    if (result !== null) {
        if (result === aiPlayer) return 10;
        if (result === humanPlayer) return -10;
        if (result === 'Draw') return 0;
    }

    // Recursive Step:
    const availableSpots = board
        .map((val, index) => (val === null ? index : null))
        .filter(val => val !== null);

    if (isMaximizing) {
        // AI (Maximizer)
        let bestScore = -Infinity;
        for (const index of availableSpots) {
            board[index] = aiPlayer;
            // Recurse for the minimizing player (Human)
            let score = minimax(board, depth + 1, false);
            board[index] = null; // Undo the move
            bestScore = Math.max(bestScore, score);
        }
        return bestScore;
    } else {
        // Human (Minimizer)
        let bestScore = Infinity;
        for (const index of availableSpots) {
            board[index] = humanPlayer;
            // Recurse for the maximizing player (AI)
            let score = minimax(board, depth + 1, true);
            board[index] = null; // Undo the move
            bestScore = Math.min(bestScore, score);
        }
        return bestScore;
    }
}

/**
 * Resets the entire game state.
 */
function resetGame() {
    board = Array(9).fill(null);
    gameOver = false;
    currentPlayer = humanPlayer;
    renderBoard();
    updateStatus();
}

// --- INITIALIZATION ---
resetButton.addEventListener('click', resetGame);

// Start the game on load
window.onload = resetGame;
