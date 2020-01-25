import React, { PureComponent } from 'react';
import './DeveloperInterface.css';

class DeveloperInterface extends PureComponent {

    render() {
        return (
            <div id="DeveloperInterface">
                Login: {this.props.player.login} | World: {this.props.player.world}
            </div>
        )
    }
}

export default DeveloperInterface;
