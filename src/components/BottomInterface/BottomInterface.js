import React, { PureComponent } from 'react';
import './BottomInterface.css';

const PANEL_COUNT = 10;

class BottomInterface extends PureComponent {

    preparePanels() {
        const { handyInventory } = this.props;
        let render;
        return handyInventory.map(function (element, i) {
            return <div className="inventoryPanel" key={i} style={{
                left: 17 + (i * 65),
                background: element.selected ? '#fff' : false
            }}>
                <div style={{
                    background: element.background,
                }}/>
            </div>
        });
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
