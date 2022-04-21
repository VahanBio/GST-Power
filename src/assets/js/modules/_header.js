import $ from 'jquery'
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export default class Header {
    constructor() {
        this.init()
    }

    init() {
        this.navMobile()
        this.navDropdowns()
    }

    navMobile() {
        $(document).on('click', '.nav__toggle', function () {
            $(this).toggleClass('nav__toggle--active')
            $('.nav__list').toggleClass('nav__list--open')
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
                    $('.nav__list').addClass('nav__list--open')
                    $(this).siblings('.nav__list--dropdown').addClass('nav__list--dropdown--open')
                })
            })
        }
    }
}