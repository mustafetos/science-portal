document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       GET WEBSITE ELEMENTS
    ========================================= */

    const header = document.querySelector(".header");

    const navbar = document.querySelector(".navbar");

    const menuButton = document.querySelector("#menuButton");

    const navLinks = document.querySelector(".nav-links");

    const allNavLinks = document.querySelectorAll(".nav-link");

    const body = document.body;



    /* =========================================
       MOBILE MENU
    ========================================= */

    if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {

            menuButton.classList.toggle("active");

            navLinks.classList.toggle("mobile-active");

            body.classList.toggle("menu-open");


            /* Update Accessibility */

            const isOpen =
                menuButton.classList.contains("active");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen
            );

        });

    }



    /* =========================================
       CLOSE MOBILE MENU
       WHEN CLICKING A NAVIGATION LINK
    ========================================= */

    allNavLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (menuButton) {

                menuButton.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }


            if (navLinks) {

                navLinks.classList.remove(
                    "mobile-active"
                );

            }


            body.classList.remove(
                "menu-open"
            );

        });

    });



    /* =========================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ========================================= */

    document.addEventListener("click", (event) => {

        if (!menuButton || !navLinks) {

            return;

        }


        const clickedInsideMenu =
            navLinks.contains(event.target);

        const clickedMenuButton =
            menuButton.contains(event.target);


        if (

            !clickedInsideMenu &&
            !clickedMenuButton &&
            navLinks.classList.contains(
                "mobile-active"
            )

        ) {

            navLinks.classList.remove(
                "mobile-active"
            );

            menuButton.classList.remove(
                "active"
            );

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            body.classList.remove(
                "menu-open"
            );

        }

    });



    /* =========================================
       CLOSE MOBILE MENU
       WHEN SCREEN BECOMES DESKTOP
    ========================================= */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            if (menuButton) {

                menuButton.classList.remove(
                    "active"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }


            if (navLinks) {

                navLinks.classList.remove(
                    "mobile-active"
                );

            }


            body.classList.remove(
                "menu-open"
            );

        }

    });



    /* =========================================
       NAVBAR SCROLL EFFECT
    ========================================= */

    function updateNavbar() {

        if (!navbar) {

            return;

        }


        if (window.scrollY > 50) {

            navbar.classList.add(
                "navbar-scrolled"
            );

        } else {

            navbar.classList.remove(
                "navbar-scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar
    );


    updateNavbar();



    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (

                    !targetId ||
                    targetId === "#"

                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;


                const targetPosition =

                    target.getBoundingClientRect().top +

                    window.scrollY -

                    navbarHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }

        );

    });



    /* =========================================
       ACTIVE NAVIGATION LINK
    ========================================= */

    const sections =
        document.querySelectorAll(
            "section[id], header[id]"
        );


    function updateActiveNavigation() {

        const scrollPosition =

            window.scrollY +

            150;


        let currentSection = "home";


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

                currentSection =
                    sectionId;

            }

        });


        allNavLinks.forEach((link) => {

            link.classList.remove(
                "active"
            );


            if (

                link.getAttribute("href") ===

                `#${currentSection}`

            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    updateActiveNavigation();



    /* =========================================
       ESCAPE KEY
       CLOSE MOBILE MENU
    ========================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                if (menuButton) {

                    menuButton.classList.remove(
                        "active"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }


                if (navLinks) {

                    navLinks.classList.remove(
                        "mobile-active"
                    );

                }


                body.classList.remove(
                    "menu-open"
                );

            }

        }

    );



    /* =========================================
       HEADER READY STATE
    ========================================= */

    if (header) {

        header.classList.add(
            "header-ready"
        );

    }

});
