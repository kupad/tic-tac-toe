import React from 'react';

//import styles from './App.module.css';
import Board from './Board.js';

function App() {

    //start state
    const initBoard = (
        [[' ', ' ', ' '],
         [' ', ' ', ' '],
         [' ', ' ', ' ']]);

    const [board, setBoard] = React.useState(initBoard);
    const [currPlayer, setCurrPlayer] = React.useState('X');
    const [winner, setWinner] = React.useState(null);
    const [isDraw, setIsDraw] = React.useState(false);

    const isEmpty = (cell) => cell === ' ';

    const isWin = () => {
        const rowWin = ()=> board.some(row => row.every(cell => cell === row[0] && !isEmpty(cell)));

        const colWin = () => {
            let w = false;
            for(let c=0; c<3; c++) {
                w = !isEmpty(board[0][c]) && board[0][c] === board[1][c] && board[1][c] === board[2][c];
                if(w) break;
            }
            return w;
        }
        const diag1Win = () => !isEmpty(board[0][0]) && board[0][0]===board[1][1] && board[1][1]===board[2][2];
        const diag2Win = () => !isEmpty(board[0][2]) && board[0][2]===board[1][1] && board[1][1]===board[2][0];

        return rowWin() || colWin() || diag1Win() || diag2Win();
    }

    const allFilled = () => board.every(row => row.every(cell => !isEmpty(cell)));

    const handleClick = (row,col) => {
        if(winner) return; //if we're in a win state, clicks are ignored
        if(!isEmpty(board[row][col])) return; //if the cell has a value, ignore click

        const nboard = board.slice();
        nboard[row][col] = currPlayer;
        setBoard(nboard);
        if(isWin()) {
            setWinner(currPlayer);
        } else if (allFilled()) {
            setIsDraw(true);
        } else {
            setCurrPlayer(currPlayer === 'X' ? 'O' : 'X');
        }
    }

    const reset = () => {
        setBoard(initBoard);
        setCurrPlayer('X');
        setWinner(null);
        setIsDraw(false);
    }

    return (
        <>
            <h1>Tic-Tac-Toe</h1>

            <Board
                board={board}
                onClick={handleClick}
            />
            {   winner
                ?   (<>
                        <p>Winner: {winner}</p>
                        <button onClick={reset}>START AGAIN</button>
                    </>)
                : isDraw
                    ? (<>
                        <p>DRAW!</p>
                        <button onClick={reset}>START AGAIN</button>
                        </>)
                    : <p>Current player: <strong>{currPlayer}</strong></p>
            }
        </>
    );
}

export default App;
