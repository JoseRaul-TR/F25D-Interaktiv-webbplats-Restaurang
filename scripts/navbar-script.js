/* Hamburger code */

const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active'); // Toggle 'active'
    mainNav.classList.toggle('active'); // Toggle main-nav
    navToggle.setAttribute('aria-expanded', mainNav.classList.contains('active'));//toggle aria-expanded
});