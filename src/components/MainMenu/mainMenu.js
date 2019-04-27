import React, { Component } from 'react';
import { getGame } from '../../game/game';

class MainMenu extends Component {
    render() {

        console.log('game volume', getGame());

        return (
            <div id="main_menu"/>
        )
    }
}

export default MainMenu;
