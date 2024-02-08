import '@/styles.css';
import _ from 'lodash';
import { getSessionUser,logout,isAdmin } from '@/assets/js/user.js';
import { findAllCartItems } from '@/assets/js/cart.js';

const currentUser = getSessionUser();

console.log(currentUser);

document.querySelector('#username').textContent = currentUser.username;
document.querySelector('#cartItemsCtn').textContent = findAllCartItems().length + '';
document.querySelector('#logout').addEventListener('click',function(){
    logout();
});

if(currentUser.role.roleId == 1) {
    document.querySelector('#backBtn').classList.toggle('hidden');
}

document.querySelector('#backBtn').addEventListener('click',function() {
    if(isAdmin()) {
        window.location.href='./back.html';
    }
});