import '@/styles.css';
import '@/pages/login/login.css';
import { isValidUser } from '@/assets/js/user.js';
import $ from 'jquery';

$('form').submit(function (event) {
  event.preventDefault();
  let username = $(this).serializeArray()[0].value;
  let password = $(this).serializeArray()[1].value;
  console.log(username, password);
  if (isValidUser(username, password)) {
    window.location = $(this).attr('action');
  } else {
    alert('帳號或密碼輸入錯誤');
  }
});