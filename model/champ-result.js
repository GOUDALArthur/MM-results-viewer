export default class ChampionshipResult {

    constructor(participant) {
        this.participant = participant;
        this.render = `<th scope="row">${participant}</th>`;
        this.points = 0;
    }

    insertTeam(team) {
        team = team.toLowerCase().replace(' ', '-');
        console.log('Before replace:', this.render);
        this.render = this.render.replace(`"row">`, `"row" class="${team}">`);
        console.log('After replace:', this.render);
    }

}