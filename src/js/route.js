import { getSessionUser,logout } from '/src/js/user.js';

export function routeInterceptor() {
    
    let path = window.location.href;
    //console.log(path);
    if(path.indexOf('login')>=0 || path.indexOf('logout')>=0) {
        return;
    }

    if(getSessionUser() == null) {
        //console.log('ERROR');
        window.location.href='./login.html';
    }

    if(!isAdmin() && path.indexOf('back.html')>=0) {
        window.location.href='./login.html';
    }
}