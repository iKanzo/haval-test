const burger = document.querySelector('.menu__burger');
const burgerIcon = document.querySelector('.menu__burger-icon');
const menuList = document.querySelector('.menu__list');
if (burger && menuList) {
    burger.addEventListener('click', () => {
        menuList.classList.toggle('active');
        const isOpen = menuList.classList.contains('active');
        burgerIcon.textContent = isOpen ? '✕' : '☰';
        burger.setAttribute('aria-expanded', isOpen);
        burger.setAttribute( 'aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню'
        );
    });
}

document.addEventListener('change', (e) => {
    const radio = e.target;

    if (!radio.classList.contains('card__color-radio')) return;

    const card = radio.closest('.card');
    if (!card) return;

    const model = card.dataset.model;
    const color = radio.value;
    const image = card.querySelector('.card__img');
    const src = `images/${model}-${color}.png`;
    image.src = src;
});

let modelToIndex = new Map();

function buildModelIndexMap(swiper) {
    modelToIndex.clear();

    swiper.slides.forEach((slide, index) => {
        const model = slide.querySelector('.card')?.dataset.model;
        if (model) modelToIndex.set(model, index);
    });
}

const swiper = new Swiper('.cards__swiper', {
    slidesPerView: 1,
    spaceBetween: 20,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    breakpoints: {
        768: { slidesPerView: 1 },
        1024: { slidesPerView: 2 }
    },

    on: {
        init() {
            buildModelIndexMap(this);
        }
    }
});


document.addEventListener('click', (e) => {
    if (e.target.closest('.card__color-form')) {
        e.stopPropagation();
    }
});

document.querySelectorAll('.menu__item-model').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const model = link.dataset.model;
        const index = modelToIndex.get(model);

        if (index == null) return;

        swiper.slideTo(index);

        document.querySelector('.cards')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

$('[data-fancybox]').fancybox({
    touch: false,
    afterShow: function (instance, slide) {
        const trigger = instance.current.opts.$orig;
        const title = trigger.data('title');

        $('#modal-title').text(title);
    }
});