/* =========================================================
   XCY EVENTS — ABOUT
   MENU + SCROLL REVEALS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;

    const menuButton =
        document.getElementById("menuButton");

    const closeMenu =
        document.getElementById("closeMenu");

    const menuPanel =
        document.getElementById("menuPanel");

    const menuLinks =
        document.querySelectorAll(".menu-panel nav a");


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefersReducedMotion) {
        body.classList.add("reduce-motion");
    }


    /* =====================================================
       MENU
    ===================================================== */

    const openMenu = () => {

        if (!menuPanel) return;

        menuPanel.classList.add("open");

        body.classList.add("menu-open");

        menuPanel.setAttribute(
            "aria-hidden",
            "false"
        );

        menuButton?.setAttribute(
            "aria-expanded",
            "true"
        );

    };


    const closeMenuPanel = () => {

        if (!menuPanel) return;

        menuPanel.classList.remove("open");

        body.classList.remove("menu-open");

        menuPanel.setAttribute(
            "aria-hidden",
            "true"
        );

        menuButton?.setAttribute(
            "aria-expanded",
            "false"
        );

    };


    menuButton?.addEventListener(
        "click",
        openMenu
    );


    closeMenu?.addEventListener(
        "click",
        closeMenuPanel
    );


    menuLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMenuPanel
        );

    });


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeMenuPanel();
            }

        }
    );


    /* =====================================================
       SCROLL REVEALS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".scroll-reveal"
        );


    const imageRevealElements =
        document.querySelectorAll(
            ".image-scroll-reveal"
        );


    if (
        "IntersectionObserver" in window &&
        !prefersReducedMotion
    ) {


        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        entry.target.classList.add(
                            "is-visible"
                        );


                        revealObserver.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -60px 0px"
                }
            );


        revealElements.forEach(
            (element, index) => {

                element.style.setProperty(
                    "--reveal-delay",
                    `${Math.min(index % 5, 4) * 70}ms`
                );

                revealObserver.observe(element);

            }
        );


        const imageObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        entry.target.classList.add(
                            "image-visible"
                        );


                        imageObserver.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.1,
                    rootMargin: "0px 0px -50px 0px"
                }
            );


        imageRevealElements.forEach(
            element => {

                imageObserver.observe(element);

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "is-visible"
                );

            }
        );


        imageRevealElements.forEach(
            element => {

                element.classList.add(
                    "image-visible"
                );

            }
        );

    }


    /* =====================================================
       IMAGE LOADING
    ===================================================== */

    document
        .querySelectorAll("img[loading='lazy']")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    image.style.opacity = "0";

                },
                {
                    once: true
                }
            );

        });


    /* =====================================================
       ESCAPE SCROLL LOCK SAFETY
    ===================================================== */

    window.addEventListener(
        "pageshow",
        () => {

            body.classList.remove(
                "menu-open"
            );

            menuPanel?.classList.remove(
                "open"
            );

        }
    );


});