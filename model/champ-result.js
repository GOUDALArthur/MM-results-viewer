export default class ChampionshipResult {

    constructor(participant) {
        this.participant = participant;
        this.team = null;
        this.render = `<th scope="row" rowspan="1">${participant}</th>`;
        this.points = 0;
    }

}