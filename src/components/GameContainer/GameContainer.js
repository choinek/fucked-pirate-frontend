import React, { Component } from 'react';
import { createGame } from "../../game/game";
import BottomInterface from "../BottomInterface";

class GameContainer extends Component {

    handleKeyDown = (event) => {
        console.log(event.keyCode);
    }


    componentDidMount() {
        console.log('tworzymy gre!');
        window.Game = createGame();
        document.addEventListener("keydown", this.handleKeyDown);
    }

    render() {
        return (
            <>
                <div id="gameContainer"/>
                <BottomInterface/>
            </>
        )
    }
}

export default GameContainer;
