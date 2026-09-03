/* =========================================================
   XCY EVENTS
   CORPORATE GALLERY SYSTEM
========================================================= */


/* =========================================================
   PHOTO DATABASE
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


    /* =====================================================
       INTRODUCTIONS
    ===================================================== */

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


    /* =====================================================
       PHOTOSHOOTS
    ===================================================== */

    {
        file: "photoshoot1.jpg",
        title: "A little art. A lot of love.",
        category: "photoshoots"
    },


    /* =====================================================
       PORTRAITS
    ===================================================== */

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


    /* =====================================================
       THE DUMP
    ===================================================== */

    {
        file: "dump1.jpg",
        title: "Sisterhood Love",
        category: "dump"
    }

];



/* =========================================================
   CATEGORY DATABASE
========================================================= */

const categories = [

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
   SETTINGS
========================================================= */

const PHOTOS_PER_BATCH = 4;

const DEFAULT_GALLERY_COVER =
    "images/xcylogo.png";



/* =========================================================
   STATE
========================================================= */

const categoryState = {};

categories.forEach(category => {

    categoryState[category.id] =
        PHOTOS_PER_BATCH;

});


let activeCategory = null;

let lightboxPhotos = [];

let lightboxIndex = 0;

let selectedWedding = null;



/* =========================================================
   DOM
========================================================= */

const categoryNavigation =
    document.getElementById(
        "categoryNavigation"
    );


const categoryGalleries =
    document.getElementById(
        "categoryGalleries"
    );


const totalPhotoCount =
    document.getElementById(
        "totalPhotoCount"
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


function openMenu() {

    if (!menuPanel) return;

    menuPanel.classList.add("open");

    document.body.classList.add(
        "menu-open"
    );

    menuButton?.setAttribute(
        "aria-expanded",
        "true"
    );

}


function closeNavigation() {

    if (!menuPanel) return;

    menuPanel.classList.remove("open");

    document.body.classList.remove(
        "menu-open"
    );

    menuButton?.setAttribute(
        "aria-expanded",
        "false"
    );

}


menuButton?.addEventListener(
    "click",
    openMenu
);


closeMenu?.addEventListener(
    "click",
    closeNavigation
);


document
    .querySelectorAll(
        ".menu-panel nav a"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            closeNavigation
        );

    });



/* =========================================================
   TOTAL PHOTO COUNT
========================================================= */

function updateTotalCount() {

    const total =
        galleryData.length;

    if (!totalPhotoCount) return;

    totalPhotoCount.textContent =
        `${total} PHOTOGRAPH${total === 1 ? "" : "S"}`;

}



/* =========================================================
   CREATE CATEGORY NAVIGATION
========================================================= */

function createCategoryNavigation() {

    if (!categoryNavigation) return;

    categoryNavigation.innerHTML = "";


    categories.forEach(
        category => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "category-nav-button";


            button.textContent =
                category.label;


            button.dataset.target =
                category.id;


            button.addEventListener(
                "click",
                () => {

                    scrollToCategory(
                        category.id
                    );

                }
            );


            categoryNavigation.appendChild(
                button
            );

        }
    );

}



/* =========================================================
   SCROLL TO CATEGORY
========================================================= */

function scrollToCategory(
    categoryId
) {

    const section =
        document.getElementById(
            `category-${categoryId}`
        );


    if (!section) return;


    const navigation =
        document.querySelector(
            ".gallery-navigation"
        );


    const offset =
        navigation
            ? navigation.offsetHeight + 25
            : 100;


    const top =
        section.getBoundingClientRect().top
        +
        window.scrollY
        -
        offset;


    window.scrollTo({

        top,

        behavior: "smooth"

    });

}



/* =========================================================
   RENDER ALL CATEGORY SECTIONS
========================================================= */

