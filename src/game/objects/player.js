const defaultData = {
    x: 0,
    y: 0,
    name: '',

};

export class Player {

    login = '';
    data = {};

    constructor(login, data) {
        this.login = login;
        this.data = Object.assign({}, defaultData, data);
    }
}

export function createPlayer(login, data) {
    return new Player(login);
}

