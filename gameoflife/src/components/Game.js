import React, { useState, useCallback, useRef } from "react";
import produce from 'immer'


let generation = 0;
const numRows = 25;
const numCols = 25;

const operations = [[0, 1], [0, -1], [1, -1], [-1, 1], [1, 1], [-1, -1], [1, 0], [-1, 0]];


const createGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
        generation = 0
        rows.push(Array.from(Array(numCols), () => 0))
    }
    return rows;
};


const Game = () => {
    const [grid, setGrid] = useState(() => {
        return createGrid();
    });

    const [cellColor, setCellColor] = useState('black')

    const [running, setRunning] = useState(false);
    const runningRef = useRef(running);
    runningRef.current = running

    const [gameSpeed, setGameSpeed] = useState(250)
    const speedRef = useRef(gameSpeed)
    speedRef.current = gameSpeed



    


    const play = useCallback(() => {
        if (!runningRef.current) {
            return;
        }
        setGrid((grid) => {
            return produce(grid, gridCopy => {
                generation += 1
                for (let i = 0; i < numRows; i++) {
                    for (let k = 0; k < numCols; k++) {
                        let neighbors = 0;
                        operations.forEach(([x, y]) => {
                            const newI = i + x;
                            const newK = k + y;
                            if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                                neighbors += grid[newI][newK];
                            }
                        })

                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][k] = 0;
                        } else if (grid[i][k] === 0 & neighbors === 3) {
                            gridCopy[i][k] = 1;
                        }

                    }
                }
            })
        })

        setTimeout(play, speedRef.current);
    }, [])
    // play()
    const start = () => { setRunning(true); runningRef.current = true; play() }
    // Random button
    const randomize = () => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            generation = 0
            rows.push(Array.from(Array(numCols), () => (Math.random() > .7 ? 1 : 0)))
        }
        setGrid(rows)
    }
    // stop game 
    const stop = () => { setRunning(false); runningRef.current = false; }

    const reset = () => {
        setGrid(() => {
            const rows = []
            for (let i = 0; i< numRows; i++){
                
                generation = 0;
                
                rows.push(Array.from(Array(numCols), () => 0))
            }
            return rows;
            
            })
    }

    return (
        <>
        <header>
            
            <div className = 'game'>
                <h3>Play The Game!</h3>
                <div className='gamebuttons'>
                
                <button onClick={() => start()}>Start</button>
                <button onClick={() => stop()}>Stop</button>
                <button onClick={() => randomize()}>Random</button>
                <button onClick={() => reset()}>Clear</button>
                
                
                </div>
            </div>
         </header>
            


            <div className="board" style={{ display: "grid", gridTemplateColumns: `repeat(${numCols}, 20px)` }}>
                {grid.map((rows, i) =>
                    rows.map((col, k) => (
                        <div
                            key={`${i}-${k}`}
                            
                            onClick={() => {
                                /// lets you not click while running
                                if(running !== true){
                                const newGrid = produce(grid, gridCopy => {
                                    gridCopy[i][k] = grid[i][k] ? 0 : 1;
                                })
                                setGrid(newGrid)}
                            }}
                            style={{
                                width: 20,
                                height: 20,
                                backgroundColor: grid[i][k] ? `${cellColor}` : undefined,
                                border: "solid 1px black"
                            }}
                        />
                    ))
                )}

            </div>
            <div className="gamespeed">
                <h3>Change Game Speed</h3>
                <button onClick={() => (setGameSpeed(2500))}>2500ms</button>
                <button onClick={() => (setGameSpeed(1500))}>1500ms</button>
                <button onClick={() => (setGameSpeed(750))}>750ms</button>
            </div>

            <div className="gamecolor">
                <h3>Change Game Color</h3>
                <button onClick={() => (setCellColor('black'))}>Black</button>
                <button onClick={() => (setCellColor('blue'))}>Blue</button>
                <button onClick={() => (setCellColor('red'))}>Red</button>
                <button onClick={() => (setCellColor('yellow'))}>Yellow</button>
            </div>
            <div className="generations">
                <h3>Generations:{generation}</h3>
            </div>

        </>
    )
}


export default Game;