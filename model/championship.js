import ChampionshipResult from "./champ-result.js";

export default class Championship {

    constructor() {
        this.results = [];
    }

    getResult(participant) {
        return this.results.find(result => result.participant === participant);
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

}