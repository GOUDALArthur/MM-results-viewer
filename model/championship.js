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
        // if (render.substring(0,4) === '<tr>') {
        //     let rowspan = parseInt(result.render.match(/rowspan="(\d+)"/)[1]);
        //     rowspan++;
        //     result.render = result.render.replace(/rowspan="\d+"/, `rowspan="${rowspan}"`);
        // }
    }

    insertTeam(name, team) {
        const result = this.getResult(name);
        result.team = team;
        team = team.toLowerCase().replace(/ /g, '-');
        result.render = result.render.replace(`"row"`, `"row" class="${team}"`);
    }

    isDriver(name) {
        return this.getResult(name).team !== name;
    }

    isTeam(name) {
        return this.getResult(name).team === name;
    }

    sortResults() {
        this.results.sort((a, b) => {
            if (this.isDriver(a.participant) && this.isTeam(b.participant)) return -1;
            if (this.isTeam(a.participant) && this.isDriver(b.participant)) return 1;
            if (a.points === b.points) {
                const aRes = a.render.match(/\d+/g).slice(1);
                const bRes = b.render.match(/\d+/g).slice(1);
                aRes.sort((a, b) => a - b);
                bRes.sort((a, b) => a - b);
                for (let i = 0; i < aRes.length; i++) {
                    if (aRes[i] === bRes[i]) continue;
                    return aRes[i] - bRes[i];
                }
            }
            return b.points - a.points;
        })
    }

}