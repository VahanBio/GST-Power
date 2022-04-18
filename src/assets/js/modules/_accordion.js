import $ from 'jquery';

export default class Accordion {
	constructor(config) {
		this.config = config;
		this.init();
	}

	init() {
		let _this = this;
		$(document).on('click', this.config.accHead, function (e) {
			e.preventDefault();
			let parent = $(this).parent(_this.config.ele);

			_this.config.showOne && !parent.hasClass(_this.config.activeClass) && _this.closeAll();

			parent.siblings(_this.config.ele).removeClass(_this.config.activeClass);
			parent.siblings(_this.config.ele).find(_this.config.accBody).slideUp();
			parent.toggleClass(_this.config.activeClass);
			parent.find(_this.config.accBody).slideToggle();
			_this.config.callback && _this.config.callback();
		});
	}

	closeAll() {
		$(this.config.ele).each((idx, acc) => {
			if ($(acc).hasClass(this.config.activeClass)) {
				$(acc).removeClass(this.config.activeClass);
				$(acc).find(this.config.accBody).slideUp();
			}
		});
	}
}

//initialization
// new Accordion({
//     ele: 'element selector'
//     accHead: 'head selector',
//     accBody: 'body selector',
//     activeClass: 'active class name',
//	   showOne: Boolean
// });
