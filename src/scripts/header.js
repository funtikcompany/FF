export default function header() {
    window.addEventListener('scroll', function (e) {
        if (window.scrollY > 50) {
            document.querySelector('.header').classList.add('scrolled')
        } else {
            document.querySelector('.header').classList.remove('scrolled')
        }

    })

    if (window.scrollY > 50) {
        document.querySelector('.header').classList.add('scrolled');
    }
    else {
        document.querySelector('.header').classList.remove('scrolled');
    }


}