function renderCategories() {

    if (!categoryGalleries) return;

    categoryGalleries.innerHTML = "";


    categories.forEach(
        (category, categoryIndex) => {

            const photos =
                galleryData.filter(
                    photo =>
                        photo.category ===
                        category.id
                );


            const section =
                document.createElement(
                    "section"
                );


            section.className =
                "gallery-category reveal";


            section.id =
                `category-${category.id}`;


            section.dataset.category =
                category.id;


            section.innerHTML = `

                <div class="gallery-category-header">

                    <div class="gallery-category-title">

                        <small>
                            ${String(categoryIndex + 1).padStart(2, "0")}
                        </small>

                        <h2>
                            ${category.label}
                        </h2>

                    </div>

                    <span class="gallery-category-count">
                        ${photos.length}
                        PHOTOGRAPH${photos.length === 1 ? "" : "S"}
                    </span>

                </div>


                <div
                    class="category-grid"
                    data-grid="${category.id}"
                ></div>


                <div class="category-actions">

                    <button
                        class="view-more"
                        data-category="${category.id}"
                    >

                        <span>
                            VIEW MORE
                        </span>

                        <b>+</b>

                    </button>

                </div>

            `;


            categoryGalleries.appendChild(
                section
            );


            renderCategoryPhotos(
                category.id
            );


            const viewMore =
                section.querySelector(
                    ".view-more"
                );


            viewMore?.addEventListener(
                "click",
                () => {

                    showMorePhotos(
                        category.id
                    );

                }
            );


            if (
                photos.length <=
                PHOTOS_PER_BATCH
            ) {

                viewMore?.classList.add(
                    "hidden"
                );

            }

        }
    );


    setupRevealObserver();

}



/* =========================================================
   RENDER CATEGORY PHOTOS
========================================================= */

function renderCategoryPhotos(
    categoryId
) {

    const grid =
        document.querySelector(
            `[data-grid="${categoryId}"]`
        );


    if (!grid) return;


    const photos =
        galleryData.filter(
            photo =>
                photo.category ===
                categoryId
        );


    const limit =
        categoryState[categoryId];


    grid.innerHTML = "";


    photos
        .slice(0, limit)
        .forEach(
            (photo, index) => {

                const card =
                    createPhotoCard(
                        photo,
                        index,
                        categoryId
                    );


                grid.appendChild(card);

            }
        );


    const section =
        document.getElementById(
            `category-${categoryId}`
        );


    const button =
        section?.querySelector(
            ".view-more"
        );


    if (!button) return;


    if (
        limit >= photos.length
    ) {

        button.classList.add(
            "hidden"
        );

    } else {

        button.classList.remove(
            "hidden"
        );

    }


    setupRevealObserver();

}



/* =========================================================
   CREATE PHOTO CARD
========================================================= */

function createPhotoCard(
    photo,
    index,
    categoryId
) {

    const article =
        document.createElement(
            "article"
        );


    article.className =
        "gallery-card reveal";


    article.dataset.category =
        categoryId;


    article.dataset.index =
        index;


    article.innerHTML = `

        <div class="gallery-card-image">

            <img
                src="images/${photo.file}"
                alt="${escapeHTML(photo.title)}"
                loading="lazy"
            >


            <div class="gallery-card-overlay">

                <span>
                    VIEW IMAGE ↗
                </span>

            </div>

        </div>


        <div class="gallery-card-info">

            <div class="gallery-card-info-left">

                <span class="gallery-card-category">
                    ${formatCategory(photo.category)}
                </span>

                <h3 class="gallery-card-title">
                    ${escapeHTML(photo.title)}
                </h3>

            </div>


            <span class="gallery-card-number">

                ${String(index + 1).padStart(2, "0")}

            </span>

        </div>

    `;


    article.addEventListener(
        "click",
        () => {

            openLightbox(
                categoryId,
                index
            );

        }
    );


    return article;

}



/* =========================================================
   VIEW MORE
========================================================= */

function showMorePhotos(
    categoryId
) {

    categoryState[categoryId] +=
        PHOTOS_PER_BATCH;


    renderCategoryPhotos(
        categoryId
    );

}



/* =========================================================
   FORMAT CATEGORY
========================================================= */

function formatCategory(
    category
) {

    const found =
        categories.find(
            item =>
                item.id === category
        );


    return found
        ? found.label
        : category;

}



/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(
    value = ""
) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}



/* =========================================================
   LIGHTBOX ELEMENTS
========================================================= */

const lightbox =
    document.getElementById(
        "lightbox"
    );


const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );


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

