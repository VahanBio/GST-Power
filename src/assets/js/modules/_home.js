import $ from 'jquery'
import {gsap, ScrollTrigger} from "gsap/all";

gsap.registerPlugin(ScrollTrigger)

export default class Home {
    constructor() {
        this.init()
    }

    init() {
        this.achievementCounter()
        this.achievementImgScale()
    }

    achievementCounter() {
        $(".progress__animate").each(function (index, element) {
            const count = $(this),
                zero = {val: 0},
                num = count.data("count"),
                split = (num + "").split("."),
                decimals = split.length > 1 ? split[1].length : 0

            const numTl = gsap.to(zero, {
                start: 'top center',
                toggleActions: 'play none none reverse',
                val: num,
                duration: 4,
                scrollTrigger: {
                    // markers: true,
                    trigger: element,
                    onEnter: () => {
                        numTl.scrollTrigger.refresh()
                    }
                },
                onUpdate: () => {
                    count.text(zero.val.toFixed(decimals));
                }
            });
        });
    }

    achievementImgScale() {
        if ($(window).width() >= 992) {
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.achievement__container',
                    start: 'top bottom',
                    immediateRender: false,
                    toggleActions: 'play none none reverse',
                    scrub: true,
                    onEnter: () => {
                        tl.scrollTrigger.refresh()
                    }
                },
            });
            tl.to('.achievement__image', {
                maxWidth: '720px',
                duration: 4,
            })
        }
    }
}