/* =====================================================
   XCY EVENTS
   CONTACT PAGE JAVASCRIPT
===================================================== */


/* =====================================================
   MENU
===================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const menuOverlay =
    document.getElementById("menuOverlay");

const menuClose =
    document.getElementById("menuClose");


if (menuToggle && menuOverlay) {

    menuToggle.addEventListener("click", () => {

        menuOverlay.classList.add("open");

        document.body.classList.add("menu-open");

    });

}


if (menuClose && menuOverlay) {

    menuClose.addEventListener("click", () => {

        menuOverlay.classList.remove("open");

        document.body.classList.remove("menu-open");

    });

}


/* Close menu when clicking a link */

document
    .querySelectorAll(".fullscreen-nav a")
    .forEach(link => {

        link.addEventListener("click", () => {

            menuOverlay.classList.remove("open");

            document.body.classList.remove("menu-open");

        });

    });



/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        menuOverlay.classList.remove("open");

        document.body.classList.remove("menu-open");

    }

});



/* =====================================================
   FORM
===================================================== */

const projectForm =
    document.getElementById("projectForm");

const formSuccess =
    document.getElementById("formSuccess");


if (projectForm) {

    projectForm.addEventListener("submit", event => {

        event.preventDefault();


        const button =
            projectForm.querySelector(
                "button[type='submit']"
            );


        const buttonText =
            button.querySelector("span");


        button.disabled = true;

        buttonText.textContent = "SENDING...";


        setTimeout(() => {

            projectForm.style.display = "none";

            formSuccess.classList.add("active");


            formSuccess.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


        }, 1200);

    });

}



/* =====================================================
   DATE
===================================================== */

const eventDate =
    document.getElementById("eventDate");


if (eventDate) {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    eventDate.min = today;

}



/* =====================================================
   HERO PARALLAX
===================================================== */

const heroImage =
    document.querySelector(
        ".hero-background img"
    );


window.addEventListener(
    "scroll",
    () => {

        if (!heroImage) return;


        const scroll =
            window.scrollY;


        if (scroll < window.innerHeight) {

            heroImage.style.transform =
                `translateY(${scroll * 0.08}px) scale(1.02)`;

        }

    },
    {
        passive: true
    }
);



/* =====================================================
   REVEAL ANIMATIONS
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".contact-introduction, .project-section, .direct-contact, .location-section, .final-contact"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.08
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =====================================================
   FINAL CTA
===================================================== */

document
    .querySelectorAll('a[href="#projectForm"]')
    .forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();


            const form =
                document.getElementById(
                    "projectForm"
                );


            if (form) {

                form.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });