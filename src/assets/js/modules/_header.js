import $ from 'jquery'
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export default class Header {
    constructor() {
        this.init()
    }

    init() {
        this.fixedHeader()
        this.navMobile()
        this.navDropdowns()
    }

    fixedHeader() {
        const stickyTL = gsap
            .timeline({
                onUpdate: () => {
                    console.log(stickyTL.scrollTrigger.trigger.children);
                    stickyTL.scrollTrigger.spacer.style.height =
                        document.querySelector('.header__inner').offsetHeight + 'px';
                    stickyTL.scrollTrigger.trigger.style.height =
                        document.querySelector('.header__inner').offsetHeight + 'px';
                },
                scrollTrigger: {
                    trigger: '.header__inner',
                    start: 'top top',
                    toggleActions: 'play none none reverse',
                    pinSpacing: false,
                    pin: true,
                    top: 0,
                    end: document.querySelector('.smooth-scroll').scrollHeight,
                    anticipatePin: 1,
                    onEnter: () => {
                        stickyTL.timeScale(2.5);
                    },
                },

            })
            .progress(1);
        stickyTL
            .to('.nav__logo', {
                opacity: 1,
                visibility: 'visible',
                duration: 0.3,
            })
    }

    navMobile() {
        $('.nav__toggle').on('click', function () {
            $(this).toggleClass('nav__toggle--active')
            $('.nav__list').toggleClass('nav__list--open')
            $('.header__inner').toggleClass('sidebar--open')
            $('.dropdown--toggle')
                .next().slideUp()
                .parent().removeClass('nav__list--item--open')
        })
    }

    navDropdowns() {
        if ($(window).width() <= 991.8) {
            $(document).on('click', '.dropdown--toggle', function () {
                const $this = $(this);
                $this.parent().toggleClass('nav__list--item--open')
                $this.next().slideToggle();
            })
        }

        if ($(window).width() >= 992) {
            $('.nav__list--item').each(function () {
                $(this).find('.dropdown--toggle').on('click', function (e) {
                    e.preventDefault()
                    $(this).parent().addClass('nav__list--active')
                    $('.nav__list').addClass('nav__list--open')
                    $(this).siblings('.nav__list--dropdown').addClass('nav__list--dropdown--open')
                    $('.dropdown--close').addClass('active')
                })
            })

            $('.dropdown--close').on('click', function () {
                $(this).removeClass('active')
                $('.nav__list--item').removeClass('nav__list--active')
                $('.nav__list').removeClass('nav__list--open')
                $('.nav__list--dropdown').removeClass('nav__list--dropdown--open')
            })
        }
    }
}