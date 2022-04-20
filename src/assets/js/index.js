import $ from 'jquery';
import LazyLoad from 'vanilla-lazyload';
import SmoothScroll from "./modules/_smooth-scroll";
import Header from "./modules/_header";
import Animate from "./modules/_animation";

$(document).ready(() => {
    new LazyLoad()
    new SmoothScroll()
    new Header()

    new Animate('.animate-on-scroll', {
        animateClassName: 'animate',
        offset: 50,
    });
});
