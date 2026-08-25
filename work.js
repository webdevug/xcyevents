/* =========================================================
   XCY EVENTS
   VISUAL ARCHIVE
========================================================= */


/* =========================================================
   PHOTO DATABASE
=========================================================

   ADD YOUR PHOTOS HERE.

   Every photo needs:

   file     = filename inside pics/
   title    = small title shown under/inside viewer
   category = category it belongs to

========================================================= */


const galleryData = [

    /* =====================================================
       WEDDINGS
    ===================================================== */

    {
        file: "wedding1.jpg",
        title: "Love wins.",
        category: "weddings"
    },

    {
        file: "intro1.jpg",
        title: "Love, simply.",
        category: "introductions"
    },

    {
        file: "intro2.jpg",
        title: "One heart. Two souls.",
        category: "introductions"
    },

    {
        file: "photoshoot1.jpg",
        title: "A little art. A lot of love.",
        category: "photoshoots"
    },

    {
        file: "port1.jpg",
        title: "In Presence Of Love",
        category: "portraits"
    },

    {
        file: "port2.jpg",
        title: "Smiles",
        category: "portraits"
    },

    {
        file: "wedding2.jpg",
        title: "Two Become One",
        category: "weddings"
    },

    {
        file: "wedding3.jpg",
        title: "Love, always.",
        category: "weddings"
    },

    {
        file: "wedding4.jpg",
        title: "Heart to heart.",
        category: "weddings"
    },

    {
        file: "wedding5.jpg",
        title: "Forever",
        category: "weddings"
    },

    {
        file: "wedding6.jpg",
        title: "Love lives here.",
        category: "weddings"
    },

    {
        file: "wedding7.jpg",
        title: "Together",
        category: "weddings"
    },

    {
        file: "wedding9.jpg",
        title: "Love never fades.",
        category: "weddings"
    },

    {
        file: "dump1.jpg",
        title: "Sisterhood Love",
        category: "dump"
    }

];



/* =========================================================
   CATEGORY NAMES
========================================================= */

const categories = [

    {
        id: "all",
        label: "All"
    },

    {
        id: "weddings",
        label: "Weddings"
    },

    {
        id: "introductions",
        label: "Introductions"
    },

    {
        id: "portraits",
        label: "Portraits"
    },

    {
        id: "photoshoots",
        label: "Photoshoots"
    },

    {
        id: "events",
        label: "Events"
    },

    {
        id: "dump",
        label: "The Dump"
    }

];



/* =========================================================
   DOM ELEMENTS
========================================================= */

const gallery =
    document.getElementById("gallery");

const categoryFilter =
    document.getElementById("categoryFilter");

const photoCount =
    document.getElementById("photoCount");

const loadMoreButton =
    document.getElementById("loadMore");


/* =========================================================
   STATE
========================================================= */

let currentCategory = "all";

let visibleLimit = 18;

let filteredPhotos = [];

let lightboxIndex = 0;



/* =========================================================
   CATEGORY FILTER BUTTONS
========================================================= */

function createCategoryButtons() {

    categoryFilter.innerHTML = "";


    categories.forEach(category => {

        const button =
            document.createElement("button");


        button.className =
            "category-button";


        if (category.id === currentCategory) {

            button.classList.add("active");

        }


        button.textContent =
            category.label;


        button.dataset.category =
            category.id;


        button.addEventListener(
            "click",
            () => {

                changeCategory(
                    category.id
                );

            }
        );


        categoryFilter.appendChild(
            button
        );

    });

}



/* =========================================================
   CHANGE CATEGORY
========================================================= */

function changeCategory(category) {

    currentCategory = category;

    visibleLimit = 18;

    updateActiveCategory();

    filterPhotos();

    renderGallery();

}



/* =========================================================
   UPDATE ACTIVE BUTTON
========================================================= */

function updateActiveCategory() {

    document
        .querySelectorAll(".category-button")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.category ===
                currentCategory
            );

        });

}



/* =========================================================
   FILTER PHOTOS
========================================================= */

function filterPhotos() {

    if (currentCategory === "all") {

        filteredPhotos =
            [...galleryData];

    } else {

        filteredPhotos =
            galleryData.filter(photo => {

                return photo.category ===
                    currentCategory;

            });

    }


    updatePhotoCount();

}



/* =========================================================
   PHOTO COUNT
========================================================= */

function updatePhotoCount() {

    const count =
        filteredPhotos.length;


    photoCount.textContent =
        `${count} PHOTOGRAPH${count === 1 ? "" : "S"}`;

}



/* =========================================================
   CREATE GALLERY
========================================================= */

function renderGallery() {

    gallery.innerHTML = "";


    const photosToShow =
        filteredPhotos.slice(
            0,
            visibleLimit
        );


    photosToShow.forEach(
        (photo, index) => {

            const item =
                createGalleryItem(
                    photo,
                    index
                );


            gallery.appendChild(item);

        }
    );


    updateLoadMoreButton();


    observeGalleryItems();

}



/* =========================================================
   CREATE PHOTO ITEM
========================================================= */

