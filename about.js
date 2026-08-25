/* =========================================================
   XCY EVENTS
   ABOUT PAGE
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
   SCROLL REVEALS
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".statement-content p, .founder-copy, .philosophy-item, .expertise-content, .credential-row, .about-closing h2"
    );


const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: .12
        }

    );


revealElements.forEach(
    element => {

        observer.observe(element);

    }
);



/* =========================================================
   IMAGE PARALLAX
========================================================= */

const images =
    document.querySelectorAll(
        ".founder-image img, .africa-image img"
    );


window.addEventListener(
    "scroll",
    () => {

        const scrollY =
            window.scrollY;


        images.forEach(image => {

            const rect =
                image.getBoundingClientRect();


            if (
                rect.top < window.innerHeight &&
                rect.bottom > 0
            ) {

                const movement =
                    (window.innerHeight / 2 -
                    (rect.top + rect.height / 2))
                    * .04;


                image.style.transform =
                    `translateY(${movement}px)`;

            }

        });

    },
    {
        passive: true
    }
);