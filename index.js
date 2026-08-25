/* =========================================================
   XCY EVENTS
   EDITORIAL INTERACTIONS
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


menuButton.addEventListener("click", () => {

    menuPanel.classList.add("open");

    document.body.style.overflow = "hidden";

});


closeMenu.addEventListener("click", () => {

    menuPanel.classList.remove("open");

    document.body.style.overflow = "";

});


/* Close menu when clicking links */

document.querySelectorAll(".menu-panel nav a")
    .forEach(link => {

        link.addEventListener("click", () => {

            menuPanel.classList.remove("open");

            document.body.style.overflow = "";

        });

    });


/* Escape */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        menuPanel.classList.remove("open");

        document.body.style.overflow = "";

    }

});


/* =========================================================
   HERO IMAGE PARALLAX
========================================================= */

const heroImage =
    document.querySelector(".hero-image img");


window.addEventListener("scroll", () => {

    if (!heroImage) return;

    if (window.innerWidth < 800) return;

    const scroll =
        window.scrollY;

    heroImage.style.transform =
        `translateY(${scroll * 0.08}px) scale(1.02)`;

});


/* =========================================================
   IMAGE REVEAL
========================================================= */

const images =
    document.querySelectorAll(
        ".editorial-image img, .work-image img, .discipline-image img"
    );


const imageObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    imageObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


images.forEach(image => {

    image.style.opacity = "0";

    image.style.transition =
        "opacity 1s cubic-bezier(.22,1,.36,1)";

    imageObserver.observe(image);

});


/* =========================================================
   SIMPLE TEXT REVEAL
========================================================= */

const textElements =
    document.querySelectorAll(
        ".intro-main h2, .work-heading h2, .philosophy-content h2"
    );


const textObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    textObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


textElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(40px)";

    element.style.transition =
        "opacity 1s cubic-bezier(.22,1,.36,1), transform 1s cubic-bezier(.22,1,.36,1)";

    textObserver.observe(element);

});


/* =========================================================
   VIDEO
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

    playButton.addEventListener("click", () => {

        videoModal.classList.add("open");

        document.body.style.overflow = "hidden";

        if (video) {

            video.play().catch(() => {});

        }

    });

}


if (closeVideo) {

    closeVideo.addEventListener("click", closeVideoModal);

}


function closeVideoModal() {

    videoModal.classList.remove("open");

    document.body.style.overflow = "";

    if (video) {

        video.pause();

        video.currentTime = 0;

    }

}


if (videoModal) {

    videoModal.addEventListener("click", event => {

        if (event.target === videoModal) {

            closeVideoModal();

        }

    });

}


/* =========================================================
   IMAGE HOVER MOVEMENT
========================================================= */

document.querySelectorAll(".work-card")
    .forEach(card => {

        const image =
            card.querySelector("img");

        if (!image) return;


        card.addEventListener("mousemove", event => {

            const rect =
                card.getBoundingClientRect();

            const x =
                ((event.clientX - rect.left)
                / rect.width - .5) * 8;

            const y =
                ((event.clientY - rect.top)
                / rect.height - .5) * 8;


            image.style.transform =
                `scale(1.04) translate(${x}px, ${y}px)`;

        });


        card.addEventListener("mouseleave", () => {

            image.style.transform =
                "scale(1) translate(0,0)";

        });

    });