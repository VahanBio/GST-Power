import $ from 'jquery'
import {gsap, ScrollTrigger} from "gsap/all";

gsap.registerPlugin(ScrollTrigger)

export default class Home {
    constructor() {
        this.init()
    }

    init() {
        this.HPLeftRightAnim()
        this.AchievementCounter()
        this.AchievementImgScale()
    }

    HPLeftRightAnim() {
        gsap.fromTo('.hero__sidebar',
            {
                translateX: '-100%',
                backgroundColor: 'rgba(18, 51, 52, 1)'
            },
            {
                translateX: 0,
                backgroundColor: 'rgba(18, 41, 52, 0.6)',
                delay: 0.2,
                duration: 1.2,
                ease: 'Power2.easeOut'
            })
    }

    AchievementCounter() {
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
                    count.text(zero.val.toFixed(decimals))
                }
            });
        });
    }

    AchievementImgScale() {
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
                duration: 4
            })
        }
    }
}