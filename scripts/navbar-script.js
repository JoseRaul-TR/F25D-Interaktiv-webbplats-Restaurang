/* document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality

    // 1. Highlight Active Link
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('current');
        } else if (currentPath === '/' && link.getAttribute('href') === '/index.html') {
            link.classList.add('current');
        } else {
            link.classList.remove('current');
        }
    });

    // 2. Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const hamburgerLines = document.querySelectorAll('.hamburger-line');

    if (hamburger && navList) {
        hamburger.addEventListener('click', function() {
            navList.classList.toggle('nav-active'); //Toggle a class for active state
            hamburger.classList.toggle('hamburger-active'); //Toggle a class for active state

            if (navList.classList.contains('nav-active')) {
                hamburgerLines[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
                hamburgerLines[1].style.opacity = '0';
                hamburgerLines[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
                setTimeout(() => { navList.style.display = 'flex'; }, 300);
            } else {
                hamburgerLines[0].style.transform = 'rotate(0) translate(0, 0)';
                hamburgerLines[1].style.opacity = '1';
                hamburgerLines[2].style.transform = 'rotate(0) translate(0, 0)';
                navList.style.display = 'none';
            }
        });

        // 3. Hide nav list on wider screens
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) { // Adjustable breakpoint
                navList.classList.remove('nav-active');
                navList.style.display = 'flex';
                hamburgerLines[0].style.transform = 'rotate(0) translate(0, 0)';
                hamburgerLines[1].style.opacity = '1';
                hamburgerLines[2].style.transform = 'rotate(0) translate(0, 0)';
                hamburger.classList.remove('hamburger-active');
                hamburger.style.display = 'none';
            } else {
                hamburger.style.display = 'block';
                if(!hamburger.classList.contains('hamburger-active')){
                    navList.style.display = 'none';
                }
            }
        });

        // 4. Initial hide on load if screen is small
        if (window.innerWidth <= 768) {
            navList.style.display = 'none';
            hamburger.style.display = 'block';
        } else {
            hamburger.style.display = 'none';
        }
    }
}); */