import Result from "./result.js";

export default class Race {

    constructor(gp, date, track, layout) {
        this.gp = gp;
        this.date = date;
        this.track = track;
        this.layout = layout;
        this.results = {};
    }

    getResults() {
        return this.results;
    }

    getResult(driver) {
        return Object.values(this.results).find(result => result.driver === driver) || null;
    }

    addResult(position, driver, team, points, time) {
        this.results[position] = new Result(position, driver, team, points, time);
    }

}