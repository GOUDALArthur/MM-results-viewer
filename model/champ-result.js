export default class ChampionshipResult {

    constructor(participant) {
        this.participant = participant;
        this.render = `<th scope="row">${participant}</th>`;
        this.points = 0;
    }

    insertTeam(team) {
        this.render = this.render.replace(`"row">`, `"row" class="${team}">`);
    }

}