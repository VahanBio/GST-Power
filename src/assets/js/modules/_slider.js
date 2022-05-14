import LazyLoad from "vanilla-lazyload";
import Swiper, {Autoplay, Navigation, Pagination} from "swiper";

Swiper.use([Autoplay, Navigation, Pagination])

export default class Slider {
    initAboutSlider() {
        new Swiper('#about-slider', {
            modules: [Autoplay],
            slidesPerView: 1,
            spaceBetween: 15,
            loop: true,
            loopedSlides: 4,
            speed: 4000,
            autoplay: {
                delay: 0,
                pauseOnMouseEnter: false,
                disableOnInteraction: false
            },
            breakpoints: {
                992: {
                    slidesPerView: 2.7,
                    spaceBetween: 120,
                    speed: 5000
                }
            }
        })
    }

    initRelatedSlider() {
        new Swiper('#related--slider', {
            modules: [Navigation, Pagination],
            slidesPerView: 2,
            spaceBetween: 10,
            speed: 500,
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            navigation: {
                prevEl: '.related__slider--prev',
                nextEl: '.related__slider--next'
            },
            pagination: {
                el: '.swiper-progress__fill',
                type: 'progressbar'
            },
            breakpoints: {
                992: {
                    slidesPerView: 3,
                    spaceBetween: 35
                }
            },
            on: {
                afterInit: (swiper) => {
                    new LazyLoad({
                        container: swiper.el,
                        cancel_on_exit: false,
                    });
                }
            }
        })
    }
}