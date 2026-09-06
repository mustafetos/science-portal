document.addEventListener("DOMContentLoaded", () => {

    /* ========================================
       HEADER ELEMENTS
    ======================================== */

    const header = document.querySelector(".header");

    const menuToggle = document.querySelector(".menu-toggle");

    const mobileMenu = document.querySelector(".mobile-menu");

    const navLinks = document.querySelectorAll(".nav-link");

    const headerButtons = document.querySelector(".header-buttons");


    /* ========================================
       MOBILE MENU
    ======================================== */

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");

            mobileMenu.classList.toggle("active");

            document.body.classList.toggle("menu-open");

        });

    }


    /* ========================================
       CLOSE MOBILE MENU WHEN CLICKING A LINK
    ======================================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (mobileMenu) {

                mobileMenu.classList.remove("active");

            }

            if (menuToggle) {

                menuToggle.classList.remove("active");

            }

            document.body.classList.remove("menu-open");

        });

    });


    /* ========================================
       HEADER SCROLL EFFECT
    ======================================== */

    window.addEventListener("scroll", () => {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });


    /* ========================================
       SMOOTH SCROLL FOR INTERNAL LINKS
    ======================================== */

    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetSection = document.querySelector(targetId);

            if (targetSection) {

                event.preventDefault();

                const headerHeight =
                    header ? header.offsetHeight : 0;

                const targetPosition =
                    targetSection.offsetTop - headerHeight;

                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }

        });

    });


    /* ========================================
       ACTIVE NAVIGATION LINK
    ======================================== */

    const sections = document.querySelectorAll("section[id]");

    function updateActiveLink() {

        const scrollPosition =
            window.scrollY + 150;

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            const sectionId =
                section.getAttribute("id");

            if (

                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight

            ) {

                navLinks.forEach((link) => {

                    link.classList.remove("active");

                    if (

                        link.getAttribute("href") ===
                        `#${sectionId}`

                    ) {

                        link.classList.add("active");

                    }

                });

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveLink
    );


    /* ========================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ======================================== */

    document.addEventListener("click", (event) => {

        if (

            !menuToggle ||
            !mobileMenu

        ) return;

        const clickedInsideMenu =
            mobileMenu.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);

        if (

            !clickedInsideMenu &&
            !clickedMenuButton

        ) {

            mobileMenu.classList.remove("active");

            menuToggle.classList.remove("active");

            document.body.classList.remove("menu-open");

        }

    });


    /* ========================================
       INITIAL PAGE STATE
    ======================================== */

    updateActiveLink();

});
