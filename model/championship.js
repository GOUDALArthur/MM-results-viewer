import ChampionshipResult from "./champ-result.js";

export default class Championship {

    constructor() {
        this.results = [];
    }

    getResult(participant) {
        return this.results.find(result => result.participant === participant) || null;
    }

    addParticipant(participant) {
        this.results.push(new ChampionshipResult(participant));
    }

    addPoints(name, points) {
        if (typeof points === 'string') points = parseInt(points);
        const result = this.getResult(name);
        result.points += points;
    }

    addRender(name, render) {
        const result = this.getResult(name);
        result.render += render;
    }

    insertTeam(name, team) {
        team = team.toLowerCase().replace(/ /g, '-');
        const result = this.getResult(name);
        result.render = result.render.replace(`"row">`, `"row" class="${team}">`);
        if (team === result.participant) {
            result.type = 'team';
        } else {
            result.type = 'driver';
        }
    }

    isDriver(name) {
        return this.getResult(name).type === 'driver';
    }

}