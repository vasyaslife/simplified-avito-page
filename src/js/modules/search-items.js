function searchItems(searchForm, products = [], users = []) {

        let formData = new FormData(searchForm);
        let searchInfo = {};

        formData.forEach((value, key) => {
            searchInfo[key] = value;
        });
        
        let resultArr = [];
        for (let i = 0; i < products.length; i++) {
            resultArr[i] = products[i];
        }

        if (searchInfo['sort-select'] == 'cheaper') {
            resultArr = sortByCheaper(resultArr);
        } else if (searchInfo['sort-select'] == 'popularity') {
            resultArr = sortByPopularity(resultArr, users);
        }

        if (searchInfo['favorites']) {
            resultArr = sortByFav(resultArr, localStorage.getItem('favList'));
        }

        if (searchInfo['type-select'] != 'none') {
            resultArr = sortByType(resultArr, searchInfo['type-select']);
        }

        if ( isFinite(searchInfo['price-from']) &&
        isFinite(searchInfo['price-to']) ) {

            if (+searchInfo['price-from'] > +searchInfo['price-to'] &&
            searchInfo['price-to'] != '') {
                alert('некорректно введены поля диапазона цен');
                return [];            
            } else if ( searchInfo['price-from'] != '' && 
            searchInfo['price-to'] != '' ) {
                resultArr = sortByPrice(resultArr, '<>', searchInfo['price-from'], searchInfo['price-to']);
            } else if (searchInfo['price-from'] != '') {
                resultArr = sortByPrice(resultArr, '<', searchInfo['price-from']);            
            } else if (searchInfo['price-to'] != '') {
                resultArr = sortByPrice(resultArr, '>', 0, searchInfo['price-to']);
            }
        } else {
            alert('некорректно введены поля диапазона цен');
            return [];
        }

        // sort by cheaper, result without item with empty price field
        function sortByCheaper(arr) {
            return arr.filter((item) => isFinite(item.price))
            .sort((a, b) => a.price - b.price);
        }

        // sort by popularity
        function sortByPopularity(arr, userArr) {
            let userRating = userArr.sort((a, b) => b.rating - a.rating);
            let result = [];

            userRating.forEach((userItem) => {
                arr.filter((arrItems) => arrItems.relationships.seller == userItem.id)
                .forEach((arrItem) => result.push(arrItem));
            });

            return result;
        }
        
        // type sort
        function sortByType(arr, type) {
            return arr.filter((item) => item.category == type);
        }

       // fav sort
        function sortByFav(arr, favList) {
            return arr.filter((item) => favList.indexOf(item.id) + 1);
        }

        // price sort
        function sortByPrice(arr, type, priceFrom, priceTo) {
            if (type == '<>') {
                return arr.filter((item) => (isFinite(item.price) &&
                item.price <= +priceTo && 
                item.price >= +priceFrom));
            } else if (type == '<') {
                return arr.filter((item) => (isFinite(item.price) &&
                item.price >= +priceFrom));
            } else if (type == '>' ) {
                return arr.filter((item) => (isFinite(item.price) &&
                item.price <= +priceTo));
            }
        }

        return resultArr;
}

module.exports = searchItems;