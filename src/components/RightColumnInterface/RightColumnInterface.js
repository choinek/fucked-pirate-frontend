import React, { PureComponent } from 'react';
import './RightColumnInterface.css';

class RightColumnInterface extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            chatInput: '',
            chatMessages: [
                {
                    date: Date.now(),
                    message: 'First Chat Message On Top'
                }
            ]
        };
        this.handleChatInput = this.handleChatInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.focus == 'chat') {
            this.chatInput.focus();
        }
    }

    handleChatInput(event) {
        this.setState({ chatInput: event.target.value });
    }

    handleSubmit(event) {
        let { chatMessages } = this.state;
        chatMessages.push({ date: Date.now(), message: this.state.chatInput });
        this.setState({ chatMessages: chatMessages, chatInput: '' });
        event.preventDefault();
        this.props.focusOnGame();
    }

    renderChatMessages() {
        return this.state.chatMessages.map(function (data) {
            return <div class="chatMessage">[{data.date}] {data.message}</div>
        });
    }

    render() {
        return (
            <div id="RightColumnInterface">
                <div id="debugDiv"/>
                <div id="chatText">{this.renderChatMessages()}</div>
                <form onSubmit={this.handleSubmit}>
                    <input id="chatInput"
                           type="text"
                           value={this.state.chatInput}
                           onChange={this.handleChatInput}
                           disabled={!(this.props.focus == 'chat')}
                           ref={(input) => { this.chatInput = input; }} />
                </form>
            </div>
        )
    }
}

export default RightColumnInterface;
