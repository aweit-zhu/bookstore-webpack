import '@/styles.css';
import _ from 'lodash';
import { routeInterceptor } from '@/assets/js/route.js'
import header from '@/pages/header/header.html';
import footer from '@/pages/footer/footer.html';

console.log(process.env.NODE_ENV);

routeInterceptor();

function addHeader() {
    const element = document.createElement('div');
    element.classList = 'sticky top-0 bg-white z-40';
    element.innerHTML = header;
    return element;
}

function addFooter() {
    const element = document.createElement('div');
    element.innerHTML = footer;
    return element;
}

function addLink(url) {
    const linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('href', url);
    return linkElement;
}

function addScript(url) {
    const script = document.createElement('script');
    script.setAttribute('src', url);
    return script;
}

document.head.append(addLink('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css'));
document.body.prepend(addHeader());

import('@/pages/header/header.js').then(() => {
    console.log('header.js executed after header is added to DOM');
}).catch(error => {
    console.error('Error executing header.js:', error);
});

document.body.append(addFooter());