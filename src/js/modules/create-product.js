function createProduct(wrap, products = [], users = []) {
    wrap.innerHTML = '';

    products.forEach(function(item) {
    let div = document.createElement('div');
    div.classList.add('col-6');

    let price = item.price || 'Цена не указана',
    rating = users[item.relationships.seller].rating,
    userName = users[item.relationships.seller].name,
    pictureUrl = item.pictures[0];

    if (isFinite(price) && toString(price).length > 3) {
        price = price.toLocaleString('ru');
    }

        div.innerHTML = `<div class="products__item" key=${item.id}>
            <div class="products__img-box">
                <img src="${ pictureUrl }" alt="product-img" class="product__img">
                <i class="products__favorites-icon fas fa-heart"></i>
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
}

module.exports = createProduct;