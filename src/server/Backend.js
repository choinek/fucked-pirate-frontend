/**
 * @todo fix backend recovering - sendData should wait until websocket connect
 */

class Backend {

    /**
     * Websocket placeholder
     * @type {null|WebSocket}
     */
    ws = null;

    /**
     *
     * @type {function}
     */
    handleMessageFunction = null;

    /**
     *
     * @type {function}
     */
    backendLogFunction = null;

    /**
     *
     */
    connectWebsocket() {

        this.ws = new WebSocket('wss://dev.fuckedpirate.sex.pl/');

        this.ws.onopen = () => {
            this.backendLogFunction('Connected to server');
        }

        this.ws.onmessage = event => {
            const jsonData = JSON.parse(event.data);
            if (jsonData) {
                this.handleMessageFunction(jsonData);
            }
        }

        this.ws.onclose = () => {
            this.backendLogFunction('Disconnected from server');
            this.ws = null;
        }
    }

    /**
     *
     * @param handleMessageFunction
     * @param backendLogFunction
     */
    constructor(handleMessageFunction, backendLogFunction) {
        if (!handleMessageFunction || !backendLogFunction) {
            throw "Backend Constructor Error - one of required function is not provided.";
        }

        this.handleMessageFunction = handleMessageFunction;
        this.backendLogFunction = backendLogFunction;

        this.connectWebsocket();
    }


    /**
     * Send data to websocket
     * @param data
     */
    sendData = data => {
        if (!this.ws) {
            this.connectWebsocket();
        }
        try {
            this.ws.send(JSON.stringify(data));
        } catch (error) {
            console.log(error) // catch error
        }
    }
}

export default Backend;
