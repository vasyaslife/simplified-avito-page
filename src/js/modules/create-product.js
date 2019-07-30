function createProduct(wrap, products = [], users = []) {
    wrap.innerHTML = '';

    products.forEach(function(item) {
    let div = document.createElement('div');
    div.classList.add('col-6');

    let price = item.price || 'Цена не указана',
    rating = users[item.relationships.seller].rating,
    userName = users[item.relationships.seller].name,
    pictureUrl = item.pictures[0],
    favIcon = 'products__favorites-icon';

    if (localStorage.getItem('favList').indexOf(item.id) + 1) {
        favIcon += ' products__favorites-icon_active';
    }
    

    if (isFinite(price) && toString(price).length > 3) {
        price = price.toLocaleString('ru');
    }

        div.innerHTML = `<div class="products__item" key=${item.id}>
            <div class="products__img-box">
                <img src="${ pictureUrl }" alt="product-img" class="product__img">
                <i class="${ favIcon } fas fa-heart"></i>
            </div>
            <div class="products__content-block">
                <div class="products__info">
                    <h2 class="title title__h2 products__title">
                        ${ item.title }
                    </h2>
                    <p class="products__price">
                        ${ price } \u20bd
                    </p>
                </div>
                <div class="products__user-info user">
                    <p class="user__name">
                        ${ userName }
                    </p>
                    <div class="user__rating">
                        <p class="user__rating-text">
                            ${ rating }
                        </p>
                        <div class="user__stars_bgr">
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                        </div>
                        <div class="user__stars" style="width: ${ rating * 20 }%">
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        wrap.appendChild(div);
    }); 

    let favElements = document.querySelectorAll('.fa-heart');

    favElements.forEach(function(item) {
        item.addEventListener('click', function(event) {
            if ( event.target.classList.contains('products__favorites-icon_active') ) {

                event.target.classList.remove('products__favorites-icon_active');

                let elemIndex = event.target.parentNode.parentNode.getAttribute('key'),
                localArr = JSON.parse(localStorage.getItem('favList')).split(','),
                localArrIndex = localArr.indexOf(elemIndex);

                localArr.splice(localArrIndex, 1);
                localArr = localArr.join(',');
                localStorage.setItem('favList', JSON.stringify(localArr));
            } else {

                event.target.classList.add('products__favorites-icon_active');

                let elemIndex = event.target.parentNode.parentNode.getAttribute('key'),
                localArr = JSON.parse(localStorage.getItem('favList'));

                if (localArr != '') {
                    localArr +=',' + elemIndex;
                } else {
                    localArr += elemIndex;
                }

                localStorage.setItem('favList', JSON.stringify(localArr));
            }
        });
    });
}

module.exports = createProduct;