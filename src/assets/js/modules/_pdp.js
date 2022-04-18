import $ from 'jquery';

export default class Pdp {
    constructor() {
        this.init()
    }

    init() {
        this.pdpNavbar()
    }

    pdpNavbar() {
        $('.pdp__nav--button').on('click', function (e) {
            $('.description--content').hide();
            $($(this).attr('href')).show();
            $(this).addClass('tab--active')
            $(this).siblings().removeClass('tab--active')
            e.preventDefault()
        })
    }
}