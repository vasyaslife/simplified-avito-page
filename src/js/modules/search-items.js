function searchItems(searchBtn, form, products = [], users = []) {
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();

        let formData = new FormData(form);
        let searchInfo = {};
        formData.forEach((value, key) => {
            searchInfo[key] = value;
        });

        console.log(searchInfo);
        console.log(products);
        console.log(users);
    });
}

module.exports = searchItems;