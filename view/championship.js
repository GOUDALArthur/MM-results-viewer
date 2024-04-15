import ResultsProvider from "../service/results-provider.js";
import utils from "../service/utils.js";
import ChampionshipResultViewModel from "../view-model/championship.js";

export default class Championship {

    async render() {
        const request = utils.parseRequestURL();
        const viewModel = new ChampionshipResultViewModel();
        const season = ResultsProvider.getSeason(request.id, request.id_cat.replace(/%20/g, ' '));
        console.log('Season: ', season);

        let seasonContainer = document.createElement('section');
        seasonContainer.classList.add('championship');
        seasonContainer.innerHTML = `
            <h1>${request.id} ${season.category} Championship</h1>
        `;

        const table = document.createElement('table');
        const header = document.createElement('tr');
        header.innerHTML = `<th>Drivers</th>`;
        const sortedRaces = Object.values(season.races).sort((a, b) => new Date(a.date) - new Date(b.date));
        sortedRaces.forEach(race => {
            header.innerHTML += `<th>${race.gp}</th>`;
            Object.values(race.getRaceResults()).forEach(raceResult => {
                viewModel.getResult(raceResult.driver) || viewModel.addParticipant(raceResult.driver);
                viewModel.addPoints(raceResult.driver, raceResult.points);

                const className = raceResult.position === '1' ? 'winner' :
                                  raceResult.position === '2' ? 'second' :
                                  raceResult.position === '3' ? 'third' :
                                  raceResult.time === 'Crash' || raceResult.time === 'Failure' ? 'dnf' :
                                  raceResult.points > 0 ? 'points' :
                                  raceResult.time === 'DSQ' ? 'dsq' : '';
                const render = `<td class="${className}">${raceResult.position}</td>`;
                viewModel.addRender(raceResult.driver, render);
            });
        });
        header.innerHTML += `<th>Pts</th>`;
        table.appendChild(document.createElement('thead')).appendChild(header);
        viewModel.getResults().sort((a, b) => b.points - a.points).forEach(participant => {
            const participantTeam = season.races[sortedRaces[0].date].getRaceResult(participant.participant).team;
            console.log(participantTeam)
            participant.insertTeam(participantTeam);
            table.innerHTML += `
                <tr>
                    ${participant.render}
                    <td>${participant.points}</td>
                </tr>
            `;
        });
        console.log(table.innerHTML);
        seasonContainer.appendChild(table);
        return seasonContainer;
    }

}