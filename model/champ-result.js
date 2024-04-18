export default class ChampionshipResult {

    constructor(participant) {
        this.participant = participant;
        this.render = `<th scope="row">${participant}</th>`;
        this.points = 0;
        this.type = null;
    }

}