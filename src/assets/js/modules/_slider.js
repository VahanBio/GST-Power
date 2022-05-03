import Swiper, {Autoplay} from "swiper";
import LazyLoad from "vanilla-lazyload";

export default class Slider {
    initAboutSlider() {
        new Swiper('#about-slider', {
            modules: [Autoplay],
            loop:true,
            loopedSlides: 4,
            slidesPerView: 1,
            spaceBetween: 15,
            loop: true,
            speed: 4000,
            autoplay:{
              delay: 0,
              pauseOnMouseEnter: false,
              disableOnInteraction: false
            },
            on: {
                afterInit: (swiper) => {
                    new LazyLoad({
                        container: swiper.el,
                        cancel_on_exit: false,
                    });
                },
            },
            breakpoints: {
                992:{
                    slidesPerView: 2.8,
                    spaceBetween: 120,
                    speed: 5000
                }
            }
        })
    }
}