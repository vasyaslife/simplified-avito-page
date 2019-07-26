require('es6-promise').polyfill();
require('nodelist-foreach-polyfill'); 
require('formdata-polyfill');

window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    let sendBtn = document.querySelector('.search__btn');


    sendBtn.addEventListener('click', function(e) {
        e.preventDefault();

        let formData = new FormData(document.querySelector('.search__form'));
        let obj = {};
        formData.forEach((value, key) => {
            obj[key] = value;
        });

        console.log(obj);
    });

});