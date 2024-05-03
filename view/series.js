import ResultsProvider from "../service/results-provider.js";
import utils from "../service/utils.js";
import Championship from "./championship.js";

export default class Series {
    
    async render() {
        const request = utils.parseRequestURL();
        const series = request.main_id.replace(/%20/g, ' ');
        let render = ``;

        const years = ResultsProvider.getYears();
        for (const year of years) {
            const season = await ResultsProvider.getSeason(year, series);
            if (season) {
                const championship = new Championship();
                render += await championship.render(year, series);
            }
        }

        return `<section class="series">
            ${render}
        </section>`;
    }

}