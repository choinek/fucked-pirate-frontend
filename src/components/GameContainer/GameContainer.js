import React, { Component } from 'react';
import { createGame } from "../../game/game";
import BottomInterface from "../BottomInterface";
import DeveloperInterface from "../DeveloperInterface";

class GameContainer extends Component {

    state = {
        currentHandyInventoryItem: 0,
        handyInventory: [
            {
                itemId: 0,
                background: false,
                selected: false
            },
            {
                itemId: 0,
                background: false,
                selected: false
            },
            {
                itemId: 0,
                background: false,
                selected: false
            },
            {
                itemId: 0,
                background: false,
                selected: false
            },
            {
                itemId: 0,
                background: false,
                selected: false
            },
            {
                itemId: 0,
                background: false,
                selected: false
            },
            {
                itemId: 0,
                background: false,
                selected: false
            },
            {
                itemId: 0,
                background: false,
                selected: false
            },
            {
                itemId: 0,
                background: false,
                selected: false
            },
            {
                itemId: 0,
                background: false,
                selected: false
            }
        ]
    };

    handleKeyDown = (event) => {
        if (event.keyCode == 48) {
            this.setCurrentHandyInventoryItem(9);
        } else if (event.keyCode > 48 && event.keyCode <= 57) {
            this.setCurrentHandyInventoryItem(event.keyCode - 49);
        }
    };

    componentDidMount() {
        console.log('tworzymy gre!');
        window.Game = createGame();
        document.addEventListener("keydown", this.handleKeyDown);
    }

    render() {
        let handyInventory = JSON.parse(JSON.stringify(this.state.handyInventory));
        handyInventory[this.state.currentHandyInventoryItem].selected = true;

        return (
            <>
                <DeveloperInterface player={this.props.player}/>
                <div id="gameContainer"/>
                <BottomInterface handyInventory={handyInventory}/>
            </>
        )
    }

    setCurrentHandyInventoryItem(i) {
        this.state.handyInventory.forEach(function (element, j) {
            if (j == i) {
                element.selected = true;
            } else {
                element.selected = false;
            }
        });
        this.setState({ currentHandyInventoryItem: i });
    }
}

export default GameContainer;
