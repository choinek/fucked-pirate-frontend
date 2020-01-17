import React from 'react';
import './App.css';
import GameContainer from "./components/GameContainer";
import MainMenu from "./components/MainMenu";
import LoginScreen from "./components/LoginScreen";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerLoggedIn: false,
            playerLogin: '',
            players: new Map()
        };
    }

    loginPlayerHandler(login) {
        this.setState({
            playerLoggedIn: true,
            playerLogin: login
        })
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ 'asd': '1' });
        }, 1000);
        window.App = this;
    }

    componentDidUpdate() {
        // setTimeout(() => {
        //     this.setState({ 'asd': 1 });
        // }, 1000);
    }

    render() {
        return (
            <div className="App">
                <MainMenu/>
                {this.state.playerLoggedIn ?
                    <GameContainer/>
                    :
                    <LoginScreen loginPlayerHandler={login => {
                        this.loginPlayerHandler(login)
                    }}/>
                }
            </div>
        );
    }
}

export default App;