function openLightbox(
    categoryId,
    index
) {

    if (!lightbox) return;


    lightboxPhotos =
        galleryData.filter(
            photo =>
                photo.category ===
                categoryId
        );


    lightboxIndex =
        index;


    updateLightbox();


    lightbox.classList.add(
        "open"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );

}



/* =========================================================
   UPDATE LIGHTBOX
========================================================= */

function updateLightbox() {

    const photo =
        lightboxPhotos[
            lightboxIndex
        ];


    if (!photo) return;


    if (lightboxImage) {

        lightboxImage.src =
            `images/${photo.file}`;


        lightboxImage.alt =
            photo.title;

    }


    if (lightboxCategory) {

        lightboxCategory.textContent =
            formatCategory(
                photo.category
            );

    }


    if (lightboxTitle) {

        lightboxTitle.textContent =
            photo.title;

    }


    if (lightboxCounter) {

        lightboxCounter.textContent =
            `${String(lightboxIndex + 1).padStart(2, "0")} / ${String(lightboxPhotos.length).padStart(2, "0")}`;

    }

}



/* =========================================================
   CLOSE LIGHTBOX
========================================================= */

function closeLightbox() {

    if (!lightbox) return;


    lightbox.classList.remove(
        "open"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


lightboxClose?.addEventListener(
    "click",
    closeLightbox
);



/* =========================================================
   NEXT
========================================================= */

function nextImage() {

    if (!lightboxPhotos.length)
        return;


    lightboxIndex =
        (
            lightboxIndex + 1
        )
        %
        lightboxPhotos.length;


    updateLightbox();

}



/* =========================================================
   PREVIOUS
========================================================= */

function previousImage() {

    if (!lightboxPhotos.length)
        return;


    lightboxIndex =
        (
            lightboxIndex - 1 +
            lightboxPhotos.length
        )
        %
        lightboxPhotos.length;


    updateLightbox();

}


lightboxNext?.addEventListener(
    "click",
    nextImage
);


lightboxPrev?.addEventListener(
    "click",
    previousImage
);



/* =========================================================
   LIGHTBOX BACKDROP
========================================================= */

lightbox?.addEventListener(
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
   TOUCH SWIPE
========================================================= */

let touchStartX = 0;


lightbox?.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0]
                .screenX;

    },
    {
        passive: true
    }
);


lightbox?.addEventListener(
    "touchend",
    event => {

        const touchEndX =
            event.changedTouches[0]
                .screenX;


        const distance =
            touchEndX -
            touchStartX;


        if (
            Math.abs(distance) < 50
        ) {

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
   KEYBOARD
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeLightbox();

            closeAccessModal();

            closeNavigation();

        }


        if (
            lightbox?.classList.contains(
                "open"
            )
        ) {

            if (
                event.key ===
                "ArrowRight"
            ) {

                nextImage();

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                previousImage();

            }

        }

    }
);



/* =========================================================
   PRIVATE CLIENT DELIVERY
=========================================================

   IMPORTANT:

   This section reads the galleries created
   by admin.html from localStorage.

   Public page NEVER displays:

       - Google Drive URL
       - client password

   The Drive URL is only used after the
   correct password is entered.

========================================================= */


/* =========================================================
   PRIVATE GALLERY STORAGE
========================================================= */

const PRIVATE_GALLERY_STORAGE =
    "xcy_galleries";


const weddingDeliveries = [];



/* =========================================================
   DELIVERY GRID
========================================================= */

const deliveryGrid =
    document.getElementById(
        "deliveryGrid"
    );



/* =========================================================
   LOAD PRIVATE GALLERIES
========================================================= */

