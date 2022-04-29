import $ from 'jquery';
import Scrollbar from 'smooth-scrollbar';
import {gsap, ScrollTrigger} from "gsap/all";

gsap.registerPlugin(ScrollTrigger)

export default class SmoothScroll {
    constructor() {
        // this.init()
    }

    init() {
        this.SmoothScroll()
        this.SmoothScrollGSAP()
    }

    SmoothScroll() {
        //Alternative Mobile check
        // const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(navigator.userAgent) ? true : false;

        if ($(window).width() <= 991.8) {
            let bodyScroll = document.getElementById("scroll-container"),
                scrollPositionX = 0,
                scrollPositionY = 0,
                bodyScrollBar = Scrollbar.init(bodyScroll, {
                    damping: 0.05,
                    renderByPixel: true,
                    continuousScrolling: true,
                    alwaysShowTracks: false,
                });
            bodyScrollBar.addListener(({offset}) => {
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
        }
    }

    SmoothScrollGSAP() {
        const container = document.getElementById('scroll-container')
        let height;

        function setHeight() {
            height = container.clientHeight;
            document.body.style.height = height + 'px'
        }

        ScrollTrigger.addEventListener('refreshInit', setHeight)

        function onResize() {
            height = container.clientHeight;
            document.body.style.height = height + 'px'
        }

        onResize()
        ScrollTrigger.addEventListener('refreshInit', onResize)
        gsap.to(container, {
            y: () => -(height - document.documentElement.clientHeight),
            ease: 'none',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                invalidateOnRefresh: true
            }
        })
    }
}