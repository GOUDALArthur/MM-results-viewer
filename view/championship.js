import ResultsProvider from "../service/results-provider.js";
import utils from "../service/utils.js";
import ChampionshipResultViewModel from "../view-model/championship.js";

export default class Championship {

    async render(year = null, category = null) {
        const request = utils.parseRequestURL();
        const viewModel = new ChampionshipResultViewModel();
        const seasonYear = year || request.id;
        const seasonCategory = category || request.id_cat.replace(/%20/g, ' ');
        const season = ResultsProvider.getSeason(seasonYear, seasonCategory);
        console.log('Season: ', season);
        let header = ``;

        const sortedRaces = Object.values(season.races).sort((a, b) => new Date(a.date) - new Date(b.date));
        sortedRaces.forEach(race => {
            header += `<th>${race.gp}</th>`;
            Object.values(race.getResults()).forEach(raceResult => {
                viewModel.getResult(raceResult.driver) || viewModel.addParticipant(raceResult.driver);
                viewModel.addPoints(raceResult.driver, raceResult.points);
                let className = raceResult.position === '1' ? 'winner' :
                                  raceResult.position === '2' ? 'second' :
                                  raceResult.position === '3' ? 'third' :
                                  raceResult.details.includes('Crash')  || raceResult.details.includes('Failure') ? 'dnf' :
                                  raceResult.details.includes('DSQ') ? 'dsq' :
                                  raceResult.points > 0 ? 'points' : '';
                if (raceResult.details.includes('P')) className += ' pole';
                if (raceResult.details.includes('FL')) className += ' fl';
                const resultRender = ['Crash', 'Failure', 'DSQ'].some(val => raceResult.details.includes(val)) ? raceResult.details[0].substring(0, 3) : raceResult.position;
                viewModel.addRender(raceResult.driver, `<td class="${className}">${resultRender}</td>`);

                viewModel.getResult(raceResult.team) || viewModel.addParticipant(raceResult.team);
                const driverTeam = race.getResult(raceResult.driver).team;
                const teamMate = Object.entries(race.getResults()).find(([_, result]) => result.team === driverTeam && result.position != raceResult.position)[1];
                if (parseInt(raceResult.position) < parseInt(teamMate.position)) {
                    const points = parseInt(raceResult.points) + parseInt(teamMate.points);
                    viewModel.addPoints(raceResult.team, points);
                    const render = points > 0 ? points : '-';
                    if (teamMate.details.includes('P')) className += ' pole';
                    if (teamMate.details.includes('FL')) className += ' fl';
                    viewModel.addRender(raceResult.team, `<td class="${className}">${render}</td>`);
                }
            });
        });
        header += `<th>Pts</th>`;

        const driversTable = document.createElement('table');
        driversTable.innerHTML = `<thead><th>Drivers</th>${header}</thead>`;
        const driversBody = document.createElement('tbody');
        driversTable.appendChild(driversBody);
        const teamsTable = document.createElement('table');
        teamsTable.innerHTML = `<thead><th>Teams</th>${header}</thead>`;
        const teamsBody = document.createElement('tbody');
        teamsTable.appendChild(teamsBody);

        viewModel.getResults().sort((a, b) => b.points - a.points).forEach(participant => {
            const result = season.races[sortedRaces[0].date].getResult(participant.participant);
            if (result) { // If participant is a driver
                participant.insertTeam(result.team);
                driversBody.innerHTML += `
                    <tr>
                      ${participant.render}
                      <td>${participant.points}</td>
                    </tr>
                `;
            } else { // If participant is a team
                participant.insertTeam(participant.participant);
                teamsBody.innerHTML += `
                    <tr>
                      ${participant.render}
                      <td>${participant.points}</td>
                    </tr>
                `;
            }
        });

        // console.log(driversTable.innerHTML);
        return `<section class="championship">
          <h2>${seasonYear} <a href="#/categories/${seasonCategory}">${seasonCategory}</a> Championship</h2>
          ${driversTable.outerHTML}
          ${teamsTable.outerHTML}
        </section>`;
    }

}