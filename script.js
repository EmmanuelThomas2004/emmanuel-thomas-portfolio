/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });


    // Close menu after clicking a navigation link

    navMenu.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });

    });


    // Close menu when clicking outside

    document.addEventListener("click", (event) => {

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            navMenu.classList.remove("active");
        }

    });


    // Close menu when pressing Escape

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            navMenu.classList.remove("active");
        }

    });


    // Reset mobile menu when resizing

    window.addEventListener("resize", () => {

        if (window.innerWidth > 760) {
            navMenu.classList.remove("active");
        }

    });

}


/* =========================================================
   THEME TOGGLE
========================================================= */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {

    document.body.classList.add("light-theme");

}


function updateThemeIcon() {

    if (!themeToggle) {
        return;
    }

    if (document.body.classList.contains("light-theme")) {

        themeToggle.textContent = "☀";

    } else {

        themeToggle.textContent = "☾";

    }

}


updateThemeIcon();


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const isLight =
            document.body.classList.contains("light-theme");

        localStorage.setItem(
            "portfolio-theme",
            isLight ? "light" : "dark"
        );

        updateThemeIcon();

    });

}


/* =========================================================
   NAVBAR SHADOW ON SCROLL
========================================================= */

const navbar = document.querySelector(".navbar");

function updateNavbar() {

    if (!navbar) {
        return;
    }

    if (window.scrollY > 10) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", updateNavbar);

updateNavbar();


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        const navbarHeight =
            navbar ? navbar.offsetHeight : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight -
            15;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* =========================================================
   IMAGE ERROR DETECTION
========================================================= */

document.querySelectorAll("img").forEach((image) => {

    image.addEventListener("error", () => {

        console.warn(
            "Image could not be loaded:",
            image.getAttribute("src")
        );

    });

});


/* =========================================================
   PAGE LOAD RESET
========================================================= */

window.addEventListener("pageshow", () => {

    if (navMenu) {
        navMenu.classList.remove("active");
    }

});