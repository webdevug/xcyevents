/* =========================================================
   XCY EVENTS — PRIVATE CONTROL
   COMPLETE CLIENT-SIDE ADMIN SYSTEM
========================================================= */


/* =========================================================
   ADMIN LOGIN
========================================================= */

const ADMIN_PASSWORD = "XCY2026";


/* =========================================================
   STATE
========================================================= */

const state = {
    bookings: [],
    galleries: [],
    editingId: null,
    pdfBookingId: null
};


/* =========================================================
   HELPERS
========================================================= */

const $ = selector =>
    document.querySelector(selector);

const $$ = selector =>
    document.querySelectorAll(selector);


function escapeHTML(value = "") {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function money(value) {

    return new Intl.NumberFormat("en-UG")
        .format(Number(value || 0));
}


function formatDate(date) {

    if (!date) {
        return "—";
    }

    const d = new Date(date);

    if (Number.isNaN(d.getTime())) {
        return date;
    }

    return d.toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


function eventLabel(type) {

    const labels = {
        wedding: "Wedding",
        introduction: "Introduction",
        photoshoot: "Photoshoot",
        portrait: "Portrait",
        event: "Event",
        other: "Other"
    };

    return labels[type] || "Event";
}


function showToast(message) {

    const toast = $("#toast");

    if (!toast) {
        return;
    }

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2800);
}


/* =========================================================
   LOCAL STORAGE
========================================================= */

function saveData() {

    localStorage.setItem(
        "xcy_bookings",
        JSON.stringify(state.bookings)
    );

    localStorage.setItem(
        "xcy_galleries",
        JSON.stringify(state.galleries)
    );
}


function loadData() {

    try {

        state.bookings =
            JSON.parse(
                localStorage.getItem(
                    "xcy_bookings"
                )
            ) || [];

    } catch {

        state.bookings = [];
    }


    try {

        state.galleries =
            JSON.parse(
                localStorage.getItem(
                    "xcy_galleries"
                )
            ) || [];

    } catch {

        state.galleries = [];
    }
}


/* =========================================================
   LOGIN
========================================================= */

function checkSession() {

    const loggedIn =
        sessionStorage.getItem(
            "xcy_admin_authenticated"
        ) === "true";


    if (loggedIn) {

        $("#loginScreen")
            ?.classList.add("hidden");

        $("#app")
            ?.classList.add("visible");

        initializeDashboard();

    } else {

        $("#loginScreen")
            ?.classList.remove("hidden");

        $("#app")
            ?.classList.remove("visible");
    }
}


/* LOGIN FORM */

$("#loginForm")?.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const password =
            $("#adminPassword")?.value || "";


        const message =
            $("#loginMessage");


        if (message) {
            message.textContent = "";
        }


        if (password !== ADMIN_PASSWORD) {

            if (message) {

                message.textContent =
                    "Incorrect password.";
            }


            if ($("#adminPassword")) {

                $("#adminPassword").value = "";

                $("#adminPassword").focus();
            }

            return;
        }


        sessionStorage.setItem(
            "xcy_admin_authenticated",
            "true"
        );


        $("#loginScreen")
            ?.classList.add("hidden");

        $("#app")
            ?.classList.add("visible");


        if ($("#adminPassword")) {

            $("#adminPassword").value = "";
        }


        initializeDashboard();
    }
);


/* TOGGLE LOGIN PASSWORD */

$("#toggleLoginPassword")
    ?.addEventListener(
        "click",
        () => {

            const input =
                $("#adminPassword");


            if (!input) {
                return;
            }


            if (
                input.type ===
                "password"
            ) {

                input.type = "text";

                $("#toggleLoginPassword")
                    .textContent = "HIDE";

            } else {

                input.type = "password";

                $("#toggleLoginPassword")
                    .textContent = "SHOW";
            }
        }
    );


/* LOGOUT */

$("#logoutButton")
    ?.addEventListener(
        "click",
        () => {

            sessionStorage.removeItem(
                "xcy_admin_authenticated"
            );

            location.reload();
        }
    );


/* =========================================================
   NAVIGATION
========================================================= */

function switchPage(page) {

    $$(".nav-item").forEach(item => {

        item.classList.toggle(
            "active",
            item.dataset.page === page
        );
    });


    $$(".page").forEach(section => {

        section.classList.toggle(
            "active",
            section.id === `${page}Page`
        );
    });


    if (page === "dashboard") {
        renderDashboard();
    }


    if (page === "bookings") {
        renderBookings();
    }


    if (page === "galleries") {
        renderGalleries();
    }


    if (page === "documents") {
        renderDocuments();
    }
}


$$(".nav-item").forEach(button => {

    button.addEventListener(
        "click",
        () => {

            switchPage(
                button.dataset.page
            );

            $(".sidebar")
                ?.classList.remove(
                    "mobile-open"
                );
        }
    );
});


$$("[data-page-target]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                switchPage(
                    button.dataset.pageTarget
                );
            }
        );
    });


$("#mobileMenuButton")
    ?.addEventListener(
        "click",
        () => {

            $(".sidebar")
                ?.classList.toggle(
                    "mobile-open"
                );
        }
    );


/* =========================================================
   INITIALIZE
========================================================= */

