import $ from 'jquery'
import {gsap, ScrollTrigger, TweenLite} from "gsap/all";

gsap.registerPlugin(ScrollTrigger, TweenLite)

export default class Home {
    constructor() {
        this.init()
    }

    init() {
        this.HPLeftRightAnim()
        this.AchievementCounter()
        this.AchievementImgScale()
        this.MagnetPartnerIcons()
        // this.magnetIcons()
    }
    magnetIcons() {
        $('.partners__container').mousemove(function(event){
            $(".partners__link > img").each(function(index, element){
                var xPos = (event.clientX/$(window).width())-0.5,
                    yPos = (event.clientY/$(window).height())-0.5,
                    box = element;

                TweenLite.to(box, 0.6, {
                    rotationY: xPos * 100,
                    rotationX: -yPos * 100,
                    ease: 'Power4.easeOut',
                });

            })
        });
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

    MagnetPartnerIcons() {
        if ($(window).width() >= 992) {
            $(document).on('mousemove touch', function (e) {
                $('.magnetize').each(function () {
                    magnetize(this, e);
                });
            });

            function magnetize(el, e) {
                let
                    mX = e.pageX,
                    mY = e.pageY;

                const item = $(el);

                const
                    customDist = item.data('dist') * 40 || 120,
                    centerX = item.offset().left + (item.width() / 2),
                    centerY = item.offset().top + (item.height() / 2);

                let
                    deltaX = Math.floor((centerX - mX)) * -0.45,
                    deltaY = Math.floor((centerY - mY)) * -0.45,
                    distance = calculateDistance(item, mX, mY);
                // TweenLite.to(box, 0.6, {
                //     rotationY: xPos * 100,
                //     rotationX: -yPos * 100,
                //     ease: 'Power4.easeOut',
                // });
                if (distance < customDist) {
                    gsap.to(item, 0.5,
                        {
                            y: deltaY,
                            x: deltaX,
                        }
                    );
                } else {
                    gsap.to(item, 0.6,
                        {
                            y: 0,
                            x: 0
                        }
                    );
                }
            }

            function calculateDistance(elem, mouseX, mouseY) {
                return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left + (elem.width() / 2)), 2) + Math.pow(mouseY - (elem.offset().top + (elem.height() / 2)), 2)));
            }
        }
    }
}