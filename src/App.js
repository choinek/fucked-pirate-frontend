import React from 'react';
import './App.css';
import GameContainer from "./components/GameContainer";
import MainMenu from "./components/MainMenu";

function App() {
    return (
        <div className="App">
            <MainMenu/>
            <GameContainer/>
        </div>
    );
}

export default App;
