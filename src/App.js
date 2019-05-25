import React from 'react';
import './App.css';
import GameContainer from "./components/GameContainer";
import MainMenu from "./components/MainMenu";
import { createGame } from "./game/game";

class App extends React.Component {
    constructor(props) {
        super(props);
        window.Game = createGame();
    }

    render() {
        return (
            <div className="App">
                <MainMenu/>
                <GameContainer/>
            </div>
        );
    }
}

export default App;
