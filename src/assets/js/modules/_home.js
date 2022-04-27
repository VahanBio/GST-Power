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
                decimals = split.length > 1 ? split[1].length : 0;

            gsap.to(zero, {
                start: 'top top',
                end: 'top 0',
                toggleActions: 'play none none none',
                val: num,
                duration: 4,
                scrollTrigger: {
                    trigger: element
                },
                onUpdate: function () {
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
                    start: 'top center',
                    immediateRender: false,
                    toggleActions: 'play none none reverse',
                    scrub: true,
                    onEnter: () => {
                        ScrollTrigger.refresh()
                    }
                },
            });
            tl.to('.achievement__image', {
                width: '38%',
                duration: 10,
            });
        }
    }
}