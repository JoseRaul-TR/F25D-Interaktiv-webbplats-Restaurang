const currentPage = window.location.pathname;

// Get the nav links
const homeLink = document.getElementById("homeLink");
const menuLink = document.getElementById("menuLink");
const lunchbuffeLink = document.getElementById("lunchbuffeLink");
const orderLink = document.getElementById("orderLink");
const contactLink = document.getElementById("contactLink");

// Function to set the active class
function setActiveLink(link) {
    if (homeLink) homeLink.classList.remove("active");
    if (menuLink) menuLink.classList.remove("active");
    if (lunchbuffeLink) lunchbuffeLink.classList.remove("active");
    if (orderLink) orderLink.classList.remove("active");
    if (contactLink) contactLink.classList.remove("active");
    if (link) link.classList.add("active");
}

// Check the current page and set the active link
if (currentPage.endsWith("index.html") || currentPage === "/") {
    setActiveLink(homeLink);
} else if (currentPage.endsWith("#meny")) {
    setActiveLink(menuLink);
} else if (currentPage.endsWith("#lunchbuffe")) {
    setActiveLink(lunchbuffeLink);
} else if (currentPage.endsWith("order.html")) {
    setActiveLink(orderLink);
} else if (currentPage.endsWith("contact.html")) {
    setActiveLink(contactLink);
}

// Show the correct section based on the current page
const homeSection = document.getElementById("home");
const menuSection = document.getElementById("menu");
const lunchbuffeSection = document.getElementById("lucnbuffe"); // corrected Id.
const orderSection = document.getElementById("order"); // if you add this to the html.
const contactSection = document.getElementById("contact");

function showSection(section) {
    if (homeSection) homeSection.style.display = "none";
    if (menuSection) menuSection.style.display = "none";
    if (lunchbuffeSection) lunchbuffeSection.style.display = "none";
    if (orderSection) orderSection.style.display = "none";
    if (contactSection) contactSection.style.display = "none";
    if (section) section.style.display = "block";
}

if (currentPage.endsWith("index.html") || currentPage === "/") {
    if (homeSection) showSection(homeSection);
} else if (currentPage.endsWith("#meny")) {
    if (menuSection) showSection(menuSection);
} else if (currentPage.endsWith("#lunchbuffe")) {
    if (lunchbuffeSection) showSection(lunchbuffeSection);
} else if (currentPage.endsWith("order.html")) {
    if (orderSection) showSection(orderSection);
} else if (currentPage.endsWith("contact.html")) {
    if (contactSection) showSection(contactSection);
}

// Responsive navbar
/* Toggle between adding and removing the "responsive" class to the navbar when the user clicks on the icon */
function contractNavbar() {
    var x = document.getElementById("myNavbar");
    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
}