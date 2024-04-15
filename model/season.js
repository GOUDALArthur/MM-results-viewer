import Race from "./race.js";

export default class Season {

    constructor(year, category) {
        this.year = year;
        this.category = category;
        this.races = {};
    }

    addRace(gp, date, track, layout) {
        this.races[date] = new Race(gp, date, track, layout);
    }

}