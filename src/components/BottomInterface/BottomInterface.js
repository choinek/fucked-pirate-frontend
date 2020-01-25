import React, { Component } from 'react';
import './BottomInterface.css';

const PANEL_COUNT = 8;

class BottomInterface extends Component {

    preparePanels() {
        for (let i = 0; i < PANEL_COUNT; i++) {
            return <div className="panel">

            </div>
        }
    }

    render() {

        return (
            <div id="BottomInterface">
                {this.preparePanels()}
            </div>
        )
    }
}

export default BottomInterface;
