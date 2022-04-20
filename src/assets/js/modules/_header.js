import $ from 'jquery'
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export default class Header {
    constructor() {
        this.header = $('.header')
        this.init()
    }

    init() {
    }
}