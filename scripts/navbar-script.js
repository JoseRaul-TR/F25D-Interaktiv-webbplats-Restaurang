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
const mainNav = document.querySelector('.main-nav');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active'); // Toggle 'active'
    mainNav.classList.toggle('active'); // Toggle main-nav
    navToggle.setAttribute('aria-expanded', mainNav.classList.contains('active'));//toggle aria-expanded
});

//Get year for copyright footprint
document.getElementById("copyright-year").innerHTML = new Date().getFullYear();

//Light/Dark theme selector
const checkbox = document.getElementById('checkbox');

// Function to toggle light/dark theme
function toggleTheme(isDark) {
    if (isDark) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
}
/* 
    // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            checkbox.checked = true;
            toggleTheme(true);
        } */

// Event listener for theme switch
checkbox.addEventListener('change', (e) => {
    toggleTheme(e.target.checked);
});

// Add class for javascript enabled.
document.body.classList.add('js-enabled');
