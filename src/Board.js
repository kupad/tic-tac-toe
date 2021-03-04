import cs from 'classnames';
import styles from './App.module.css';

function Board({board, onClick}) {
    return (
        <div className={styles.board}>
        {
            board.map((row,r) =>
                row.map((cellVal,c) => (
                    <Cell
                        key={`r${r}c${c}`}
                        row={r}
                        col={c}
                        value={cellVal}
                        onClick={onClick}
                    />
                ))
            )
        }
        </div>
    )
}

function Cell({row,col,value,onClick}) {
    return (
        <div
            onClick={()=>onClick(row,col)}
            className={cs({
                [styles.leftBorder]:   col > 0,
                [styles.bottomBorder]: row < 2
            })}
        >
            {value}
        </div>
    );
}

export default Board;
