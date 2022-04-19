import $ from 'jquery';
import LazyLoad from 'vanilla-lazyload';
import SmoothScroll from "./modules/_smooth-scroll";

$(document).ready(() => {
    new LazyLoad();
    new SmoothScroll()
});
