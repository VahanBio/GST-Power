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
            $('.nav__list--item').each(function () {
                const $this = $(this)
                if ($this.hasClass('menu-item-has-children')) {
                    $this
                        .removeClass('nav__list--item--open')
                        .find('.nav__list--dropdown').slideUp()
                }
            })
        })
    }

    navDropdowns() {
        if ($(window).width() <= 991.8) {
            $('.nav__list--item').each(function () {
                const $this = $(this)
                if ($this.hasClass('menu-item-has-children')) {
                    $this.find('.nav__list--toggler').on('click', function (e) {
                        e.preventDefault()
                        $this
                            .toggleClass('nav__list--item--open')
                            .find('.nav__list--dropdown').slideToggle()
                    })
                }
            })
        }

        if ($(window).width() >= 992) {
            $('.nav__list--item').each(function () {
                const $this = $(this)
                if ($this.hasClass('menu-item-has-children')) {
                    $this.find('.nav__list--toggler').on('click', function (e) {
                        e.preventDefault()
                        $this.addClass('nav__list--active')
                        $('.nav__list').addClass('nav__list--open')
                        $this.find('.nav__list--dropdown').addClass('nav__list--dropdown--open')
                        $('.dropdown--close').addClass('active')
                        $('.lang-wrapper').addClass('hide')
                        $('.sub-lang').removeClass('active')
                    })
                }
            })

            $('.dropdown--close').on('click', function () {
                $(this).removeClass('active')
                $('.nav__list--item').removeClass('nav__list--active')
                $('.nav__list').removeClass('nav__list--open')
                $('.nav__list--dropdown').removeClass('nav__list--dropdown--open')
                $('.lang-wrapper').removeClass('hide')
                $('.sub-lang').removeClass('active')
            })

            clickOutSide({
                ele: '.header__inner',
                callback: () => {
                    $('.dropdown--close').removeClass('active')
                    $('.nav__list--item').removeClass('nav__list--active')
                    $('.nav__list').removeClass('nav__list--open')
                    $('.nav__list--dropdown').removeClass('nav__list--dropdown--open')
                    $('.lang-wrapper').removeClass('hide')
                    $('.sub-lang').removeClass('active')
                }
            })
        }

        $('.lang-wrapper').on('click', function () {
            $('.sub-lang').toggleClass('active')
        })

        clickOutSide({
            ele: '.lang-wrapper',
            callback: () => {
                $('.sub-lang').removeClass('active')
            }
        })
    }
}