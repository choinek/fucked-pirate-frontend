import React, { Component } from 'react';
import { createGame } from '../../game/game';

class GameContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        createGame();
    }

    render() {
        return (
            <div id="game" />
        )
    }
}

export default GameContainer;
