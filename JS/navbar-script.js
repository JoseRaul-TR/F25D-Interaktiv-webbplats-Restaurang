// Display current site in nav-list
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop(); // Get filename from path

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href').split('/').pop(); // Get filename from href

        if (linkHref === currentPage) {
            link.classList.add('current'); // Add 'current' class for highlighting
        }
    });
});


// Toggle code – "Hamburger"
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active'); // Toggle 'active'
    navMenu.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));//toggle aria-expanded
});

//Get year for copyright footprint
document.getElementById("copyright-year").innerHTML = new Date().getFullYear();