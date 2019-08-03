function createProduct(wrap, products = [], users = []) {
    wrap.innerHTML = '';

    products.forEach(function(item) {
    let div = document.createElement('div');
    div.classList.add('col-md-12', 'col-lg-6');

    let price = item.price || 'Цена не указана',
    rating = users[item.relationships.seller].rating,
    userName = users[item.relationships.seller].name,
    pictures = '',
    dots = ''
    favIcon = 'products__favorites-icon';

    item.pictures.forEach(function(item) {
        pictures += `<img src="${ item }" alt="product-img" class="product__img">`;

        if (dots != '') {
            dots += `<div class="dot"></div>`;
        } else {
            dots += `<div class="dot dot-active"></div>`;
        }
    });


    let favList = JSON.parse(localStorage.getItem('favList')).split(',');
    if ( favList.some((favArr) => item.id == favArr) ) {
        favIcon += ' products__favorites-icon_active';
    }

    if (isFinite(price) && toString(price).length > 3) {
        price = price.toLocaleString('ru');
    }

        div.innerHTML = `<div class="products__item" key=${item.id}>
            <div class="products__img-box">
                <div class="product__slider slider">

                    ${ pictures }

                    <div class="slider__dots">
                        ${ dots }
                    </div>
                </div>

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

    let productSlider = document.querySelectorAll('.product__slider');

    productSlider.forEach(function(item) {

            let slideIndex = 1,
            dotsWrapper = item.querySelector('.slider__dots'),
            slides = item.querySelectorAll('.product__img'),
            dots = item.querySelectorAll('.dot'),
            dotActiveName = 'dot-active';

        slider(slideIndex, slides, dotsWrapper, dots, dotActiveName);
    });

    function slider(slideIndex, slides, dotsWrapper, dots, dotActiveName) {

        showSlides(slideIndex);
    
        function showSlides(n) {
    
            if (n > slides.length) {
                slideIndex = 1;
            } 
            if (n < 1) {
                slideIndex = slides.length;
            }
            slides.forEach((item) => item.style.display = 'none');
    
            dots.forEach((item) => item.classList.remove(dotActiveName));
    
            slides[slideIndex - 1].style.display = 'block';
            dots[slideIndex - 1].classList.add(dotActiveName);
        }
    
        function currentSlide(n) {
            showSlides(slideIndex = n);
        }
    
        dotsWrapper.addEventListener('click', (event) => {
            for (let i = 0; i < dots.length; i++) {
                if (event.target.classList.contains('dot') &&
                event.target == dots[i]) {
                    currentSlide(++i);
                }
            }
        });
    }
}

module.exports = createProduct;