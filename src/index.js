console.log(process.env.NODE_ENV);

import '@/styles.css';
import _ from 'lodash';

import header from '@/header.html';

function component() {
    const element = document.createElement('div');
    element.innerHTML = header;
    return element;
}

document.body.prepend(component());
