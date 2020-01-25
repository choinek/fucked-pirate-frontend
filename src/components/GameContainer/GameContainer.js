import React, { Component } from 'react';
import { createGame } from "../../game/game";
import BottomInterface from "../BottomInterface";

class GameContainer extends Component {

    componentDidMount() {
        console.log('tworzymy gre!');
        window.Game = createGame();
    }

    render() {
        return (
            <>
                <div id="gameContainer"/>
                <BottomInterface />
            </>
        )
    }
}

export default GameContainer;
