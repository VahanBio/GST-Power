import Swiper, {Autoplay} from "swiper";

export default class Slider {
    initAboutSlider() {
        new Swiper('#about-slider', {
            modules: [Autoplay],
            slidesPerView: 1,
            spaceBetween: 15,
            loop:true,
            loopedSlides: 4,
            speed: 4000,
            autoplay:{
              delay: 0,
              pauseOnMouseEnter: false,
              disableOnInteraction: false
            },
            breakpoints: {
                992:{
                    slidesPerView: 2.7,
                    spaceBetween: 120,
                    speed: 5000
                }
            }
        })
    }
}