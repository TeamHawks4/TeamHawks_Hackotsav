// Toggle navbar collapse on mobile
const toggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

toggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('active');
});

// Toggle dropdown menu
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const dropdownMenu = toggle.nextElementSibling;
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.matches('.dropdown-toggle')) {
        const dropdownMenus = document.querySelectorAll('.dropdown-menu');
        dropdownMenus.forEach((menu) => {
            menu.style.display = 'none';
        });
    }
});


function scrollGallery(direction) {
    const gallery = document.querySelector('.gallery-images');
    const scrollAmount = 400;
    gallery.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}