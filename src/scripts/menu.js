
export default function menu() {
    let togglMenu = document.querySelector("#toggle-menu");
    let menu = document.querySelector(".menu");

    togglMenu.addEventListener("click", function (e) {
        e.preventDefault();
        this.classList.toggle("active");
        menu.classList.toggle("active");
        document.querySelector("body").classList.add("no-scroll")

    });
} 