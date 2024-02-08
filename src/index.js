console.log(process.env.NODE_ENV);

import '@/styles.css';
import _ from 'lodash';
import { routeInterceptor } from '@/assets/js/route.js'
import header from '@/header.html';

routeInterceptor();

function component() {
    const element = document.createElement('div');
    element.innerHTML = header;
    return element;
}

document.body.prepend(component());