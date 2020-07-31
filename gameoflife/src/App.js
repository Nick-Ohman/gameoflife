import React from 'react'
import Game from './components/Game'
import Rules from './components/Rules'
import About from './components/About'



function App() {
    return(
        <>
        <h1>Game of Life</h1>
        
        <Game />
        <Rules />
        <About />
        
        </>
    )
}

export default App;