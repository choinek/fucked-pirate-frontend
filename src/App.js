import React from 'react';
import './App.css';
import GameContainer from "./components/GameContainer";
import MainMenu from "./components/MainMenu";
import { createGame } from "./game/game";

class App extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            this.setState({ 'asd': '1' });
        }, 1000);
        window.Game = createGame();
    }

    componentDidUpdate() {
        setTimeout(() => {
            this.setState({ 'asd': 1 });
        }, 1000);
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
