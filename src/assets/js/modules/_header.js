import $ from 'jquery'
import {gsap, ScrollTrigger} from "gsap/all";
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
        //Home Header
        if ($(window).width() >= 992) {
            const timeline = gsap
                .timeline({
                    scrollTrigger: {
                        trigger: '.header__home',
                        start: 'top top',
                        toggleActions: 'play none none reverse',
                        end: '+=8000000000',
                        pinSpacing: false,
                        pin: true,
                        top: 0,
                        anticipatePin: 1,
                        refreshPriority: 1,
                        onEnter: () => {
                            timeline.timeScale(2.5)
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
                .to('.header__inner', {
                    backgroundColor: 'rgb(18, 41, 52)',
                    duration: 0.3,
                })
        }

        //Main Header
        const tl = gsap
            .timeline({
                scrollTrigger: {
                    trigger: '.header__main',
                    start: 'top top',
                    toggleActions: 'play none none reverse',
                    end: '+=8000000000',
                    pinSpacing: false,
                    pin: true,
                    top: 0,
                    anticipatePin: 1,
                    refreshPriority: 1,
                    onEnter: () => {
                        tl.timeScale(2.5);
                    }
                }
            })
            .progress(1);
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