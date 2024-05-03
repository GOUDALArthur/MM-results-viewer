export default class ChampionshipResult {

    constructor(participant) {
        this.participant = participant;
        this.team = null;
        this.render = `<th scope="row" rowspan="1"><a href=#/drivers/${participant.replace(' ', '%20')}>${participant}</a></th>`;
        this.points = 0;
    }

}