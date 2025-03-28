document.addEventListener('DOMContentLoaded', function() {
    // Navbar functionality
    const navbar = document.querySelector('.navbar');
    const toggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Make navbar shrink on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Toggle navbar collapse on mobile
    toggler.addEventListener('click', function() {
        this.classList.toggle('active');
        navbarCollapse.classList.toggle('show');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                toggler.classList.remove('active');
                navbarCollapse.classList.remove('show');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Dropdown menu functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close all other dropdowns first
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== this.nextElementSibling) {
                    menu.classList.remove('show');
                }
            });
            
            // Toggle current dropdown
            const dropdownMenu = this.nextElementSibling;
            dropdownMenu.classList.toggle('show');
            
            // Position dropdown menu
            positionDropdown(dropdownMenu, this);
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });

    // Gallery functionality
    const galleryTrack = document.querySelector('.gallery-track');
    const gallerySlides = document.querySelectorAll('.gallery-slide');
    const indicatorsContainer = document.querySelector('.gallery-indicators');
    
    // Create gallery indicators
    gallerySlides.forEach((_, index) => {
        const indicator = document.createElement('span');
        indicator.classList.add('indicator');
        indicator.addEventListener('click', () => {
            scrollGalleryToIndex(index);
        });
        indicatorsContainer.appendChild(indicator);
    });
    
    // Update indicators on scroll
    galleryTrack.addEventListener('scroll', function() {
        const scrollPosition = galleryTrack.scrollLeft;
        const slideWidth = galleryTrack.clientWidth;
        const currentIndex = Math.round(scrollPosition / slideWidth);
        
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    });
    
    // Set first indicator as active initially
    if (indicatorsContainer.firstChild) {
        indicatorsContainer.firstChild.classList.add('active');
    }

    // Image modal functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeModalBtn = document.querySelector('.close');
    
    // Open modal when clicking on gallery images
    document.querySelectorAll('.gallery-slide img').forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            captionText.innerHTML = this.parentElement.querySelector('.img-caption').textContent;
            document.body.classList.add('no-scroll');
        });
    });
    
    // Close modal
    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.classList.remove('no-scroll');
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }
    });

    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Gallery scroll functions
function scrollGallery(direction) {
    const gallery = document.querySelector('.gallery-track');
    const scrollAmount = gallery.clientWidth * direction;
    
    gallery.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

function scrollGalleryToIndex(index) {
    const galleryTrack = document.querySelector('.gallery-track');
    const slideWidth = galleryTrack.clientWidth;
    
    galleryTrack.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
    });
}

// Helper function to position dropdown menu
function positionDropdown(menu, toggle) {
    const rect = toggle.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    
    // Default position below the toggle
    menu.style.top = `${rect.bottom + window.scrollY}px`;
    menu.style.left = `${rect.left + window.scrollX}px`;
    menu.style.right = 'auto';
    
    // Check if dropdown goes off-screen to the right
    if (rect.left + menu.offsetWidth > viewportWidth) {
        menu.style.left = 'auto';
        menu.style.right = `${viewportWidth - rect.right}px`;
    }
    
    // Check if dropdown goes off-screen to the bottom (mobile)
    if (rect.bottom + menu.offsetHeight > window.innerHeight) {
        menu.style.top = 'auto';
        menu.style.bottom = `${window.innerHeight - rect.top}px`;
    }
}

// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}


