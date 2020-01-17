import React, { Component } from 'react';
import { createGame } from "../../game/game";

class GameContainer extends Component {

    componentDidMount() {
        console.log('tworzymy gre!');
        window.Game = createGame();
    }

    render() {
        return (
            <div id="gameContainer"/>
        )
    }
}

export default GameContainer;
