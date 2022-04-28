import $ from 'jquery';
import LazyLoad from 'vanilla-lazyload';
import SmoothScroll from "./modules/_smooth-scroll";
import Header from "./modules/_header";
import Animate from "./modules/_animation";
import Home from "./modules/_home";

$(document).ready(() => {
    new LazyLoad()
    new Header()
    new Home()
    // new SmoothScroll()

    new Animate('.fade-on-scroll', {
        animateClassName: 'animate',
        offset: 0,
    });

    new Animate('.animate-on-scroll', {
        animateClassName: 'animate',
        offset: 50,
    });

    new Animate('.animate-right', {
        animateClassName: 'animate',
        offset: 50,
    });

    new Animate('.animate-left', {
        animateClassName: 'animate',
        offset: 50,
    });

    //Tab - change content
    $('.tab--button').on('click', function (e) {
        $('.tab--content').hide();
        $($(this).attr('href')).show();
        $(this).addClass('tab--active')
        $(this).siblings().removeClass('tab--active')
        e.preventDefault()
    })
});
