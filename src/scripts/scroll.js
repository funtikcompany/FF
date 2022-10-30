export default function scroll() {

    const navbarLinks = document.querySelectorAll(".scroll");
    for (let i = 0; i < navbarLinks.length; i++) {
        navbarLinks[i].addEventListener("click", navbarLinkClick);
        navbarLinks[i].addEventListener("click", function () {
            document.querySelector("#toggle-menu").classList.remove("active");
            document.querySelector(".menu").classList.remove("active");
            document.querySelector("body").classList.remove("no-scroll")
        })
    }

    function navbarLinkClick(event) {
        smoothScroll(event);
    }
    function smoothScroll(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute("href") === "#" ? "header" : event.currentTarget.getAttribute("href");
        const targetPosition = document.querySelector(targetId).offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;
        window.requestAnimationFrame(step);

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
            if (progress < duration) window.requestAnimationFrame(step);
        }
    }

    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    };

}