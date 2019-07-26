require('es6-promise').polyfill();
require('nodelist-foreach-polyfill'); 
require('formdata-polyfill');

window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    let requestData = require('./modules/request-data.js'),
        // searchItems = require('./modules/search-items.js'),
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
    // searchItems(searchBtn, searchForm, requestData(productUrl), requestData(usersUrl));

    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        let products = requestData(productUrl);

        let formData = new FormData(searchForm);
        let searchInfo = {};
        formData.forEach((value, key) => {
            searchInfo[key] = value;
        });

        // sort by cheaper
        // products.filter((item) => item.price);
        let resultProducts = products.filter((item) => isFinite(item.price));

        let resultProductsOne = resultProducts.sort(function(a, b) {
            console.log(a.price, b.price);
            return a.price > b.price;
        });

        // console.log(searchInfo);
        // console.log(requestData(productUrl));
        console.log(resultProductsOne);
        // console.log(requestData(usersUrl));
    });

});