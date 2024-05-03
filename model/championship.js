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
    }

    convertRenderToEndurance(teamName) {
        const result = this.getResult(teamName);
        let lines = result.render.split('</tr>');
        result.render = lines[0] + '</tr>' + lines[lines.length - 2] + '</tr>';
        const drivers = this.results.filter(result => result.team === teamName);
        result.points = drivers[0].points + drivers[5].points;
    }

    insertClass(name, team, details = null) {
        const result = this.getResult(name);
        result.team = team;
        let renderClass = team.toLowerCase().replace(/ /g, '-');
        if (details && details.includes('R')) renderClass += ' rookie';
        if (details && details.includes('C')) renderClass += ' champion';
        if (details && details.includes('T')) renderClass += ' title-holder';
        result.render = result.render.replace(`"row"`, `"row" class="${renderClass}"`);
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