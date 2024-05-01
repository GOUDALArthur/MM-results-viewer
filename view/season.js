import ResultsProvider from "../service/results-provider.js";
import utils from "../service/utils.js";
import Championship from "./championship.js";

export default class Season {
    
    async render() {
        const request = utils.parseRequestURL();
        let render = ``;

        const categories = ResultsProvider.getCategories();
        for (const cat of categories) {
            const season = await ResultsProvider.getSeason(request.main_id, cat);
            if (season) {
                const championship = new Championship();
                render += await championship.render(request.main_id, cat);
            }
        }

        return `<section class="category">
            ${render}
        </section>`;
    }

}