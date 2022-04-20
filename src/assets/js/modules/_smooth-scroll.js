import $ from 'jquery';
import Scrollbar from 'smooth-scrollbar';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

export default class SmoothScroll {
    constructor() {
        this.init()
    }
    init() {
        //Check if it's mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(navigator.userAgent) ? true : false;

        //Page Smooth Scrolling Effect
        if(!isMobile) {
            Scrollbar.init(document.querySelector("#scroll-container"), {
                damping: 0.02,
                renderByPixel: true,
                continuousScrolling: true,
                alwaysShowTracks: false
            });
            let scrollPositionX = 0,
                scrollPositionY = 0,
                bodyScrollBar = Scrollbar.init(document.getElementById("scroll-container"));
            bodyScrollBar.addListener(({ offset }) => {
                scrollPositionX = offset.x;
                scrollPositionY = offset.y;
            });
            bodyScrollBar.setPosition(0, 0);
            bodyScrollBar.track.xAxis.element.remove();
            ScrollTrigger.scrollerProxy("body", {
                scrollTop(value) {
                    if (arguments.length) {
                        bodyScrollBar.scrollTop = value;
                    }
                    return bodyScrollBar.scrollTop;
                }
            });
            bodyScrollBar.addListener(ScrollTrigger.update);

            if($('.header').hasClass('header--fixed')){
                $('.header').prependTo($('#main-content'))
            }
        }
    }
}