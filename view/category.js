import ResultsProvider from "../service/results-provider.js";
import utils from "../service/utils.js";
import Championship from "./championship.js";

export default class Category {
    
    async render() {
        const request = utils.parseRequestURL();
        const category = request.id_cat.replace(/%20/g, ' ');
        let render = ``;

        const years = ResultsProvider.getYears();
        for (const year of years) {
            const season = await ResultsProvider.getSeason(year, category);
            if (season) {
                const championship = new Championship();
                render += await championship.render(year, category);
            }
        }

        return `<section class="category">
            ${render}
        </section>`;
    }

}