function initializeDashboard() {

    loadData();

    renderDashboard();

    renderBookings();

    renderGalleries();

    renderDocuments();


    const date =
        new Date();


    if ($("#currentDate")) {

        $("#currentDate")
            .textContent =
            date.toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                }
            );
    }
}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

    const bookings =
        state.bookings;


    if ($("#statBookings")) {

        $("#statBookings")
            .textContent =
            bookings.length;
    }


    const activeGalleries =
        state.galleries.filter(
            gallery => {

                if (!gallery.expiryDate) {
                    return true;
                }

                return (
                    new Date(
                        gallery.expiryDate
                    ) > new Date()
                );
            }
        );


    if ($("#statGalleries")) {

        $("#statGalleries")
            .textContent =
            activeGalleries.length;
    }


    const totalDue =
        bookings.reduce(
            (sum, booking) => {

                const total =
                    Number(
                        booking.totalAmount || 0
                    );

                const paid =
                    Number(
                        booking.paidAmount || 0
                    );

                return (
                    sum +
                    Math.max(
                        total - paid,
                        0
                    )
                );

            },
            0
        );


    if ($("#statDue")) {

        $("#statDue")
            .textContent =
            `UGX ${money(totalDue)}`;
    }


    const now =
        new Date();


    const currentMonth =
        bookings.filter(
            booking => {

                if (!booking.eventDate) {
                    return false;
                }

                const d =
                    new Date(
                        booking.eventDate
                    );

                return (
                    d.getMonth() ===
                        now.getMonth() &&
                    d.getFullYear() ===
                        now.getFullYear()
                );
            }
        );


    if ($("#statMonth")) {

        $("#statMonth")
            .textContent =
            currentMonth.length;
    }


    const recent =
        [...bookings]
            .sort(
                (a, b) =>
                    new Date(
                        b.createdAt || 0
                    ) -
                    new Date(
                        a.createdAt || 0
                    )
            )
            .slice(0, 6);


    const container =
        $("#recentBookings");


    if (!container) {
        return;
    }


    if (!recent.length) {

        container.innerHTML =
            `
                <div class="empty-state">
                    No bookings yet.
                </div>
            `;

        return;
    }


    container.innerHTML =
        recent
            .map(
                booking => `
                    <div class="booking-row">

                        <div class="booking-ref">
                            ${escapeHTML(
                                booking.bookingId
                            )}
                        </div>

                        <div>

                            <div class="booking-name">
                                ${escapeHTML(
                                    booking.clientName
                                )}
                            </div>

                            <div class="booking-event">
                                ${escapeHTML(
                                    booking.eventName
                                )}
                            </div>

                        </div>

                        <div class="booking-date">
                            ${formatDate(
                                booking.eventDate
                            )}
                        </div>

                    </div>
                `
            )
            .join("");
}


/* =========================================================
   BOOKING ID
========================================================= */

function generateBookingId() {

    const year =
        new Date().getFullYear();

    let id;


    do {

        const number =
            Math.floor(
                1000 +
                Math.random() * 9000
            );


        id =
            `XCY-${year}-${number}`;

    } while (
        state.bookings.some(
            booking =>
                booking.bookingId === id
        )
    );


    return id;
}


/* =========================================================
   BOOKINGS
========================================================= */

function renderBookings(search = "") {

    const query =
        search
            .trim()
            .toLowerCase();


    const bookings =
        state.bookings.filter(
            booking => {

                if (!query) {
                    return true;
                }


                return [
                    booking.bookingId,
                    booking.clientName,
                    booking.eventName,
                    booking.clientPhone,
                    booking.eventLocation
                ]
                    .join(" ")
                    .toLowerCase()
                    .includes(query);
            }
        );


    const container =
        $("#bookingTable");


    if (!container) {
        return;
    }


    if (!bookings.length) {

        container.innerHTML =
            `
                <div class="empty-state">
                    No matching bookings found.
                </div>
            `;

        return;
    }


    container.innerHTML =
        bookings
            .map(
                booking => {

                    const total =
                        Number(
                            booking.totalAmount || 0
                        );


                    const paid =
                        Number(
                            booking.paidAmount || 0
                        );


                    const due =
                        Math.max(
                            total - paid,
                            0
                        );


                    const paidFull =
                        due <= 0;


                    return `

                        <div
                            class="booking-table-row"
                            data-booking-id="${escapeHTML(
                                booking.id
                            )}"
                        >

                            <div class="table-ref">
                                ${escapeHTML(
                                    booking.bookingId
                                )}
                            </div>


                            <div class="table-client">

                                ${escapeHTML(
                                    booking.clientName
                                )}

                                <small>
                                    ${escapeHTML(
                                        booking.eventName
                                    )}
                                </small>

                            </div>


                            <div class="table-date">
                                ${formatDate(
                                    booking.eventDate
                                )}
                            </div>


                            <div class="payment">

                                <strong>
                                    UGX ${money(paid)}
                                </strong>

                                <small>
                                    ${
                                        paidFull
                                            ? "PAID"
                                            : `Due ${money(due)}`
                                    }
                                </small>

                            </div>


                            <div>

                                <span
                                    class="status ${
                                        paidFull
                                            ? "paid"
                                            : "pending"
                                    }"
                                >
                                    ${
                                        paidFull
                                            ? "PAID"
                                            : "BALANCE"
                                    }
                                </span>

                            </div>


                            <button
                                class="row-menu"
                                data-booking-menu="${escapeHTML(
                                    booking.id
                                )}"
                            >
                                ···
                            </button>

                        </div>

                    `;
                }
            )
            .join("");


    $$("[data-booking-menu]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    showBookingMenu(
                        button.dataset
                            .bookingMenu
                    );
                }
            );
        });
}


/* SEARCH */

$("#bookingSearch")
    ?.addEventListener(
        "input",
        event => {

            renderBookings(
                event.target.value
            );
        }
    );


/* =========================================================
   BOOKING MENU
========================================================= */

function showBookingMenu(id) {

    const booking =
        state.bookings.find(
            item =>
                item.id === id
        );


    if (!booking) {
        return;
    }


    const action =
        prompt(
            `Booking ${booking.bookingId}\n\n` +
            `Type:\n` +
            `EDIT — edit booking\n` +
            `PDF — preview PDF\n` +
            `DELETE — delete booking`
        );


    if (!action) {
        return;
    }


    const normalized =
        action
            .trim()
            .toLowerCase();


    if (normalized === "edit") {

        openBookingModal(
            booking
        );

    } else if (
        normalized === "pdf"
    ) {

        openPdfPreview(
            booking.id
        );

    } else if (
        normalized === "delete"
    ) {

        deleteBooking(
            booking.id
        );
    }
}


/* =========================================================
   BOOKING MODAL
========================================================= */

