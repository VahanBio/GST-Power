import $ from "jquery";
import {gsap} from "gsap/all";

export default class Partners {
    constructor() {
        this.init()
    }

    init() {
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
                //     rotationY: centerX * 100,
                //     rotationX: -centerY * 100,
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