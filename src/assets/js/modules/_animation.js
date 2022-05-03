import $ from 'jquery';

export default class Animate {
    constructor(el, settings) {
        this.el = el;
        this.animateClass = settings.animateClassName;
        this.offsetPos = settings.offset;
        this.init();
    }

    init() {
        let animationElements = $(this.el),
            $window = $(window),
            _this = this;

        function checkIfInView() {
            let windowHeight = $window.height(),
                windowTopPos = $window.scrollTop(),
                windowBottomPos = (windowTopPos + windowHeight);

            $.each(animationElements, function () {
                let $element = $(this),
                    ElementHeight = $element.outerHeight(),
                    ElementTopPos = $element.offset().top + _this.offsetPos,
                    ElementBottomPos = (ElementTopPos + ElementHeight);

                //check to see if this current container is within viewport
                if (ElementTopPos <= windowBottomPos) {
                    $element.addClass(_this.animateClass);
                }
            });
        }

        $window.on('scroll resize', checkIfInView);
        $window.trigger('scroll');
    }
}