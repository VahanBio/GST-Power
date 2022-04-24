import $ from 'jquery';
import LazyLoad from 'vanilla-lazyload';
import SmoothScroll from "./modules/_smooth-scroll";
import Header from "./modules/_header";
import Animate from "./modules/_animation";

$(document).ready(() => {
    new LazyLoad()
    new Header()
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
});
