import ResultsProvider from "../service/results-provider.js";

export default class Home {

    async render() {
        const seasons = ResultsProvider.getYears();
        const categories = ResultsProvider.getCategories();
        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Seasons</th>
                </tr>
            </thead>
        `;
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        for (const category of categories) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <th scope="row"><a href="#/categories/${category}">${category}</a></th>
            `;
            for (const season of seasons) {
                row.innerHTML += `
                    <td><a href="#/categories/${category}/${season}">${season}</a></td>
                `;
            }
            tbody.appendChild(row);
        }

        return `<section class="home">
            ${table.outerHTML}
        </section>`;
    }

}