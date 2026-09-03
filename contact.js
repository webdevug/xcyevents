/* =========================================================
   XCY EVENTS — CONTACT
   MASTER INTERACTION SYSTEM
========================================================= */


/* =========================================================
   MENU
========================================================= */

const menuButton = document.getElementById("menuButton");
const menuPanel = document.getElementById("menuPanel");
const menuClose = document.getElementById("menuClose");



function openMenu() {

    menuPanel.classList.add("open");

    document.body.classList.add("menu-open");

    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );

    menuPanel.setAttribute(
        "aria-hidden",
        "false"
    );

}



function closeMenu() {

    menuPanel.classList.remove("open");

    document.body.classList.remove("menu-open");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    menuPanel.setAttribute(
        "aria-hidden",
        "true"
    );

}



menuButton?.addEventListener(
    "click",
    openMenu
);



menuClose?.addEventListener(
    "click",
    closeMenu
);



/* =========================================================
   CLOSE MENU — NAVIGATION
========================================================= */

document
    .querySelectorAll(".menu-nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });



/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            menuPanel.classList.contains("open")
        ) {

            closeMenu();

        }

    }
);



/* =========================================================
   SCROLL REVEALS
   SAME SYSTEM AS INDEX
========================================================= */

const scrollElements =
    document.querySelectorAll(
        ".scroll-reveal"
    );



const imageElements =
    document.querySelectorAll(
        ".image-scroll-reveal"
    );



const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );



if (prefersReducedMotion.matches) {

    document.body.classList.add(
        "reduce-motion"
    );

}



/* =========================================================
   TEXT REVEAL OBSERVER
========================================================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "is-visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );



scrollElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);



/* =========================================================
   IMAGE REVEAL OBSERVER
========================================================= */

const imageObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "image-visible"
                    );

                    imageObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.08
        }
    );



imageElements.forEach(
    element => {

        imageObserver.observe(
            element
        );

    }
);



/* =========================================================
   STAGGER CONTACT ITEMS
========================================================= */

document
    .querySelectorAll(".contact-item")
    .forEach(
        (item, index) => {

            item.style.setProperty(
                "--reveal-delay",
                `${index * 100}ms`
            );

        }
    );



/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );

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

                target.scrollIntoView({
                    behavior: prefersReducedMotion.matches
                        ? "auto"
                        : "smooth"
                });

            }
        );

    });



/* =========================================================
   HERO PARALLAX
========================================================= */

const heroImage =
    document.querySelector(
        ".hero-background img"
    );



if (
    heroImage &&
    !prefersReducedMotion.matches
) {

    let ticking = false;


    window.addEventListener(
        "scroll",
        () => {

            if (ticking) {
                return;
            }


            window.requestAnimationFrame(
                () => {

                    const scrollY =
                        window.scrollY;


                    if (
                        scrollY <=
                        window.innerHeight
                    ) {

                        heroImage.style.transform =
                            `scale(1.04) translateY(${scrollY * 0.06}px)`;

                    }


                    ticking = false;

                }
            );


            ticking = true;

        },
        {
            passive: true
        }
    );

}



/* =========================================================
   REDUCED MOTION LIVE CHANGE
========================================================= */

prefersReducedMotion.addEventListener(
    "change",
    event => {

        if (event.matches) {

            document.body.classList.add(
                "reduce-motion"
            );

        } else {

            document.body.classList.remove(
                "reduce-motion"
            );

        }

    }
);



/* =========================================================
   CONTACT ITEM HOVER
========================================================= */

document
    .querySelectorAll(".contact-item")
    .forEach(item => {

        item.addEventListener(
            "mouseenter",
            () => {

                item.style.zIndex = "2";

            }
        );


        item.addEventListener(
            "mouseleave",
            () => {

                item.style.zIndex = "";

            }
        );

    });



/* =========================================================
   PAGE READY
========================================================= */

document.documentElement.classList.add(
    "page-ready"
);