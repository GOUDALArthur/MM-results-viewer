import Race from "./race.js";

export default class Season {

    constructor(year, series) {
        this.year = year;
        this.series = series;
        this.races = {};
    }

    addRace(gp, date, track, layout) {
        this.races[date] = new Race(gp, date, track, layout);
    }

    hasDriver(name) {
        Object.values(this.races).forEach(race => {
            if (race.hasDriver(name)) return true;
        });
        return false;
    }

    isEndurance() {
        return this.series.includes('WEC');
    }

}