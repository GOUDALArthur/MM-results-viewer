import Championship from '../model/championship.js';

export default class ChampionshipViewModel {

    constructor() {
        this.championship = new Championship();
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

    convertRenderToEndurance(teamName) {
        this.championship.convertRenderToEndurance(teamName);
    }

    insertClass(name, team, details = null) {
        this.championship.insertClass(name, team, details);
    }

    isDriver(name) {
        return this.championship.isDriver(name);
    }

    isTeam(name) {
        return this.championship.isTeam(name);
    }

    sortResults() {
        this.championship.sortResults();
    }

}