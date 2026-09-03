/* =========================================================
   XCY EVENTS
   SERVICES JAVASCRIPT
   INDEX-MATCHED SYSTEM
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const menuButton = document.getElementById("menuButton");
const menuPanel = document.getElementById("menuPanel");
const closeMenu = document.getElementById("closeMenu");



/* =========================================================
   MENU
========================================================= */

function openMenu() {

    if (!menuPanel) return;

    menuPanel.classList.add("open");

    document.body.classList.add("menu-open");

    menuButton?.setAttribute(
        "aria-expanded",
        "true"
    );

    menuPanel.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeMenuPanel() {

    if (!menuPanel) return;

    menuPanel.classList.remove("open");

    document.body.classList.remove("menu-open");

    menuButton?.setAttribute(
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


closeMenu?.addEventListener(
    "click",
    closeMenuPanel
);



/* CLOSE MENU WHEN NAVIGATION LINK IS CLICKED */

document
    .querySelectorAll(".menu-panel nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMenuPanel
        );

    });



/* ESCAPE KEY */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            menuPanel?.classList.contains("open")
        ) {

            closeMenuPanel();

        }

    }
);



/* =========================================================
   SERVICE HOVER IMAGE
========================================================= */

const serviceItems =
    document.querySelectorAll(
        ".service-item"
    );


serviceItems.forEach(item => {

    const image =
        item.dataset.image;


    if (!image) return;


    item.addEventListener(
        "mouseenter",
        () => {

            item.style.setProperty(
                "--service-image",
                `url("${image}")`
            );

        }
    );


    item.addEventListener(
        "touchstart",
        () => {

            item.style.setProperty(
                "--service-image",
                `url("${image}")`
            );

        },
        {
            passive: true
        }
    );

});



/* =========================================================
   SCROLL REVEAL
   SAME SYSTEM AS INDEX
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".scroll-reveal"
    );


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "revealed"
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


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);



/* =========================================================
   REDUCED MOTION
========================================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


function handleReducedMotion() {

    if (
        prefersReducedMotion.matches
    ) {

        document.body.classList.add(
            "reduce-motion"
        );

    } else {

        document.body.classList.remove(
            "reduce-motion"
        );

    }

}


handleReducedMotion();


prefersReducedMotion.addEventListener?.(
    "change",
    handleReducedMotion
);



/* =========================================================
   SERVICE ROW KEYBOARD SUPPORT
========================================================= */

serviceItems.forEach(item => {

    item.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                item.classList.add(
                    "keyboard-active"
                );

                setTimeout(
                    () => {

                        item.classList.remove(
                            "keyboard-active"
                        );

                    },
                    500
                );

            }

        }
    );

});