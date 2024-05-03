import ResultsProvider from './service/results-provider.js';
import utils from './service/utils.js';
import Home from './view/home.js';
import Series from './view/series.js';
import Championship from './view/championship.js';
import Driver from './view/driver.js';
import Season from './view/season.js';

const routes = {
    '/': Home,
    '/categories/:main_id': Series,
    '/categories/:main_id/:id' : Championship,
    '/seasons/:main_id': Season,
    '/drivers/:main_id': Driver,
};

const router = async () => {
    const content = null || document.querySelector('#content');

    let request = utils.parseRequestURL()
    let parsedURL = (request.resource ? '/' + request.resource : '/')
                    + (request.main_id ? '/:main_id' : '')
                    + (request.id ? '/:id' : '')
                    + (request.verb ? '/' + request.verb : '')
    let page = routes[parsedURL] ? new routes[parsedURL] : Error404
    content.innerHTML = await page.render();
}

window.addEventListener('hashchange', router);

const handleFirstLoad = async () => {
    await ResultsProvider.loadResults();
    document.removeEventListener('DOMContentLoaded', handleFirstLoad);
    window.addEventListener('load', router);
    router();
};

document.addEventListener('DOMContentLoaded', handleFirstLoad);
