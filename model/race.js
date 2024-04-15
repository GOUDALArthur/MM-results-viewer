import Result from "./result.js";

export default class Race {

    constructor(gp, date, track, layout) {
        this.gp = gp;
        this.date = date;
        this.track = track;
        this.layout = layout;
        this.results = {};
        this.results['race'] = {};
        this.results['qualifying'] = {};
    }

    getRaceResults() {
        return this.results['race'];
    }

    getQualifyingResults() {
        return this.results['qualifying'];
    }

    getRaceResult(driver) {
        return Object.values(this.results['race']).find(result => result.driver === driver) || null;
    }

    addResult(position, driver, team, points, time, session) {
        this.results[session][position] = new Result(position, driver, team, points, time);
    }

}