function loadWeddingDeliveries() {

    if (!deliveryGrid) return;


    deliveryGrid.innerHTML = `

        <div class="delivery-empty">

            <span>
                CLIENT GALLERIES
            </span>

            <p>
                Loading private galleries...
            </p>

        </div>

    `;


    try {

        const raw =
            localStorage.getItem(
                PRIVATE_GALLERY_STORAGE
            );


        const galleries =
            raw
                ? JSON.parse(raw)
                : [];


        weddingDeliveries.length =
            0;


        if (Array.isArray(galleries)) {

            galleries.forEach(
                gallery => {

                    if (
                        gallery &&
                        gallery.id
                    ) {

                        weddingDeliveries.push(
                            {
                                id:
                                    gallery.id,

                                title:
                                    gallery.title ||
                                    "Private Gallery",

                                eventType:
                                    gallery.eventType ||
                                    "other",

                                clientName:
                                    gallery.clientName ||
                                    "",

                                expiryDate:
                                    gallery.expiryDate ||
                                    "",

                                createdDate:
                                    gallery.createdDate ||
                                    "",

                                coverImage:
                                    gallery.coverImage ||
                                    DEFAULT_GALLERY_COVER,

                                password:
                                    gallery.password ||
                                    "",

                                driveUrl:
                                    gallery.driveUrl ||
                                    ""
                            }
                        );

                    }

                }
            );

        }


        renderWeddingDeliveries();


    } catch (error) {

        console.error(
            "Private gallery storage error:",
            error
        );


        deliveryGrid.innerHTML = `

            <div class="delivery-empty">

                <span>
                    CLIENT GALLERIES
                </span>

                <p>
                    Private galleries are temporarily unavailable.
                </p>

            </div>

        `;

    }

}



/* =========================================================
   RENDER PRIVATE GALLERIES
========================================================= */

function renderWeddingDeliveries() {

    if (!deliveryGrid) return;


    deliveryGrid.innerHTML = "";


    const now =
        new Date();


    const activeDeliveries =
        weddingDeliveries.filter(
            gallery => {

                if (
                    !gallery.expiryDate
                ) {

                    return true;

                }


                const expiry =
                    new Date(
                        `${gallery.expiryDate}T23:59:59`
                    );


                if (
                    Number.isNaN(
                        expiry.getTime()
                    )
                ) {

                    return true;

                }


                return expiry > now;

            }
        );


    if (
        !activeDeliveries.length
    ) {

        deliveryGrid.innerHTML = `

            <div class="delivery-empty">

                <span>
                    CLIENT GALLERIES
                </span>

                <p>
                    Private client galleries will appear here
                    when they are ready.
                </p>

            </div>

        `;

        return;

    }


    activeDeliveries.forEach(
        wedding => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "delivery-card reveal";


            const eventType =
                formatDeliveryEventType(
                    wedding.eventType
                );


            const cover =
                wedding.coverImage ||
                DEFAULT_GALLERY_COVER;


            card.innerHTML = `

                <div
                    class="delivery-cover"
                    style="
                        background:#111;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        overflow:hidden;
                    "
                >

                    <img
                        src="${escapeHTML(
                            cover
                        )}"
                        alt="${escapeHTML(
                            wedding.title ||
                            "Private Client Gallery"
                        )}"
                        loading="lazy"
                        style="
                            width:100%;
                            height:100%;
                            object-fit:cover;
                        "
                        onerror="
                            this.onerror=null;
                            this.src='${DEFAULT_GALLERY_COVER}';
                            this.style.objectFit='contain';
                            this.style.padding='18%';
                        "
                    >

                    <span class="delivery-status">
                        PRIVATE GALLERY
                    </span>

                </div>


                <div class="delivery-info">

                    <div class="delivery-info-top">

                        <div>

                            <small>
                                ${escapeHTML(
                                    eventType
                                ).toUpperCase()}
                            </small>

                            <h3>
                                ${escapeHTML(
                                    wedding.title ||
                                    "Private Gallery"
                                )}
                            </h3>

                        </div>


                        <small>
                            ${formatDeliveryDate(
                                wedding.createdDate
                            )}
                        </small>

                    </div>


                    <button
                        class="delivery-access"
                        type="button"
                        data-wedding-id="${escapeHTML(
                            wedding.id
                        )}"
                    >

                        <span>
                            ACCESS GALLERY
                        </span>

                        <b>↗</b>

                    </button>

                </div>

            `;


            const accessButton =
                card.querySelector(
                    ".delivery-access"
                );


            accessButton?.addEventListener(
                "click",
                () => {

                    openAccessModal(
                        wedding
                    );

                }
            );


            deliveryGrid.appendChild(
                card
            );

        }
    );


    setupRevealObserver();

}



/* =========================================================
   DELIVERY EVENT TYPE
========================================================= */

