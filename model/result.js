export default class Result {

    constructor(position, driver, team, points, details) {
        this.position = position;
        this.driver = driver;
        this.team = team;
        this.points = points;
        if (typeof details === 'string') details = details.replace(/\s/g, "").split(',');
        this.details = details;
    }

}