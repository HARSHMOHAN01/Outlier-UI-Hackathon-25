// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.createElement('div');
mobileMenu.className = 'hidden md:hidden bg-white shadow-lg absolute top-16 left-0 right-0 z-50';
mobileMenu.innerHTML = `
    <div class="px-4 py-2 border-t border-gray-200">
        <a href="index.html" class="block py-2 text-gray-700 hover:text-blue-600">Home</a>
        <a href="blog/categories.html" class="block py-2 text-gray-700 hover:text-blue-600">Blog</a>
        <a href="news/index.html" class="block py-2 text-gray-700 hover:text-blue-600">News</a>
        <a href="reviews/index.html" class="block py-2 text-gray-700 hover:text-blue-600">Reviews</a>
        <a href="recipes/index.html" class="block py-2 text-gray-700 hover:text-blue-600">Recipes</a>
    </div>
`;

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', function() {
        const nav = document.querySelector('nav');
        const isHidden = mobileMenu.classList.contains('hidden');
        
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            nav.appendChild(mobileMenu);
        } else {
            mobileMenu.classList.add('hidden');
            nav.removeChild(mobileMenu);
        }
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form Validation
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        // Check required fields
        this.querySelectorAll('[required]').forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('border-red-500');
                
                // Remove error class when user starts typing
                field.addEventListener('input', function() {
                    this.classList.remove('border-red-500');
                });
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            alert('Please fill in all required fields');
        }
    });
});

// Initialize tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'hidden absolute z-50 bg-gray-800 text-white text-xs rounded py-1 px-2';
        tooltip.textContent = tooltipText;
        element.appendChild(tooltip);
        
        element.addEventListener('mouseenter', function() {
            tooltip.classList.remove('hidden');
            positionTooltip(element, tooltip);
        });
        
        element.addEventListener('mouseleave', function() {
            tooltip.classList.add('hidden');
        });
    });
}

function positionTooltip(element, tooltip) {
    const rect = element.getBoundingClientRect();
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
    tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTooltips();
    
    // Add active class to current page link in navigation
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('text-blue-600', 'font-medium');
            link.classList.remove('text-gray-500');
        }
    });
});

// Dark Mode Toggle (optional)
const darkModeToggle = document.getElementById('dark-mode-toggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
    });
    
    // Check for saved user preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.classList.add('dark');
    }
}