import { users, User,Role } from './data.js';

/**
 * 
 * @param {*} username 
 * @param {*} password 
 * @returns 
 */
export function isValidUser(username, password) {

    let user = findUserByUsername(username);

    if(user!=null && user.password == password) {
        window.sessionStorage.setItem('user', JSON.stringify(user));
        return true;
    }
    window.sessionStorage.removeItem('user');
    return false;
}

/**
 * 
 * @param {*} username 
 * @returns 
 */
export function findUserByUsername(username) {
    const userOpt = [...users].filter(user => user.username == username);
    return userOpt.length == 1 ? userOpt[0]: null;
}

/**
 * @returns {User}
 */
export function getSessionUser() {
    const userJsonStr = window.sessionStorage.getItem('user');
    const currentUser = userJsonStr == null ? null: JSON.parse(userJsonStr);
    return new User(currentUser.id,currentUser.username,currentUser.password,currentUser.email, 
       new Role( currentUser.role.roleId,  currentUser.role.roleName));
}

/**
 * 
 * @returns 
 */
export function isAdmin() {
    return getSessionUser().role.roleId == 1;
}

/**
 * 
 */
export function logout() {
    window.sessionStorage.clear();
}

globalThis.sessionUser = getSessionUser;

globalThis.isAdmin = isAdmin;