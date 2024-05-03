import { DATA_PATH } from '../config.js';
import Season from '../model/season.js';

export default class ResultsProvider {

    static data = {};

    static loadResults() {
        return new Promise((resolve, reject) => {
            fetch(DATA_PATH)
                .then(response => response.text())
                .then(csv => {
                    Papa.parse(csv, {
                        header: true,
                        skipEmptyLines: true,
                        step: function(result) {
                            const row = result.data;
                            const year = row.date.substring(0, 4);
                            const id = year + row.series;
                            if (!ResultsProvider.data[id]) {
                                ResultsProvider.data[id] = new Season(year, row.series);
                            }
                            const season = ResultsProvider.data[id];
                            if (!season.races[row.date]) {
                                season.addRace(row.gp, row.date, row.track, row.layout);
                            }
                            const race = season.races[row.date];

                            if (season.isEndurance()) race.addResult(row.position, row.driver, row.team, row.points, row.details, true);
                            else race.addResult(row.position, row.driver, row.team, row.points, row.details);
                        },
                        complete: function() {
                            resolve();
                        },
                        error: function(error) {
                            reject(error);
                        }
                    });
                    console.log("ResultsProvider : ", ResultsProvider.data);
                })
                .catch(error => {
                    reject(error)
                });
        });
    }

    static getSeason(year, series) {
        return ResultsProvider.data[year + series];
    }

    static getYears() {
        let res = [];
        Object.values(ResultsProvider.data).forEach(season => {
            if (!res.includes(season.year)) res.push(season.year);
        });
        return res;
    }

    static getCategories() {
        let res = [];
        Object.values(ResultsProvider.data).forEach(season => {
            res.push(season.series);
        });
        return res;
    }

    static getDriverSeasons(driver) {
        let res = {};
        Object.values(ResultsProvider.data).forEach(season => {
            if (!res[season.year] || res[season.year] === 'reserve') {
                if (season.hasDriver(driver)) {
                    res[season.year] = season;
                }
            }
        });
    }

}