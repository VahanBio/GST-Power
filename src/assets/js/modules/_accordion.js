import $ from 'jquery'

export default class Accordion {

    // new Accordion({
    //     ele: 'element selector', // Container which contains accordion ITEMS ./#
    //     accHead: 'head selector', // Clickable div/button(contains question/title) container ./#
    //     accBody: 'body selector', // Visible area after click ./# (should have display:none from css)
    //     activeClass: 'active class name', // active class that gets on 'ele' element ./#
    // });

    constructor(config) {
        this.config = config;
        this.init();
    }

    init() {
        let _this = this;
        $(document).on('click', this.config.accHead, function (e) {
            e.preventDefault();
            let parent = $(this).parent(_this.config.ele);
            parent.siblings(_this.config.ele).removeClass(_this.config.activeClass);
            parent.siblings(_this.config.ele).find(_this.config.accBody).slideUp();
            parent.toggleClass(_this.config.activeClass);
            parent.find(_this.config.accBody).slideToggle();
            _this.config.callback && _this.config.callback();
        });
    }
}