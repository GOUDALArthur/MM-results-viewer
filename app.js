import ResultsProvider from './service/results-provider.js';
import utils from './service/utils.js';
import Home from './view/home.js';
import Championship from './view/championship.js';
import Category from './view/category.js';
import Season from './view/season.js';

const routes = {
    '/': Home,
    '/categories/:main_id': Category,
    '/categories/:main_id/:id' : Championship,
    '/seasons/:main_id': Season,
};

const router = async () => {
    const content = null || document.querySelector('#content');

    let request = utils.parseRequestURL()
    console.log('request: ', request);
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
