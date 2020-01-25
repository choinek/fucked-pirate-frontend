class Backend {

    ws = new WebSocket('wss://dev.fuckedpirate.sex.pl/');

    constructor(handleMessageFunction, backendLogFunction) {
        this.ws.onopen = () => {
            backendLogFunction('Connected to server');
        }

        this.ws.onmessage = event => {
            const jsonData = JSON.parse(event.data);
            if (jsonData) {
                handleMessageFunction(jsonData);
            }
        }

        this.ws.onclose = () => {
            backendLogFunction('Disconnected from server');
        }
    }

    sendData = data => {
        try {
            this.ws.send(JSON.stringify(data));
        } catch (error) {
            console.log(error) // catch error
        }
    }
}

export default Backend;
