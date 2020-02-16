import React from 'react';
import './App.css';
import GameContainer from "./components/GameContainer";
import MainMenu from "./components/MainMenu";
import LoginScreen from "./components/LoginScreen";
import Backend from "./server/Backend";

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            player: {
                loggedIn: false,
                login: '',
                server: {
                    w: '',
                    x: 0,
                    y: 0
                }
            },
            players: [],
            focus: 'game'
        };
    }

    loginPlayerHandler = (login) => {
        this.getBackend().sendData(
            { l: login }
        );
        this.setState({
            player: {
                loggedIn: true,
                login: login,
                server: {
                    w: '',
                    x: 0,
                    y: 0
                }
            }
        })
    };

    updatePlayerHandler(playerData) {
        this.setState({ player: playerData });
        this.getBackend().sendData(this.state.player.server);
    }

    focusOnChat() {
        console.log('focus on chat!');
        this.setState({ 'focus': 'chat' });
    }

    focusOnGame() {
        console.log('focus on game!');
        this.setState({ 'focus': 'game' });
    }

    /**
     * @returns {Backend}
     */
    getBackend() {
        return window.Backend;
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ 'asd': '1' });
        }, 1000);
        window.App = this;
        window.Backend = new Backend((data) => this.backendHandleData(data), (data) => this.backendLog(data));
    }

    componentDidUpdate() {
        // setTimeout(() => {
        //     this.setState({ 'asd': 1 });
        // }, 1000);
    }

    backendHandleData(data) {
        if (data.players !== undefined) {
            this.setState({ players: data.players });
        }
    }

    backendLog(message) {
        console.log('backendLog');
        console.log(message);
    }

    render() {
        return (
            <div className="App">
                {this.state.player.loggedIn ?
                    <GameContainer player={this.state.player} focus={this.state.focus}
                                   focusOnGame={() => this.focusOnGame()}/>
                    :
                    <LoginScreen loginPlayerHandler={this.loginPlayerHandler}/>
                }
            </div>
        );
    }
}

export default App;
