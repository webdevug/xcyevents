/* =========================================================
   XCY EVENTS
   CORPORATE HOMEPAGE INTERACTIONS
   SCROLL REVEAL SYSTEM
========================================================= */


/* =========================================================
   MENU
========================================================= */

const menuButton =
    document.getElementById("menuButton");

const menuPanel =
    document.getElementById("menuPanel");

const closeMenu =
    document.getElementById("closeMenu");


function openMenu() {

    if (!menuPanel) return;

    menuPanel.classList.add("open");

    document.body.classList.add("menu-open");

    if (menuButton) {
        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );
    }

}


function closeNavigation() {

    if (!menuPanel) return;

    menuPanel.classList.remove("open");

    document.body.classList.remove("menu-open");

    if (menuButton) {
        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );
    }

}


if (menuButton) {

    menuButton.addEventListener(
        "click",
        openMenu
    );

}


if (closeMenu) {

    closeMenu.addEventListener(
        "click",
        closeNavigation
    );

}


/* Close menu when clicking links */

document
    .querySelectorAll(".menu-panel nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            closeNavigation
        );

    });


/* Escape key */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeNavigation();

            closeVideoModal();

        }

    }
);



/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        `
        .section-label,
        .intro-main h2,
        .intro-footer,
        .editorial-caption,
        .editorial-image,
        .editorial-footer,
        .work-heading,
        .work-card,
        .work-footer,
        .discipline-intro,
        .discipline-number,
        .discipline-image,
        .discipline-content,
        .philosophy-top,
        .philosophy-content,
        .final-content,
        .footer-brand,
        .footer-columns,
        .footer-bottom
        `
    );


/* Add initial state */

revealElements.forEach(
    (element, index) => {

        element.classList.add(
            "scroll-reveal"
        );

        /*
         * Every element gets a tiny stagger.
         * This keeps the movement elegant
         * instead of making everything appear
         * at exactly the same time.
         */

        element.style.setProperty(
            "--reveal-delay",
            `${Math.min(index % 5, 4) * 70}ms`
        );

    }
);


/* Intersection Observer */

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

            rootMargin:
                "0px 0px -60px 0px"

        }

    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);



/* =========================================================
   HERO ENTRANCE
========================================================= */

const heroElements =
    document.querySelectorAll(
        `
        .hero-top,
        .hero-label,
        .hero h1,
        .hero-description,
        .hero-bottom
        `
    );


heroElements.forEach(
    (element, index) => {

        element.classList.add(
            "hero-reveal"
        );

        element.style.setProperty(
            "--hero-delay",
            `${250 + index * 140}ms`
        );

    }
);


/* =========================================================
   HERO PARALLAX
========================================================= */

const heroImage =
    document.querySelector(
        ".hero-background img"
    );


let ticking = false;


function updateHeroParallax() {

    if (
        !heroImage ||
        window.innerWidth < 800
    ) {

        ticking = false;

        return;

    }


    const scroll =
        window.scrollY;


    if (
        scroll <
        window.innerHeight
    ) {

        heroImage.style.transform =
            `translateY(${scroll * 0.045}px) scale(1.02)`;

    }


    ticking = false;

}


window.addEventListener(
    "scroll",
    () => {

        if (!ticking) {

            window.requestAnimationFrame(
                updateHeroParallax
            );

            ticking = true;

        }

    },
    {
        passive: true
    }
);



/* =========================================================
   IMAGE REVEAL
========================================================= */

const revealImages =
    document.querySelectorAll(
        `
        .editorial-image img,
        .work-image img,
        .discipline-image img
        `
    );


revealImages.forEach(
    image => {

        image.classList.add(
            "image-scroll-reveal"
        );

    }
);


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
            threshold: 0.15,

            rootMargin:
                "0px 0px -50px 0px"

        }

    );


revealImages.forEach(
    image => {

        imageObserver.observe(
            image
        );

    }
);



/* =========================================================
   WORK IMAGE MOVEMENT
========================================================= */

document
    .querySelectorAll(".work-card")
    .forEach(card => {

        const image =
            card.querySelector("img");

        if (!image) return;


        card.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth < 800
                ) return;


                const rect =
                    card.getBoundingClientRect();


                const x =
                    (
                        (
                            event.clientX -
                            rect.left
                        )
                        /
                        rect.width
                        - .5
                    ) * 4;


                const y =
                    (
                        (
                            event.clientY -
                            rect.top
                        )
                        /
                        rect.height
                        - .5
                    ) * 4;


                image.style.transform =
                    `scale(1.035) translate(${x}px, ${y}px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                image.style.transform =
                    "scale(1) translate(0,0)";

            }
        );

    });



/* =========================================================
   VIDEO MODAL
========================================================= */

const playButton =
    document.getElementById("playButton");

const videoModal =
    document.getElementById("videoModal");

const closeVideo =
    document.getElementById("closeVideo");

const video =
    document.getElementById("showreel");


if (playButton) {

    playButton.addEventListener(
        "click",
        () => {

            if (!videoModal) return;

            videoModal.classList.add(
                "open"
            );

            document.body.classList.add(
                "menu-open"
            );


            if (video) {

                video
                    .play()
                    .catch(() => {});

            }

        }
    );

}


if (closeVideo) {

    closeVideo.addEventListener(
        "click",
        closeVideoModal
    );

}


function closeVideoModal() {

    if (!videoModal) return;


    videoModal.classList.remove(
        "open"
    );


    document.body.classList.remove(
        "menu-open"
    );


    if (video) {

        video.pause();

        video.currentTime = 0;

    }

}


if (videoModal) {

    videoModal.addEventListener(
        "click",
        event => {

            if (
                event.target === videoModal
            ) {

                closeVideoModal();

            }

        }
    );

}



/* =========================================================
   REDUCED MOTION
========================================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (
    prefersReducedMotion.matches
) {

    document.documentElement.classList.add(
        "reduce-motion"
    );

}