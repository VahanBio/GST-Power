import $ from 'jquery'
import Accordion from "./_accordion";

export default class Plp {
    constructor() {
        this.init()
    }

    init() {
        this.dropdowns()
    }

    dropdowns() {
        new Accordion({
            ele: '.plp__filter',
            accHead: '.plp__filter--head',
            accBody: '.plp__filter--body',
            activeClass: 'plp__filter--open'
        })

        if ($(window).width() <= 991.8) {
            $(document).on('click', '.plp__filter--mob', () => {
                $('.plp__filters').fadeIn(200)
            })

            $(document).on('click', '.plp__filters--close', () => {
                $('.plp__filters').fadeOut(200)
            })
        }
    }
}