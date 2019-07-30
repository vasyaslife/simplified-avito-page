require('es6-promise').polyfill();
require('nodelist-foreach-polyfill'); 
require('formdata-polyfill');

window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    let requestData = require('./modules/request-data.js'),
        searchItems = require('./modules/search-items.js'),
        createProduct = require('./modules/create-product.js');

    // create empty local field for fav list
    if ( !(!!localStorage.getItem('favList')) ) {
        let emptyArr = '';
        localStorage.setItem('favList', JSON.stringify(emptyArr));
    }

    // url to data
    let productUrl = './js/json/products.json',
    usersUrl = './js/json/sellers.json';
    
    // create all products at start
    let productWrap = document.querySelector('.products div div');
    createProduct(productWrap, requestData(productUrl), requestData(usersUrl));

    // search products
    let searchBtn = document.querySelector('.search__btn'),
        searchForm = document.querySelector('.search__form');

    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();

        let products = searchItems(searchForm, requestData(productUrl), requestData(usersUrl));
        createProduct(productWrap, products, requestData(usersUrl));
    });

});