function openBookingModal(
    booking = null
) {

    state.editingId =
        booking?.id || null;


    if ($("#bookingModalTitle")) {

        $("#bookingModalTitle")
            .textContent =
            booking
                ? "Edit booking"
                : "Create booking";
    }


    if ($("#editingBookingId")) {

        $("#editingBookingId")
            .value =
            booking?.id || "";
    }


    if ($("#clientName")) {

        $("#clientName")
            .value =
            booking?.clientName || "";
    }


    if ($("#clientPhone")) {

        $("#clientPhone")
            .value =
            booking?.clientPhone || "";
    }


    if ($("#eventName")) {

        $("#eventName")
            .value =
            booking?.eventName || "";
    }


    if ($("#eventType")) {

        $("#eventType")
            .value =
            booking?.eventType ||
            "wedding";
    }


    if ($("#eventDate")) {

        $("#eventDate")
            .value =
            booking?.eventDate || "";
    }


    if ($("#eventTime")) {

        $("#eventTime")
            .value =
            booking?.eventTime || "";
    }


    if ($("#eventLocation")) {

        $("#eventLocation")
            .value =
            booking?.eventLocation || "";
    }


    if ($("#totalAmount")) {

        $("#totalAmount")
            .value =
            booking?.totalAmount || 0;
    }


    if ($("#paidAmount")) {

        $("#paidAmount")
            .value =
            booking?.paidAmount || 0;
    }


    const gallery =
        state.galleries.find(
            item =>
                item.bookingId ===
                booking?.id
        );


    const enabled =
        Boolean(gallery);


    if ($("#enableGallery")) {

        $("#enableGallery")
            .checked =
            enabled;
    }


    $("#galleryFields")
        ?.classList.toggle(
            "active",
            enabled
        );


    if ($("#galleryTitle")) {

        $("#galleryTitle")
            .value =
            gallery?.title ||
            booking?.eventName ||
            "";
    }


    if ($("#driveUrl")) {

        $("#driveUrl")
            .value =
            gallery?.driveUrl ||
            "";
    }


    if ($("#coverImage")) {

        $("#coverImage")
            .value =
            gallery?.coverImage ||
            "";
    }


    if ($("#expiryDate")) {

        $("#expiryDate")
            .value =
            gallery?.expiryDate ||
            "";
    }


    if ($("#generatedPassword")) {

        $("#generatedPassword")
            .textContent =
            gallery?.password ||
            generatePasswordPreview();
    }


    if ($("#bookingFormMessage")) {

        $("#bookingFormMessage")
            .textContent = "";
    }


    $("#bookingModal")
        ?.classList.add("active");


    $("#bookingModal")
        ?.setAttribute(
            "aria-hidden",
            "false"
        );
}


/* CLOSE MODALS */

function closeModals() {

    $$(".modal")
        .forEach(modal => {

            modal.classList.remove(
                "active"
            );

            modal.setAttribute(
                "aria-hidden",
                "true"
            );
        });
}


$$("[data-close-modal]")
    .forEach(button => {

        button.addEventListener(
            "click",
            closeModals
        );
    });


/* NEW BOOKING */

$("#newBookingButton")
    ?.addEventListener(
        "click",
        () => {

            openBookingModal();
        }
    );


/* QUICK BOOKING */

$("#quickBookingButton")
    ?.addEventListener(
        "click",
        () => {

            openBookingModal();
        }
    );


/* ENABLE GALLERY */

$("#enableGallery")
    ?.addEventListener(
        "change",
        event => {

            $("#galleryFields")
                ?.classList.toggle(
                    "active",
                    event.target.checked
                );
        }
    );


/* =========================================================
   PASSWORD GENERATOR
========================================================= */

function generatePasswordPreview() {

    const chars =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let result = "XCY-";


    for (let i = 0; i < 4; i++) {

        result +=
            chars[
                Math.floor(
                    Math.random() *
                    chars.length
                )
            ];
    }


    result += "-";


    for (let i = 0; i < 4; i++) {

        result +=
            chars[
                Math.floor(
                    Math.random() *
                    chars.length
                )
            ];
    }


    return result;
}


/* GENERATE */

$("#generatePasswordButton")
    ?.addEventListener(
        "click",
        () => {

            if ($("#generatedPassword")) {

                $("#generatedPassword")
                    .textContent =
                    generatePasswordPreview();
            }
        }
    );


/* =========================================================
   SAVE BOOKING
========================================================= */

$("#bookingForm")
    ?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const message =
                $("#bookingFormMessage");


            if (message) {
                message.textContent = "";
            }


            const editing =
                Boolean(
                    state.editingId
                );


            let booking;


            if (editing) {

                booking =
                    state.bookings.find(
                        item =>
                            item.id ===
                            state.editingId
                    );
            }


            const bookingId =
                booking?.bookingId ||
                generateBookingId();


            const payload = {

                id:
                    booking?.id ||
                    `booking-${Date.now()}`,

                bookingId,

                clientName:
                    $("#clientName")
                        ?.value
                        .trim() || "",

                clientPhone:
                    $("#clientPhone")
                        ?.value
                        .trim() || "",

                eventName:
                    $("#eventName")
                        ?.value
                        .trim() || "",

                eventType:
                    $("#eventType")
                        ?.value ||
                    "wedding",

                eventDate:
                    $("#eventDate")
                        ?.value ||
                    "",

                eventTime:
                    $("#eventTime")
                        ?.value ||
                    "",

                eventLocation:
                    $("#eventLocation")
                        ?.value
                        .trim() || "",

                totalAmount:
                    Number(
                        $("#totalAmount")
                            ?.value || 0
                    ),

                paidAmount:
                    Number(
                        $("#paidAmount")
                            ?.value || 0
                    ),

                createdAt:
                    booking?.createdAt ||
                    new Date().toISOString()
            };


            /* SAVE BOOKING */

            if (editing) {

                const index =
                    state.bookings.findIndex(
                        item =>
                            item.id ===
                            state.editingId
                    );


                if (index !== -1) {

                    state.bookings[index] =
                        payload;
                }

            } else {

                state.bookings.push(
                    payload
                );
            }


            /* =================================================
               PRIVATE GALLERY
            ================================================= */

            const galleryEnabled =
                $("#enableGallery")
                    ?.checked ||
                false;


            const existingGallery =
                state.galleries.find(
                    item =>
                        item.bookingId ===
                        payload.id
                );


            let savedGalleryPassword =
                "";


            if (galleryEnabled) {

                savedGalleryPassword =
                    (
                        $("#generatedPassword")
                            ?.textContent ||
                        ""
                    ).trim();


                if (!savedGalleryPassword) {

                    savedGalleryPassword =
                        generatePasswordPreview();
                }


                const gallery = {

                    id:
                        existingGallery?.id ||
                        `gallery-${Date.now()}`,

                    bookingId:
                        payload.id,

                    bookingIdReference:
                        payload.bookingId,

                    title:
                        $("#galleryTitle")
                            ?.value
                            .trim() ||
                        payload.eventName,

                    eventType:
                        payload.eventType,

                    clientName:
                        payload.clientName,

                    driveUrl:
                        $("#driveUrl")
                            ?.value
                            .trim() ||
                        "",

                    coverImage:
                        $("#coverImage")
                            ?.value
                            .trim() ||
                        "",

                    expiryDate:
                        $("#expiryDate")
                            ?.value ||
                        "",

                    password:
                        savedGalleryPassword,

                    createdDate:
                        existingGallery?.createdDate ||
                        new Date().toISOString()
                };


                if (existingGallery) {

                    const index =
                        state.galleries.findIndex(
                            item =>
                                item.id ===
                                existingGallery.id
                        );


                    if (index !== -1) {

                        state.galleries[index] =
                            gallery;
                    }

                } else {

                    state.galleries.push(
                        gallery
                    );
                }

            } else {

                state.galleries =
                    state.galleries.filter(
                        item =>
                            item.bookingId !==
                            payload.id
                    );
            }


            /* SAVE */

            saveData();


            renderDashboard();

            renderBookings();

            renderGalleries();

            renderDocuments();


            closeModals();


            showToast(
                editing
                    ? "Booking updated."
                    : "Booking created."
            );


            /* PASSWORD NOTICE */

            if (galleryEnabled) {

                const passwordToShow =
                    savedGalleryPassword;


                setTimeout(
                    () => {

                        alert(
                            `PRIVATE GALLERY PASSWORD\n\n` +
                            `${passwordToShow}\n\n` +
                            `Save this password and send it to the client.`
                        );

                    },
                    250
                );
            }

        }
    );


