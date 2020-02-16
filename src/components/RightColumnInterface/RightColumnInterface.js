import React, { PureComponent } from 'react';
import './RightColumnInterface.css';

class RightColumnInterface extends PureComponent {

    /**
     *
     * @param props
     */
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

    /**
     * Check current game focus and focus on chat if available
     * @param prevProps
     * @param prevState
     * @param snapshot
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.focus == 'chat' && this.chatInput) {
            this.chatInput.focus();
        }
    }

    /**
     * Return Backend Server Instance
     * @returns {Backend}
     */
    getBackend() {
        return window.Backend;
    }

    /**
     *
     * @param event
     */
    handleChatInput(event) {
        this.setState({ chatInput: event.target.value });
    }

    /**
     *
     * @param event
     */
    handleSubmit(event) {
        const { chatInput } = this.state;
        let { chatMessages } = this.state;
        if (chatInput) {
            this.getBackend().sendData(
                { m: chatInput }
            );
            chatMessages.push({ date: Date.now(), message: chatInput });
            this.setState({ chatMessages: chatMessages, chatInput: '' });
        }
        event.preventDefault();
        this.props.focusOnGame();
    }

    /**
     *
     * @returns {*}
     */
    renderChatMessages() {
        return this.state.chatMessages.map(function (data) {
            return <div class="chatMessage">[{data.date}] {data.message}</div>
        });
    }

    /**
     *
     * @returns {*}
     */
    render() {
        return (
            <div id="RightColumnInterface">
                <div id="debugDiv"/>
                <div id="chatText">{this.renderChatMessages()}</div>
                <form onSubmit={this.handleSubmit}>
                    {this.props.focus == 'chat' ?
                        <input
                            type="text"
                            value={this.state.chatInput}
                            autoComplete={false}
                            onChange={this.handleChatInput}
                            ref={(input) => {
                                this.chatInput = input;
                            }}/>
                        : ''}
                </form>
            </div>
        )
    }
}

export default RightColumnInterface;
