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

    addResult(position, driver, team, points, time, isEndurance = false) {
        let index = position;
        if (isEndurance && this.results[index] !== undefined) index = Object.keys(this.results).length + 1;
        this.results[index] = new Result(position, driver, team, points, time);
    }

    hasDriver(name) {
        Object.values(this.results).forEach(result => {
            if (result.driver === name) return true;
        });
        return false;
    }

    isDriverAtPosition(position) {
        return this.results[position] !== undefined;
    }

}