require('es6-promise').polyfill();
require('nodelist-foreach-polyfill'); 
require('formdata-polyfill');

window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    let searchItems = require('./modules/search-items.js'),
        requestData = require('./modules/request-data.js'),
        createProduct = require('./modules/create-product.js');


    // url to data
    let productUrl = './js/json/products.json',
    usersUrl = './js/json/sellers.json';
    
    // create all products at start
    let productWrap = document.querySelector('.products div div');
    createProduct(productWrap, requestData(productUrl), requestData(usersUrl));


    // search products
    let searchBtn = document.querySelector('.search__btn'),
        searchForm = document.querySelector('.search__form');


    searchItems(searchBtn, searchForm, requestData(productUrl), requestData(usersUrl));

});