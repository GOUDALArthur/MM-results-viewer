import ChampionshipResult from '../model/championship.js';

export default class ChampionshipViewModel {

    constructor() {
        this.championship = new ChampionshipResult();
    }

    getResults() {
        return this.championship.results;
    }

    getResult(name) {
        return this.championship.getResult(name);
    }

    addParticipant(participant) {
        this.championship.addParticipant(participant);
    }

    addPoints(name, points) {
        this.championship.addPoints(name, points);
    }

    addRender(name, render) {
        this.championship.addRender(name, render);
    }

}