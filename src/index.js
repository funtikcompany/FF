
import "bootstrap/scss/bootstrap.scss"
import "bootstrap/scss/bootstrap-reboot.scss"
import "bootstrap"
import "./styles/main.scss"
import Swiper from "swiper/bundle";
import 'swiper/scss'
import header from './scripts/header.js'
import menu from './scripts/menu.js'
import scroll from './scripts/scroll.js'

const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    breakpoints: {
        700: {
            slidesPerView: 3,
        },
        1100: {
            slidesPerView: 5,
        },
    }
});

header();
menu();
scroll();