function createGalleryItem(
    photo,
    index
) {

    const article =
        document.createElement("article");


    article.className =
        "gallery-item";


    /*
        Create different editorial
        layouts automatically.
    */

    const layouts = [

        "layout-large",

        "layout-small",

        "layout-medium",

        "layout-wide",

        "layout-tall",

        "layout-medium"

    ];


    const layout =
        layouts[index % layouts.length];


    article.classList.add(layout);


    article.dataset.index =
        index;


    article.innerHTML = `

        <div class="gallery-image">

            <img
                src="images/${photo.file}"
                alt="${photo.title}"
                loading="lazy"
            >

            <span class="gallery-number">
                ${String(index + 1).padStart(2, "0")}
            </span>


            <div class="gallery-hover">

                <span>
                    VIEW IMAGE ↗
                </span>

            </div>

        </div>


        <div class="gallery-info">

            <div class="gallery-info-left">

                <span class="gallery-category">
                    ${formatCategory(photo.category)}
                </span>

                <h3 class="gallery-title">
                    ${photo.title}
                </h3>

            </div>


            <span class="gallery-index">
                ${String(index + 1).padStart(2, "0")}
            </span>

        </div>

    `;


    article.addEventListener(
        "click",
        () => {

            openLightbox(index);

        }
    );


    return article;

}



/* =========================================================
   CATEGORY FORMATTER
========================================================= */

function formatCategory(category) {

    const found =
        categories.find(
            item => item.id === category
        );


    if (!found) {

        return category;

    }


    return found.label;

}



/* =========================================================
   LOAD MORE
========================================================= */

function updateLoadMoreButton() {

    if (
        visibleLimit >=
        filteredPhotos.length
    ) {

        loadMoreButton.classList.add(
            "hidden"
        );

    } else {

        loadMoreButton.classList.remove(
            "hidden"
        );

    }

}


loadMoreButton.addEventListener(
    "click",
    () => {

        visibleLimit += 12;

        renderGallery();

    }
);



/* =========================================================
   SCROLL REVEAL
========================================================= */

function observeGalleryItems() {

    const items =
        document.querySelectorAll(
            ".gallery-item"
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
                threshold: .08
            }

        );


    items.forEach(item => {

        observer.observe(item);

    });

}



/* =========================================================
   LIGHTBOX
========================================================= */

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxCategory =
    document.getElementById(
        "lightboxCategory"
    );

const lightboxTitle =
    document.getElementById(
        "lightboxTitle"
    );

const lightboxCounter =
    document.getElementById(
        "lightboxCounter"
    );

const lightboxClose =
    document.getElementById(
        "lightboxClose"
    );

const lightboxPrev =
    document.getElementById(
        "lightboxPrev"
    );

const lightboxNext =
    document.getElementById(
        "lightboxNext"
    );



/* =========================================================
   OPEN LIGHTBOX
========================================================= */

function openLightbox(index) {

    lightboxIndex = index;

    updateLightbox();


    lightbox.classList.add(
        "open"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "no-scroll"
    );

}



/* =========================================================
   UPDATE LIGHTBOX
========================================================= */

function updateLightbox() {

    const photo =
        filteredPhotos[lightboxIndex];


    if (!photo) return;


    lightboxImage.src =
        `images/${photo.file}`;


    lightboxImage.alt =
        photo.title;


    lightboxCategory.textContent =
        formatCategory(
            photo.category
        );


    lightboxTitle.textContent =
        photo.title;


    lightboxCounter.textContent =
        `${String(lightboxIndex + 1).padStart(2, "0")} / ${String(filteredPhotos.length).padStart(2, "0")}`;

}



/* =========================================================
   CLOSE LIGHTBOX
========================================================= */

function closeLightbox() {

    lightbox.classList.remove(
        "open"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "no-scroll"
    );

}


lightboxClose.addEventListener(
    "click",
    closeLightbox
);



/* =========================================================
   NEXT
========================================================= */

function nextImage() {

    if (
        lightboxIndex <
        filteredPhotos.length - 1
    ) {

        lightboxIndex++;

    } else {

        lightboxIndex = 0;

    }


    updateLightbox();

}



/* =========================================================
   PREVIOUS
========================================================= */

function previousImage() {

    if (lightboxIndex > 0) {

        lightboxIndex--;

    } else {

        lightboxIndex =
            filteredPhotos.length - 1;

    }


    updateLightbox();

}


lightboxNext.addEventListener(
    "click",
    nextImage
);


lightboxPrev.addEventListener(
    "click",
    previousImage
);



/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox.classList.contains(
                "open"
            )
        ) {

            return;

        }


        if (event.key === "Escape") {

            closeLightbox();

        }


        if (event.key === "ArrowRight") {

            nextImage();

        }


        if (event.key === "ArrowLeft") {

            previousImage();

        }

    }
);



/* =========================================================
   CLICK BACKDROP TO CLOSE
========================================================= */

lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            lightbox
        ) {

            closeLightbox();

        }

    }
);



/* =========================================================
   MOBILE SWIPE
========================================================= */

let touchStartX = 0;

let touchEndX = 0;


lightbox.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    {
        passive: true
    }
);


lightbox.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0].screenX;


        const distance =
            touchEndX - touchStartX;


        if (Math.abs(distance) < 50) {

            return;

        }


        if (distance < 0) {

            nextImage();

        } else {

            previousImage();

        }

    },
    {
        passive: true
    }
);



/* =========================================================
   MENU
========================================================= */

const menuButton =
    document.getElementById(
        "menuButton"
    );

const menuPanel =
    document.getElementById(
        "menuPanel"
    );

const closeMenu =
    document.getElementById(
        "closeMenu"
    );


menuButton.addEventListener(
    "click",
    () => {

        menuPanel.classList.add(
            "open"
        );

        document.body.classList.add(
            "no-scroll"
        );

    }
);


closeMenu.addEventListener(
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


document
    .querySelectorAll(
        ".menu-panel nav a"
    )
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
   INITIALIZE
========================================================= */

createCategoryButtons();

filterPhotos();

renderGallery();