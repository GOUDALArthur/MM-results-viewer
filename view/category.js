import ResultsProvider from "../service/results-provider.js";
import utils from "../service/utils.js";
import Championship from "./championship.js";

export default class Category {
    
    async render() {
        const request = utils.parseRequestURL();
        const category = request.id_cat.replace(/%20/g, ' ');
        const categoryContainer = document.createElement('section');
        categoryContainer.classList.add('category');

        const years = ResultsProvider.getYears();
        for (const year of years) {
            const season = await ResultsProvider.getSeason(year, category);
            if (season) {
                const championshipView = new Championship();
                const championshipTable = await championshipView.render(year, category);
                categoryContainer.innerHTML += championshipTable.outerHTML;
            }
        }

        return categoryContainer;
    }

}