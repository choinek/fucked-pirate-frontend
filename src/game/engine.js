import {createPlayer} from "./objects/player";

const config = {

}

class Engine {

    currentPlayer;


    constructor(config) {

    }

    login(login) {
        this.currentPlayer = createPlayer(login);
    }
}

export function createEngine() {
    return new Engine(config);
}
