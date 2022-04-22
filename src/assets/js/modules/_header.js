import $ from 'jquery'
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {clickOutSide} from "./_utils";

gsap.registerPlugin(ScrollTrigger)

export default class Header {
    constructor() {
        this.navToggle = $('.nav__toggle')
        this.dropBtn = $('.dropdown--toggle')
        this.init()
    }

    init() {
        this.navMobile()
        this.navDropdowns()
    }

    navMobile() {
        this.navToggle.on('click', function () {
            $(this).toggleClass('nav__toggle--active')
            $('.nav__list').toggleClass('nav__list--open')
            this.dropBtn
                .next().slideUp()
                .parent().removeClass('nav__list--item--open')
        })
        clickOutSide({
            ele: '.nav__list',
            callback: (ele) => {
                $(ele).removeClass('nav__list--open')
                this.navToggle.removeClass('nav__toggle--active')
                this.dropBtn
                    .next().slideUp()
                    .parent().removeClass('nav__list--item--open')
            }
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
                $(this).find(this.dropBtn).on('click', function (e) {
                    e.preventDefault()
                    $(this).parent().addClass('nav__list--active')
                    $('.nav__list').addClass('nav__list--open')
                    $(this).siblings('.nav__list--dropdown').addClass('nav__list--dropdown--open')
                })
            })
        }
    }
}