function formatDeliveryEventType(
    type
) {

    const eventTypes = {

        wedding:
            "Wedding",

        weddings:
            "Wedding",

        introduction:
            "Introduction",

        introductions:
            "Introduction",

        photoshoot:
            "Photoshoot",

        photoshoots:
            "Photoshoot",

        portrait:
            "Portrait",

        portraits:
            "Portrait",

        event:
            "Event",

        events:
            "Event",

        other:
            "Private Event"

    };


    return (
        eventTypes[type] ||
        "Private Gallery"
    );

}



/* =========================================================
   DELIVERY DATE
========================================================= */

function formatDeliveryDate(
    date
) {

    if (!date)
        return "";


    const parsed =
        new Date(date);


    if (
        Number.isNaN(
            parsed.getTime()
        )
    ) {

        return "";

    }


    return parsed
        .toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        )
        .toUpperCase();

}



/* =========================================================
   ACCESS MODAL
========================================================= */

const accessModal =
    document.getElementById(
        "accessModal"
    );


const accessClose =
    document.getElementById(
        "accessClose"
    );


const accessForm =
    document.getElementById(
        "accessForm"
    );


const accessPassword =
    document.getElementById(
        "accessPassword"
    );


const accessWeddingName =
    document.getElementById(
        "accessWeddingName"
    );


const accessMessage =
    document.getElementById(
        "accessMessage"
    );


const togglePassword =
    document.getElementById(
        "togglePassword"
    );



/* =========================================================
   OPEN ACCESS
========================================================= */

function openAccessModal(
    wedding
) {

    selectedWedding =
        wedding;


    if (accessWeddingName) {

        accessWeddingName.textContent =
            wedding.title ||
            "Private Gallery";

    }


    if (accessPassword) {

        accessPassword.value =
            "";

    }


    if (accessMessage) {

        accessMessage.textContent =
            "";

        accessMessage.classList.remove(
            "error",
            "success"
        );

    }


    if (!accessModal) return;


    accessModal.classList.add(
        "open"
    );


    accessModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );


    setTimeout(
        () => {

            accessPassword?.focus();

        },
        200
    );

}



/* =========================================================
   CLOSE ACCESS
========================================================= */

function closeAccessModal() {

    if (!accessModal) return;


    accessModal.classList.remove(
        "open"
    );


    accessModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );


    selectedWedding =
        null;

}


accessClose?.addEventListener(
    "click",
    closeAccessModal
);



/* =========================================================
   PASSWORD VISIBILITY
========================================================= */

togglePassword?.addEventListener(
    "click",
    () => {

        if (!accessPassword)
            return;


        const visible =
            accessPassword.type ===
            "text";


        accessPassword.type =
            visible
                ? "password"
                : "text";


        togglePassword.textContent =
            visible
                ? "SHOW"
                : "HIDE";

    }
);



/* =========================================================
   ACCESS FORM
========================================================= */

accessForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        if (!selectedWedding)
            return;


        const password =
            accessPassword?.value.trim() ||
            "";


        if (!password) {

            if (accessMessage) {

                accessMessage.textContent =
                    "Please enter your access password.";

                accessMessage.classList.remove(
                    "success"
                );

                accessMessage.classList.add(
                    "error"
                );

            }

            return;

        }


        const storedGallery =
            weddingDeliveries.find(
                gallery =>
                    gallery.id ===
                    selectedWedding.id
            );


        if (!storedGallery) {

            if (accessMessage) {

                accessMessage.textContent =
                    "This private gallery is no longer available.";

                accessMessage.classList.add(
                    "error"
                );

            }

            return;

        }


        /* ================================================
           EXPIRY CHECK
        ================================================ */

        if (
            storedGallery.expiryDate
        ) {

            const expiry =
                new Date(
                    `${storedGallery.expiryDate}T23:59:59`
                );


            if (
                !Number.isNaN(
                    expiry.getTime()
                ) &&
                expiry < new Date()
            ) {

                if (accessMessage) {

                    accessMessage.textContent =
                        "This private gallery has expired.";

                    accessMessage.classList.add(
                        "error"
                    );

                }

                return;

            }

        }


        const submitButton =
            accessForm.querySelector(
                'button[type="submit"]'
            );


        const originalButtonText =
            submitButton?.innerHTML;


        if (submitButton) {

            submitButton.disabled =
                true;


            submitButton.innerHTML =
                `
                    <span>
                        VERIFYING...
                    </span>

                    <b>...</b>
                `;

        }


        if (accessMessage) {

            accessMessage.textContent =
                "Verifying access...";

            accessMessage.classList.remove(
                "error",
                "success"
            );

        }


        /*
         * Password comparison happens here.
         *
         * The Drive URL is never inserted
         * into the public page markup.
         */

        const passwordMatches =
            password ===
            storedGallery.password;


        if (!passwordMatches) {

            if (accessMessage) {

                accessMessage.textContent =
                    "Incorrect access password.";

                accessMessage.classList.remove(
                    "success"
                );

                accessMessage.classList.add(
                    "error"
                );

            }


            accessPassword?.select();


            if (submitButton) {

                submitButton.disabled =
                    false;

                submitButton.innerHTML =
                    originalButtonText ||
                    "ACCESS GALLERY";

            }


            return;

        }


        if (
            !storedGallery.driveUrl
        ) {

            if (accessMessage) {

                accessMessage.textContent =
                    "The private gallery link is unavailable.";

                accessMessage.classList.add(
                    "error"
                );

            }


            if (submitButton) {

                submitButton.disabled =
                    false;

                submitButton.innerHTML =
                    originalButtonText ||
                    "ACCESS GALLERY";

            }


            return;

        }


        if (accessMessage) {

            accessMessage.textContent =
                "Access granted. Opening your gallery...";

            accessMessage.classList.remove(
                "error"
            );

            accessMessage.classList.add(
                "success"
            );

        }


        setTimeout(
            () => {

                /*
                 * The Drive URL is used only for
                 * the final redirect.
                 */

                window.location.assign(
                    storedGallery.driveUrl
                );

            },
            500
        );

    }
);



/* =========================================================
   SCROLL REVEAL
========================================================= */

let revealObserver;


function setupRevealObserver() {

    const elements =
        document.querySelectorAll(
            ".reveal:not(.reveal-observed)"
        );


    if (!elements.length)
        return;


    if (
        !revealObserver
    ) {

        revealObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "visible"
                                    );


                                entry.target
                                    .classList
                                    .add(
                                        "reveal-observed"
                                    );


                                revealObserver
                                    .unobserve(
                                        entry.target
                                    );

                            }

                        }
                    );

                },

                {
                    threshold: .1,

                    rootMargin:
                        "0px 0px -60px 0px"

                }

            );

    }


    elements.forEach(
        (element, index) => {

            element.style.transitionDelay =
                `${Math.min(index % 4,3) * 70}ms`;


            revealObserver.observe(
                element
            );

        }
    );

}



/* =========================================================
   NAVIGATION ACTIVE STATE
========================================================= */

const categorySections =
    document.querySelectorAll(
        ".gallery-category"
    );


const navigationButtons =
    document.querySelectorAll(
        ".category-nav-button"
    );


function setupCategoryObserver() {

    if (
        !categorySections.length
    )
        return;


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const id =
                                entry.target.dataset.category;


                            navigationButtons
                                .forEach(
                                    button => {

                                        button.classList.toggle(
                                            "active",
                                            button.dataset.target === id
                                        );

                                    }
                                );

                        }

                    }
                );

            },

            {
                rootMargin:
                    "-35% 0px -55% 0px",

                threshold: 0

            }

        );


    categorySections.forEach(
        section =>
            observer.observe(section)
    );

}



/* =========================================================
   INITIALIZE
========================================================= */

updateTotalCount();

createCategoryNavigation();

renderCategories();

loadWeddingDeliveries();

setupCategoryObserver();



/* =========================================================
   ESCAPE KEY — GLOBAL
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeNavigation();

        }

    }
);



/* =========================================================
   KEEP PRIVATE GALLERIES IN SYNC
=========================================================

   If admin.html is opened in another tab of the
   same browser/origin and a gallery is created,
   work.html will update automatically.

========================================================= */

window.addEventListener(
    "storage",
    event => {

        if (
            event.key ===
            PRIVATE_GALLERY_STORAGE
        ) {

            loadWeddingDeliveries();

        }

    }
);