/* =========================================================
   DELETE BOOKING
========================================================= */

function deleteBooking(id) {

    const booking =
        state.bookings.find(
            item =>
                item.id === id
        );


    if (!booking) {
        return;
    }


    const confirmed =
        confirm(
            `Delete booking ${booking.bookingId}?\n\n` +
            `This cannot be undone.`
        );


    if (!confirmed) {
        return;
    }


    state.bookings =
        state.bookings.filter(
            item =>
                item.id !== id
        );


    state.galleries =
        state.galleries.filter(
            item =>
                item.bookingId !== id
        );


    saveData();


    renderDashboard();

    renderBookings();

    renderGalleries();

    renderDocuments();


    showToast(
        "Booking deleted."
    );
}


/* =========================================================
   GALLERIES
========================================================= */

function renderGalleries() {

    const container =
        $("#adminGalleryGrid");


    if (!container) {
        return;
    }


    if (!state.galleries.length) {

        container.innerHTML = `

            <div
                class="empty-state"
                style="grid-column:1/-1"
            >
                No private galleries have
                been created yet.
            </div>

        `;

        return;
    }


    container.innerHTML =
        state.galleries
            .map(
                gallery => {

                    const hasCustomCover =
                        Boolean(
                            gallery.coverImage
                        );


                    const expired =
                        gallery.expiryDate &&
                        new Date(
                            gallery.expiryDate
                        ) < new Date();


                    let coverMarkup;


                    if (hasCustomCover) {

                        coverMarkup = `

                            <img
                                src="${escapeHTML(
                                    gallery.coverImage
                                )}"
                                alt=""
                                onerror="
                                    this.style.display='none';
                                    this.parentElement.style.background='#171717';
                                "
                            >

                        `;

                    } else {

                        coverMarkup = `

                            <div
                                style="
                                    width:100%;
                                    height:100%;
                                    background:#171717;
                                    display:flex;
                                    align-items:center;
                                    justify-content:center;
                                    padding:18%;
                                    box-sizing:border-box;
                                "
                            >

                                <img
                                    src="images/xcylogo.png"
                                    alt="XCY EVENTS"
                                    style="
                                        width:100%;
                                        height:auto;
                                        max-height:100%;
                                        object-fit:contain;
                                    "
                                >

                            </div>

                        `;
                    }


                    return `

                        <article
                            class="admin-gallery-card"
                        >

                            <div
                                class="admin-gallery-cover"
                                ${
                                    !hasCustomCover
                                        ? `style="
                                            background:#171717;
                                            display:flex;
                                            align-items:center;
                                            justify-content:center;
                                        "`
                                        : ""
                                }
                            >

                                ${coverMarkup}

                            </div>


                            <div
                                class="gallery-card-content"
                            >

                                <div
                                    class="gallery-card-top"
                                >

                                    <span
                                        class="gallery-type"
                                    >
                                        ${escapeHTML(
                                            eventLabel(
                                                gallery.eventType
                                            )
                                        ).toUpperCase()}
                                    </span>


                                    <span
                                        class="gallery-type"
                                    >
                                        ${
                                            expired
                                                ? "EXPIRED"
                                                : "ACTIVE"
                                        }
                                    </span>

                                </div>


                                <h3>
                                    ${escapeHTML(
                                        gallery.title
                                    )}
                                </h3>


                                <div
                                    class="gallery-info"
                                >

                                    <div>

                                        <span>
                                            CLIENT
                                        </span>

                                        <strong>
                                            ${escapeHTML(
                                                gallery.clientName ||
                                                "—"
                                            )}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            PASSWORD
                                        </span>

                                        <strong>
                                            ${escapeHTML(
                                                gallery.password ||
                                                "—"
                                            )}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            CREATED
                                        </span>

                                        <strong>
                                            ${formatDate(
                                                gallery.createdDate
                                            )}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            EXPIRES
                                        </span>

                                        <strong>
                                            ${formatDate(
                                                gallery.expiryDate
                                            )}
                                        </strong>

                                    </div>

                                </div>


                                <div
                                    class="gallery-actions"
                                >

                                    <button
                                        data-copy-password="${escapeHTML(
                                            gallery.password ||
                                            ""
                                        )}"
                                    >
                                        COPY PASSWORD
                                    </button>


                                    <button
                                        data-copy-drive="${escapeHTML(
                                            gallery.driveUrl ||
                                            ""
                                        )}"
                                    >
                                        COPY DRIVE
                                    </button>

                                </div>

                            </div>

                        </article>

                    `;
                }
            )
            .join("");


    /* COPY PASSWORD */

    $$("[data-copy-password]")
        .forEach(button => {

            button.addEventListener(
                "click",
                async () => {

                    try {

                        await navigator.clipboard
                            .writeText(
                                button.dataset
                                    .copyPassword
                            );

                        showToast(
                            "Password copied."
                        );

                    } catch {

                        showToast(
                            "Could not copy password."
                        );
                    }
                }
            );
        });


    /* COPY DRIVE */

    $$("[data-copy-drive]")
        .forEach(button => {

            button.addEventListener(
                "click",
                async () => {

                    const drive =
                        button.dataset
                            .copyDrive;


                    if (!drive) {

                        showToast(
                            "No Drive link saved."
                        );

                        return;
                    }


                    try {

                        await navigator.clipboard
                            .writeText(
                                drive
                            );

                        showToast(
                            "Drive link copied."
                        );

                    } catch {

                        showToast(
                            "Could not copy Drive link."
                        );
                    }
                }
            );
        });
}


/* =========================================================
   PDF ENGINE
========================================================= */

function loadJsPDF() {

    return new Promise(
        (resolve, reject) => {

            if (
                window.jspdf &&
                window.jspdf.jsPDF
            ) {

                resolve(
                    window.jspdf.jsPDF
                );

                return;
            }


            const script =
                document.createElement(
                    "script"
                );


            script.src =
                "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";


            script.onload = () => {

                if (
                    window.jspdf &&
                    window.jspdf.jsPDF
                ) {

                    resolve(
                        window.jspdf.jsPDF
                    );

                } else {

                    reject(
                        new Error(
                            "PDF engine failed to load."
                        )
                    );
                }
            };


            script.onerror = () => {

                reject(
                    new Error(
                        "PDF system could not load. Please make sure you are connected to the internet and reload the page."
                    )
                );
            };


            document.head.appendChild(
                script
            );
        }
    );
}


/* =========================================================
   LOAD XCY LOGO
========================================================= */

function loadLogoDataURL() {

    return new Promise(
        resolve => {

            const img =
                new Image();


            img.onload = () => {

                try {

                    const canvas =
                        document.createElement(
                            "canvas"
                        );


                    canvas.width =
                        img.naturalWidth ||
                        1000;


                    canvas.height =
                        img.naturalHeight ||
                        500;


                    const ctx =
                        canvas.getContext(
                            "2d"
                        );


                    ctx.drawImage(
                        img,
                        0,
                        0
                    );


                    resolve(
                        canvas.toDataURL(
                            "image/png"
                        )
                    );

                } catch {

                    resolve(null);
                }
            };


            img.onerror = () => {

                resolve(null);
            };


            img.src =
                "images/xcylogo.png";
        }
    );
}


/* =========================================================
   PDF TEXT HELPER
========================================================= */

function pdfText(
    doc,
    text,
    x,
    y,
    width,
    options = {}
) {

    const {
        size = 9,
        font = "normal",
        color = [23, 23, 23],
        maxLines = 2,
        lineHeight = 4
    } = options;


    doc.setFont(
        "helvetica",
        font
    );


    doc.setFontSize(
        size
    );


    doc.setTextColor(
        color[0],
        color[1],
        color[2]
    );


    const lines =
        doc.splitTextToSize(
            String(text || "—"),
            width
        ).slice(
            0,
            maxLines
        );


    doc.text(
        lines,
        x,
        y
    );


    return (
        lines.length *
        lineHeight
    );
}


/* =========================================================
   PDF MICRO LABEL
========================================================= */

function pdfSmallLabel(
    doc,
    text,
    x,
    y,
    color = [111, 46, 50]
) {

    doc.setFont(
        "helvetica",
        "bold"
    );


    doc.setFontSize(
        6.2
    );


    doc.setTextColor(
        color[0],
        color[1],
        color[2]
    );


    doc.text(
        String(text).toUpperCase(),
        x,
        y
    );
}


/* =========================================================
   PREMIUM SINGLE-PAGE BOOKING PDF
========================================================= */

async function generateBookingPDF(
    booking
) {

    const JsPDF =
        await loadJsPDF();


    const doc =
        new JsPDF({

            orientation: "portrait",

            unit: "mm",

            format: "a4"

        });


    const pageWidth =
        doc.internal.pageSize.getWidth();


    const pageHeight =
        doc.internal.pageSize.getHeight();


    const margin = 17;


    const contentWidth =
        pageWidth -
        margin * 2;


    const right =
        pageWidth -
        margin;


    /* =====================================================
       PALETTE
    ===================================================== */

    const BLACK =
        [17, 17, 17];


    const INK =
        [28, 28, 27];


    const CHARCOAL =
        [55, 54, 51];


    const GREY =
        [118, 116, 111];


    const LIGHT =
        [218, 215, 209];


    const PAPER =
        [248, 247, 243];


    const WHITE =
        [255, 255, 255];


    const BURGUNDY =
        [111, 46, 50];


    /* =====================================================
       PAGE BACKGROUND
    ===================================================== */

    doc.setFillColor(
        PAPER[0],
        PAPER[1],
        PAPER[2]
    );


    doc.rect(
        0,
        0,
        pageWidth,
        pageHeight,
        "F"
    );


    /* =====================================================
       BLACK HEADER
    ===================================================== */

    doc.setFillColor(
        BLACK[0],
        BLACK[1],
        BLACK[2]
    );


    doc.rect(
        0,
        0,
        pageWidth,
        55,
        "F"
    );


    /* Burgundy hairline */

    doc.setFillColor(
        BURGUNDY[0],
        BURGUNDY[1],
        BURGUNDY[2]
    );


    doc.rect(
        0,
        54,
        pageWidth,
        1,
        "F"
    );


    /* =====================================================
       LOGO
    ===================================================== */

    const logoData =
        await loadLogoDataURL();


    if (logoData) {

        doc.addImage(
            logoData,
            "PNG",
            margin,
            12,
            42,
            18,
            undefined,
            "FAST"
        );

    } else {

        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setFontSize(
            17
        );

        doc.setTextColor(
            WHITE[0],
            WHITE[1],
            WHITE[2]
        );

        doc.text(
            "XCY EVENTS",
            margin,
            24
        );
    }


    /* =====================================================
       HEADER INFORMATION
    ===================================================== */

    doc.setFont(
        "helvetica",
        "bold"
    );


    doc.setFontSize(
        6.5
    );


    doc.setTextColor(
        190,
        190,
        190
    );


    doc.text(
        "PRIVATE CLIENT DOCUMENT",
        right,
        16,
        {
            align: "right"
        }
    );


    doc.setFont(
        "helvetica",
        "normal"
    );


    doc.setFontSize(
        6
    );


    doc.setTextColor(
        125,
        125,
        125
    );


    doc.text(
        "PHOTOGRAPHY  /  CINEMATOGRAPHY",
        right,
        23,
        {
            align: "right"
        }
    );


    doc.setFont(
        "helvetica",
        "bold"
    );


    doc.setFontSize(
        11
    );


    doc.setTextColor(
        WHITE[0],
        WHITE[1],
        WHITE[2]
    );


    doc.text(
        "BOOKING CONFIRMATION",
        right,
        38,
        {
            align: "right"
        }
    );


    doc.setFont(
        "helvetica",
        "normal"
    );


    doc.setFontSize(
        6
    );


    doc.setTextColor(
        150,
        150,
        150
    );


    doc.text(
        "CLIENT COPY  /  OFFICIAL RECORD",
        right,
        45,
        {
            align: "right"
        }
    );


    /* =====================================================
       BOOKING REFERENCE
    ===================================================== */

    let y = 68;


    pdfSmallLabel(
        doc,
        "Booking reference",
        margin,
        y
    );


    y += 9;


    doc.setFont(
        "helvetica",
        "bold"
    );


    doc.setFontSize(
        20
    );


    doc.setTextColor(
        INK[0],
        INK[1],
        INK[2]
    );


    doc.text(
        booking.bookingId,
        margin,
        y
    );


    doc.setFont(
        "helvetica",
        "normal"
    );


    doc.setFontSize(
        6.5
    );


    doc.setTextColor(
        GREY[0],
        GREY[1],
        GREY[2]
    );


    doc.text(
        `Issued ${formatDate(
            booking.createdAt
        )}`,
        right,
        y - 2,
        {
            align: "right"
        }
    );


    y += 9;


    doc.setDrawColor(
        LIGHT[0],
        LIGHT[1],
        LIGHT[2]
    );


    doc.setLineWidth(
        0.35
    );


    doc.line(
        margin,
        y,
        right,
        y
    );


    y += 12;


    /* =====================================================
       CLIENT / EVENT
    ===================================================== */

    const colGap = 15;


    const colWidth =
        (
            contentWidth -
            colGap
        ) / 2;


    pdfSmallLabel(
        doc,
        "Client",
        margin,
        y
    );


    y += 7;


    pdfText(
        doc,
        booking.clientName ||
            "—",
        margin,
        y,
        colWidth,
        {
            size: 11,
            font: "bold",
            color: INK,
            maxLines: 1
        }
    );


    doc.setFont(
        "helvetica",
        "normal"
    );


    doc.setFontSize(
        7
    );


    doc.setTextColor(
        GREY[0],
        GREY[1],
        GREY[2]
    );


    doc.text(
        booking.clientPhone ||
            "No phone supplied",
        margin,
        y + 7
    );


    const eventX =
        margin +
        colWidth +
        colGap;


    pdfSmallLabel(
        doc,
        "Event",
        eventX,
        y - 7
    );


    pdfText(
        doc,
        booking.eventName ||
            "—",
        eventX,
        y,
        colWidth,
        {
            size: 11,
            font: "bold",
            color: INK,
            maxLines: 1
        }
    );


    doc.setFont(
        "helvetica",
        "normal"
    );


    doc.setFontSize(
        7
    );


    doc.setTextColor(
        GREY[0],
        GREY[1],
        GREY[2]
    );


    doc.text(
        eventLabel(
            booking.eventType
        ),
        eventX,
        y + 7
    );


    y += 20;


    /* =====================================================
       EVENT DETAILS
    ===================================================== */

    doc.setDrawColor(
        LIGHT[0],
        LIGHT[1],
        LIGHT[2]
    );


    doc.line(
        margin,
        y,
        right,
        y
    );


    y += 10;


    pdfSmallLabel(
        doc,
        "Event details",
        margin,
        y
    );


    y += 9;


    const cardGap = 5;


    const cardWidth =
        (
            contentWidth -
            cardGap * 2
        ) / 3;


    const cardHeight = 29;


    const detailCards = [

        {
            x: margin,
            label: "DATE",
            value:
                formatDate(
                    booking.eventDate
                )
        },

        {
            x:
                margin +
                cardWidth +
                cardGap,
            label: "TIME",
            value:
                booking.eventTime ||
                "To be confirmed"
        },

        {
            x:
                margin +
                (cardWidth + cardGap) * 2,
            label: "LOCATION",
            value:
                booking.eventLocation ||
                "To be confirmed"
        }

    ];


    detailCards.forEach(
        card => {

            doc.setFillColor(
                WHITE[0],
                WHITE[1],
                WHITE[2]
            );


            doc.setDrawColor(
                LIGHT[0],
                LIGHT[1],
                LIGHT[2]
            );


            doc.roundedRect(
                card.x,
                y,
                cardWidth,
                cardHeight,
                1,
                1,
                "FD"
            );


            doc.setFillColor(
                BURGUNDY[0],
                BURGUNDY[1],
                BURGUNDY[2]
            );


            doc.rect(
                card.x,
                y,
                1.2,
                cardHeight,
                "F"
            );


            pdfSmallLabel(
                doc,
                card.label,
                card.x + 6,
                y + 7
            );


            pdfText(
                doc,
                card.value,
                card.x + 6,
                y + 16,
                cardWidth - 11,
                {
                    size: 7.8,
                    font: "bold",
                    color: CHARCOAL,
                    maxLines: 2,
                    lineHeight: 4
                }
            );
        }
    );


    y += 39;


    /* =====================================================
       FINANCIAL SUMMARY
    ===================================================== */

    doc.line(
        margin,
        y,
        right,
        y
    );


    y += 10;


    pdfSmallLabel(
        doc,
        "Financial summary",
        margin,
        y
    );


    y += 8;


    const total =
        Number(
            booking.totalAmount || 0
        );


    const paid =
        Number(
            booking.paidAmount || 0
        );


    const due =
        Math.max(
            total - paid,
            0
        );


    const financialHeight = 39;


    doc.setFillColor(
        WHITE[0],
        WHITE[1],
        WHITE[2]
    );


    doc.setDrawColor(
        LIGHT[0],
        LIGHT[1],
        LIGHT[2]
    );


    doc.roundedRect(
        margin,
        y,
        contentWidth,
        financialHeight,
        1.2,
        1.2,
        "FD"
    );


    /* left accent */

    doc.setFillColor(
        BURGUNDY[0],
        BURGUNDY[1],
        BURGUNDY[2]
    );


    doc.rect(
        margin,
        y,
        2,
        financialHeight,
        "F"
    );


    const financeRows = [

        {
            label: "TOTAL AGREED",
            value:
                `UGX ${money(total)}`
        },

        {
            label: "AMOUNT PAID",
            value:
                `UGX ${money(paid)}`
        },

        {
            label: "BALANCE DUE",
            value:
                `UGX ${money(due)}`
        }

    ];


    financeRows.forEach(
        (row, index) => {

            const rowY =
                y +
                9 +
                index * 9;


            doc.setFont(
                "helvetica",
                index === 2
                    ? "bold"
                    : "normal"
            );


            doc.setFontSize(
                6.5
            );


            doc.setTextColor(
                GREY[0],
                GREY[1],
                GREY[2]
            );


            doc.text(
                row.label,
                margin + 8,
                rowY
            );


            doc.setFont(
                "helvetica",
                "bold"
            );


            doc.setFontSize(
                index === 2
                    ? 9
                    : 8
            );


            doc.setTextColor(
                INK[0],
                INK[1],
                INK[2]
            );


            doc.text(
                row.value,
                margin + 72,
                rowY,
                {
                    align: "right"
                }
            );
        }
    );


    /* separator */

    const financeSeparator =
        margin + 86;


    doc.setDrawColor(
        LIGHT[0],
        LIGHT[1],
        LIGHT[2]
    );


    doc.line(
        financeSeparator,
        y + 6,
        financeSeparator,
        y + 33
    );


    /* payment status */

    pdfSmallLabel(
        doc,
        "Payment status",
        financeSeparator + 9,
        y + 9
    );


    doc.setFont(
        "helvetica",
        "bold"
    );


    doc.setFontSize(
        9
    );


    if (due <= 0) {

        doc.setTextColor(
            50,
            86,
            63
        );

    } else {

        doc.setTextColor(
            BURGUNDY[0],
            BURGUNDY[1],
            BURGUNDY[2]
        );
    }


    doc.text(
        due <= 0
            ? "PAID IN FULL"
            : "BALANCE DUE",
        financeSeparator + 9,
        y + 19
    );


    doc.setFont(
        "helvetica",
        "normal"
    );


    doc.setFontSize(
        6.2
    );


    doc.setTextColor(
        GREY[0],
        GREY[1],
        GREY[2]
    );


    doc.text(
        due <= 0
            ? "Booking fully settled"
            : `Outstanding UGX ${money(due)}`,
        financeSeparator + 9,
        y + 27
    );


    y += 49;


    /* =====================================================
       PRIVATE CLIENT GALLERY
    ===================================================== */

    const gallery =
        state.galleries.find(
            item =>
                item.bookingId ===
                booking.id
        );


    if (gallery) {

        doc.line(
            margin,
            y,
            right,
            y
        );


        y += 10;


        pdfSmallLabel(
            doc,
            "Private client delivery",
            margin,
            y
        );


        y += 8;


        const galleryHeight = 34;


        /* black panel */

        doc.setFillColor(
            BLACK[0],
            BLACK[1],
            BLACK[2]
        );


        doc.roundedRect(
            margin,
            y,
            contentWidth,
            galleryHeight,
            1.5,
            1.5,
            "F"
        );


        /* burgundy accent */

        doc.setFillColor(
            BURGUNDY[0],
            BURGUNDY[1],
            BURGUNDY[2]
        );


        doc.rect(
            margin,
            y,
            2,
            galleryHeight,
            "F"
        );


        /* title */

        doc.setFont(
            "helvetica",
            "bold"
        );


        doc.setFontSize(
            9
        );


        doc.setTextColor(
            WHITE[0],
            WHITE[1],
            WHITE[2]
        );


        doc.text(
            gallery.title ||
                "Private Client Gallery",
            margin + 9,
            y + 9
        );


        /* subtitle */

        doc.setFont(
            "helvetica",
            "normal"
        );


        doc.setFontSize(
            6
        );


        doc.setTextColor(
            145,
            145,
            145
        );


        doc.text(
            "PRIVATE ACCESS CREDENTIAL",
            margin + 9,
            y + 16
        );


        /* password */

        doc.setFillColor(
            39,
            39,
            39
        );


        doc.roundedRect(
            margin + 9,
            y + 19,
            48,
            9,
            1.2,
            1.2,
            "F"
        );


        doc.setFont(
            "helvetica",
            "bold"
        );


        doc.setFontSize(
            7.5
        );


        doc.setTextColor(
            WHITE[0],
            WHITE[1],
            WHITE[2]
        );


        doc.text(
            gallery.password ||
                "—",
            margin + 13,
            y + 25
        );


        /* right-side information */

        doc.setFont(
            "helvetica",
            "normal"
        );


        doc.setFontSize(
            6.2
        );


        doc.setTextColor(
            160,
            160,
            160
        );


        doc.text(
            "Keep this password private.",
            right - 8,
            y + 11,
            {
                align: "right"
            }
        );


        doc.text(
            "Your gallery access is provided separately.",
            right - 8,
            y + 18,
            {
                align: "right"
            }
        );


        if (gallery.expiryDate) {

            doc.text(
                `Access expires ${formatDate(
                    gallery.expiryDate
                )}`,
                right - 8,
                y + 25,
                {
                    align: "right"
                }
            );

        } else {

            doc.text(
                "Private gallery access",
                right - 8,
                y + 25,
                {
                    align: "right"
                }
            );
        }


        y += 45;
    }


    /* =====================================================
       CLOSING STATEMENT
    ===================================================== */

    const closingY =
        gallery
            ? 249
            : 218;


    doc.setFont(
        "helvetica",
        "italic"
    );


    doc.setFontSize(
        6.7
    );


    doc.setTextColor(
        GREY[0],
        GREY[1],
        GREY[2]
    );


    doc.text(
        "This document confirms the booking details recorded with XCY EVENTS.",
        pageWidth / 2,
        closingY,
        {
            align: "center"
        }
    );


    /* =====================================================
       FOOTER
    ===================================================== */

    const footerLine =
        273;


    doc.setDrawColor(
        LIGHT[0],
        LIGHT[1],
        LIGHT[2]
    );


    doc.setLineWidth(
        0.35
    );


    doc.line(
        margin,
        footerLine,
        right,
        footerLine
    );


    /* footer logo */

    


    /* footer descriptor */

    doc.setFont(
        "helvetica",
        "normal"
    );


    doc.setFontSize(
        5.8
    );


    doc.setTextColor(
        GREY[0],
        GREY[1],
        GREY[2]
    );


    doc.text(
        "",
        margin + 29,
        285
    );


    /* footer reference */

    doc.setFont(
        "helvetica",
        "bold"
    );


    doc.setFontSize(
        6.2
    );


    doc.setTextColor(
        INK[0],
        INK[1],
        INK[2]
    );


    doc.text(
        booking.bookingId,
        right,
        285,
        {
            align: "right"
        }
    );


    /* bottom note */

    doc.setFont(
        "helvetica",
        "normal"
    );


    doc.setFontSize(
        5.4
    );


    doc.setTextColor(
        135,
        133,
        129
    );


    doc.text(
        "Please retain this reference for all booking correspondence.",
        pageWidth / 2,
        291,
        {
            align: "center"
        }
    );


    return doc;
}


/* =========================================================
   PDF PREVIEW
========================================================= */

async function openPdfPreview(
    bookingId
) {

    state.pdfBookingId =
        bookingId;


    const booking =
        state.bookings.find(
            item =>
                item.id ===
                bookingId
        );


    if (!booking) {

        showToast(
            "Booking not found."
        );

        return;
    }


    try {

        const doc =
            await generateBookingPDF(
                booking
            );


        const blob =
            doc.output(
                "blob"
            );


        const url =
            URL.createObjectURL(
                blob
            );


        const frame =
            $("#pdfFrame");


        if (!frame) {
            return;
        }


        if (
            frame.dataset.pdfUrl
        ) {

            URL.revokeObjectURL(
                frame.dataset.pdfUrl
            );
        }


        frame.dataset.pdfUrl =
            url;


        frame.src =
            url;


        $("#pdfModal")
            ?.classList.add(
                "active"
            );


        $("#pdfModal")
            ?.setAttribute(
                "aria-hidden",
                "false"
            );


    } catch (error) {

        console.error(
            error
        );


        showToast(
            error.message ||
            "Unable to generate PDF."
        );
    }
}


/* =========================================================
   DOWNLOAD PDF
========================================================= */

$("#downloadPdfButton")
    ?.addEventListener(
        "click",
        async () => {

            if (
                !state.pdfBookingId
            ) {
                return;
            }


            const booking =
                state.bookings.find(
                    item =>
                        item.id ===
                        state.pdfBookingId
                );


            if (!booking) {
                return;
            }


            try {

                const doc =
                    await generateBookingPDF(
                        booking
                    );


                doc.save(
                    `${booking.bookingId}.pdf`
                );


                showToast(
                    "PDF downloaded."
                );


            } catch (error) {

                console.error(
                    error
                );


                showToast(
                    error.message ||
                    "Unable to download PDF."
                );
            }

        }
    );


/* =========================================================
   CLEAN PDF URL
========================================================= */

document.addEventListener(
    "click",
    event => {

        const closeButton =
            event.target.closest(
                "[data-close-modal]"
            );


        if (!closeButton) {
            return;
        }


        const frame =
            $("#pdfFrame");


        if (
            frame &&
            frame.dataset.pdfUrl
        ) {

            URL.revokeObjectURL(
                frame.dataset.pdfUrl
            );


            frame.dataset.pdfUrl =
                "";


            frame.src =
                "about:blank";
        }
    }
);


/* =========================================================
   DOCUMENTS
========================================================= */

function renderDocuments() {

    const panel =
        $(".document-panel");


    if (!panel) {
        return;
    }


    if (!state.bookings.length) {

        panel.innerHTML = `

            <div class="document-empty">

                <span class="document-symbol">
                    PDF
                </span>

                <h2>
                    No bookings yet.
                </h2>

                <p>
                    Create a booking first,
                    then preview its booking slip.
                </p>

            </div>

        `;

        return;
    }


    panel.innerHTML = `

        <div class="document-list">

            ${state.bookings
                .map(
                    booking => `

                        <div
                            class="document-row"
                        >

                            <div>

                                <span>
                                    ${escapeHTML(
                                        booking.bookingId
                                    )}
                                </span>

                                <strong>
                                    ${escapeHTML(
                                        booking.clientName
                                    )}
                                </strong>

                            </div>


                            <button
                                class="outline-button"
                                data-document-preview="${escapeHTML(
                                    booking.id
                                )}"
                            >
                                PREVIEW PDF
                            </button>

                        </div>

                    `
                )
                .join("")}

        </div>

    `;


    $$("[data-document-preview]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openPdfPreview(
                        button.dataset
                            .documentPreview
                    );
                }
            );
        });
}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeModals();

            $(".sidebar")
                ?.classList.remove(
                    "mobile-open"
                );
        }
    }
);


/* =========================================================
   START
========================================================= */

checkSession();