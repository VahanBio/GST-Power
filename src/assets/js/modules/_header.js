import $ from 'jquery'
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {clickOutSide} from "./_utils";

gsap.registerPlugin(ScrollTrigger)

export default class Header {
    constructor() {
        this.init()
    }

    init() {
        this.stickyHeader()
        this.navMobile()
        this.navDropdowns()
    }

    stickyHeader() {
        if ($(window).width() > 992) {
            const timeline = gsap
                .timeline({
                    onUpdate: () => {
                        timeline.scrollTrigger.spacer.style.height =
                            document.querySelector('.header__inner').offsetHeight + 'px';
                        timeline.scrollTrigger.trigger.style.height =
                            document.querySelector('.header__inner').offsetHeight + 'px';
                    },
                    scrollTrigger: {
                        trigger: '.header__home',
                        start: 'top top',
                        toggleActions: 'play none none reverse',
                        end: '+=80000000000',
                        pinSpacing: false,
                        pin: true,
                        top: 0,
                        anticipatePin: 1,
                        onEnter: () => {
                            timeline.timeScale(2.5);
                        },
                    },
                })
                .progress(0.5);
            timeline
                .to('.nav__logo', {
                    opacity: 1,
                    visibility: 'visible',
                    duration: 0.5,
                })
            timeline
                .to('.header__inner', {
                    backgroundColor: 'rgb(18, 41, 52)',
                    duration: 0.3,
                })
        }
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

            clickOutSide({
                ele: '.header__inner',
                callback: () => {
                    $('.dropdown--close').removeClass('active')
                    $('.nav__list--item').removeClass('nav__list--active')
                    $('.nav__list').removeClass('nav__list--open')
                    $('.nav__list--dropdown').removeClass('nav__list--dropdown--open')
                }
            })
        }
    }
}