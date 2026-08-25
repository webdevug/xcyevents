/* =========================================================
   XCY EVENTS
   SERVICES JAVASCRIPT
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


menuButton.addEventListener(
    "click",
    () => {

        menuPanel.classList.add("open");

        document.body.classList.add(
            "no-scroll"
        );

    }
);


closeMenu.addEventListener(
    "click",
    () => {

        menuPanel.classList.remove("open");

        document.body.classList.remove(
            "no-scroll"
        );

    }
);



document
    .querySelectorAll(".menu-panel nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                menuPanel.classList.remove(
                    "open"
                );

                document.body.classList.remove(
                    "no-scroll"
                );

            }
        );

    });



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

            /*
                The image is intentionally
                subtle so the typography
                remains dominant.
            */

            item.style.setProperty(
                "--service-image",
                `url("${image}")`
            );

        }
    );

});



/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".services-intro, .service-item, .process-item, .custom-project"
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
            threshold: .12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});