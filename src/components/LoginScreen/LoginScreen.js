import React, { Component } from 'react';
import Background from './assets/background.png';
import Login from './assets/login.png';
import './LoginScreen.css';

class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { login: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ login: e.target.value });
    }

    handleSubmit(e) {
        const { loginPlayerHandler } = this.props;
        const { login } = this.state;
        if (login.length > 3) {
            alert('Zalogowales sie jako ' + this.state.login);
            loginPlayerHandler(this.state.login);
        } else {
            alert('Dlugosc wieksza niz 3 znaki ziom');
        }
    }

    render() {

        return (
            <div id="LoginScreen" style={{
                backgroundImage: `url(${Background})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                height: '100%'
            }}>
                <div className="header">
                    Fucked Pirate
                </div>
                <div className="subheader">
                    Vol1: IS FUCKED
                </div>
                <br/>
                <br/>
                <div className="loginBox">
                    <input type="text" placeholder="Login" onChange={this.handleChange}/>
                    <br/>
                    <img src={Login} width="300" onClick={this.handleSubmit}/>
                </div>
            </div>
        )
    }
}

export default LoginScreen;
