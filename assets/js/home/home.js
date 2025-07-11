"use strict";


// Navbar JavaScript Functions

// Toggle User Dropdown Menu
function toggleDropdown() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('show');
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const toggleBtn = document.querySelector('.mobile-menu-toggle i');
    
    mobileMenu.classList.toggle('show');
    
    // Change hamburger icon to X when menu is open
    if (mobileMenu.classList.contains('show')) {
        toggleBtn.className = 'fas fa-times';
    } else {
        toggleBtn.className = 'fas fa-bars';
    }
}

// Close dropdown when clicking outside
window.addEventListener('click', function(event) {
    // Close user dropdown if clicked outside
    if (!event.target.matches('.user-icon') && !event.target.closest('.user-dropdown')) {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    }
    
    // Close mobile menu if clicked outside
    if (!event.target.closest('.navbar') && !event.target.matches('.mobile-menu-toggle')) {
        const mobileMenu = document.getElementById('mobileMenu');
        const toggleBtn = document.querySelector('.mobile-menu-toggle i');
        
        if (mobileMenu && mobileMenu.classList.contains('show')) {
            mobileMenu.classList.remove('show');
            if (toggleBtn) {
                toggleBtn.className = 'fas fa-bars';
            }
        }
    }
});

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobileMenu');
            const toggleBtn = document.querySelector('.mobile-menu-toggle i');
            
            if (mobileMenu && mobileMenu.classList.contains('show')) {
                mobileMenu.classList.remove('show');
                if (toggleBtn) {
                    toggleBtn.className = 'fas fa-bars';
                }
            }
        });
    });
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#home') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const offsetTop = targetElement.offsetTop - 80; // Account for navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Handle search functionality
function handleSearch(searchInput) {
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
        // You can implement your search logic here
        console.log('Searching for:', searchTerm);
        
        // Example: redirect to search page
        // window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
        
        // Or implement live search
        // performLiveSearch(searchTerm);
        
        alert(`Searching for: ${searchTerm}`);
    }
}

// Add search functionality to both desktop and mobile search
document.addEventListener('DOMContentLoaded', function() {
    // Desktop search
    const desktopSearchForm = document.querySelector('.search-box');
    if (desktopSearchForm) {
        const desktopSearchInput = desktopSearchForm.querySelector('input');
        const desktopSearchButton = desktopSearchForm.querySelector('button');
        
        desktopSearchButton.addEventListener('click', function(e) {
            e.preventDefault();
            handleSearch(desktopSearchInput);
        });
        
        desktopSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch(desktopSearchInput);
            }
        });
    }
    
    // Mobile search
    const mobileSearchForm = document.querySelector('.mobile-search');
    if (mobileSearchForm) {
        const mobileSearchInput = mobileSearchForm.querySelector('input');
        const mobileSearchButton = mobileSearchForm.querySelector('button');
        
        mobileSearchButton.addEventListener('click', function(e) {
            e.preventDefault();
            handleSearch(mobileSearchInput);
        });
        
        mobileSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch(mobileSearchInput);
            }
        });
    }
});

// Navbar scroll effect (optional)
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    const mobileMenu = document.getElementById('mobileMenu');
    const toggleBtn = document.querySelector('.mobile-menu-toggle i');
    
    // Close mobile menu on resize to desktop view
    if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('show')) {
        mobileMenu.classList.remove('show');
        if (toggleBtn) {
            toggleBtn.className = 'fas fa-bars';
        }
    }
});

// Shopping cart and wishlist badge update functions
function updateCartBadge(count) {
    const cartBadges = document.querySelectorAll('.fas.fa-shopping-cart + .badge');
    cartBadges.forEach(badge => {
        badge.textContent = count;
        if (count > 0) {
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    });
}

function updateWishlistBadge(count) {
    const wishlistBadges = document.querySelectorAll('.far.fa-heart + .badge');
    wishlistBadges.forEach(badge => {
        badge.textContent = count;
        if (count > 0) {
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    });
}

// Example usage:
// updateCartBadge(5);
// updateWishlistBadge(2);

// Initialize tooltips or any other functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('MozArt Navbar initialized successfully!');
    
    // Add any initialization code here
    // For example, load cart count from localStorage
    // const cartCount = localStorage.getItem('cartCount') || 0;
    // updateCartBadge(cartCount);
});


document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;

    // Background image and color handling
    document.querySelectorAll('[data-bg-image]').forEach(function(element) {
        const image = element.getAttribute('data-bg-image');
        element.style.backgroundImage = `url(${image})`;
    });

    document.querySelectorAll('[data-bg-color]').forEach(function(element) {
        const color = element.getAttribute('data-bg-color');
        element.style.backgroundColor = color;
    });

    // Sticky header
    window.addEventListener('scroll', function() {
        const stickyHeaders = document.querySelectorAll('.sticky-header');
        if (window.scrollY > 350) {
            stickyHeaders.forEach(header => header.classList.add('is-sticky'));
        } else {
            stickyHeaders.forEach(header => header.classList.remove('is-sticky'));
        }
    });

    // Submenu and mega menu alignment
    const subMenuMegaMenuAlignment = () => {
        const siteMainMenus = document.querySelectorAll('.site-main-menu');
        let thisElement;

        siteMainMenus.forEach(function(menu) {
            thisElement = menu;
            if ((thisElement.classList.contains('site-main-menu-left') || thisElement.classList.contains('site-main-menu-right')) && 
                thisElement.closest('.section-fluid')) {
                const megaMenu = thisElement.querySelector('.mega-menu');
                thisElement.style.position = "relative";
                
                if (thisElement.classList.contains('site-main-menu-left')) {
                    if (megaMenu) {
                        megaMenu.style.left = "0px";
                        megaMenu.style.right = "auto";
                    }
                } else if (thisElement.classList.contains('site-main-menu-left')) {
                    if (megaMenu) {
                        megaMenu.style.right = "0px";
                        megaMenu.style.left = "auto";
                    }
                }
            }
        });

        const subMenus = document.querySelectorAll('.sub-menu');
        if (subMenus.length) {
            subMenus.forEach(function(subMenu) {
                thisElement = subMenu;
                const elementRect = thisElement.getBoundingClientRect();
                const elementOffsetLeft = elementRect.left + window.scrollX;
                const elementWidth = thisElement.offsetWidth;
                const windowWidth = window.innerWidth - 10;
                const isElementVisible = (elementOffsetLeft + elementWidth < windowWidth);
                
                if (!isElementVisible) {
                    if (thisElement.classList.contains('mega-menu')) {
                        const parentRect = thisElement.parentElement.getBoundingClientRect();
                        const thisOffsetLeft = parentRect.left + window.scrollX;
                        const widthDiff = windowWidth - elementWidth;
                        const leftPos = thisOffsetLeft - (widthDiff / 2);
                        
                        thisElement.style.left = -leftPos + "px";
                        thisElement.style.setProperty("left", -leftPos + "px", "important");
                        thisElement.parentElement.style.position = "relative";
                    } else {
                        thisElement.parentElement.classList.add('align-left');
                    }
                } else {
                    thisElement.removeAttribute('style');
                    thisElement.parentElement.classList.remove('align-left');
                }
            });
        }
    };

    // Call the function initially
    subMenuMegaMenuAlignment();
    
    // Recalculate on window resize
    window.addEventListener('resize', subMenuMegaMenuAlignment);

    // Home slider (Swiper)
    // Note: This assumes Swiper is loaded as a global variable
    if (typeof Swiper !== 'undefined') {
        const homeSlider = new Swiper('.home-slider', {
            loop: true,
            loopedSlides: 2,
            speed: 750,
            spaceBetween: 200,
            pagination: {
                el: '.home-slider-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.home-slider-next',
                prevEl: '.home-slider-prev',
            },
            autoplay: {},
        });
    }

    // Slick sliders
    if (typeof window.slick === 'function' || (typeof $ === 'function' && typeof $.fn.slick === 'function')) {
        // Helper function to initialize slick with vanilla JS
        const initSlick = (selector, options) => {
            if (typeof $ === 'function' && typeof $.fn.slick === 'function') {
                $(selector).slick(options);
            } else if (typeof window.slick === 'function') {
                document.querySelectorAll(selector).forEach(el => {
                    window.slick(el, options);
                });
            }
        };

        // Testimonial 
        initSlick('.testimonial-slider', {
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button class="slick-prev"><i class="fa-solid fa-angle-left"></i></button>',
            nextArrow: '<button class="slick-next"><i class="fa-solid fa-angle-right"></i></button>'
        });

        initSlick('.testimonial-carousel', {
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '<button class="slick-prev"><i class="fa-solid fa-angle-left"></i></button>',
            nextArrow: '<button class="slick-next"><i class="fa-solid fa-angle-right"></i></button>',
            responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1
                }
            }]
        });

        // Instagram feed carousel 1
        initSlick('.instafeed-carousel1', {
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            prevArrow: '<button class="slick-prev"><i class="fa-solid fa-angle-left"></i></button>',
            nextArrow: '<button class="slick-next"><i class="fa-solid fa-angle-right"></i></button>',
            responsive: [{
                breakpoint: 119,
                settings: {
                    slidesToShow: 4
                }
            }, {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1
                }
            }]
        });

        // Instagram feed carousel 2
        initSlick('.instafeed-carousel2', {
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '<button class="slick-prev"><i class="fa-solid fa-angle-left"></i></button>',
            nextArrow: '<button class="slick-next"><i class="fa-solid fa-angle-right"></i></button>',
            responsive: [{
                breakpoint: 767,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1
                }
            }]
        });
    }

    // Scroll to top functionality
    // This is a simplified version of the $.scrollUp plugin
    const createScrollToTop = () => {
        // Create the button element
        const scrollButton = document.createElement('div');
        scrollButton.id = 'scrollUp';
        scrollButton.innerHTML = '<i class="fas fa-long-arrow-alt-up"></i>';
        scrollButton.style.display = 'none';
        scrollButton.style.position = 'fixed';
        scrollButton.style.zIndex = '2147483647';
        scrollButton.style.bottom = '20px';
        scrollButton.style.right = '20px';
        scrollButton.style.cursor = 'pointer';
        document.body.appendChild(scrollButton);

        // Show/hide based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                scrollButton.style.display = 'block';
            } else {
                scrollButton.style.display = 'none';
            }
        });

        // Scroll to top when clicked
        scrollButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    createScrollToTop();
});




// Quick View Modal - Initialize slider when modal is shown
const quickViewModal = document.getElementById('quickViewModal');

if (quickViewModal) {
    // For Bootstrap 5
    quickViewModal.addEventListener('shown.bs.modal', function(e) {
        initializeQuickViewSlider();
    });
    
    // For Bootstrap 4 (fallback)
    if (typeof $ !== 'undefined' && typeof $.fn.modal !== 'undefined') {
        $('#quickViewModal').on('shown.bs.modal', function(e) {
            initializeQuickViewSlider();
        });
    }
}

function initializeQuickViewSlider() {
    const sliderElement = document.querySelector('.product-gallery-slider-quickview');
    
    if (sliderElement) {
        // Check if Slick is available and initialize
        if (typeof $ !== 'undefined' && typeof $.fn.slick !== 'undefined') {
            // Use jQuery Slick if available
            $('.product-gallery-slider-quickview').slick({
                dots: true,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                prevArrow: '<button class="slick-prev"><i class="ti-angle-left"></i></button>',
                nextArrow: '<button class="slick-next"><i class="ti-angle-right"></i></button>'
            });
        } else if (typeof Slick !== 'undefined') {
            // Use vanilla Slick if available
            new Slick(sliderElement, {
                dots: true,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                prevArrow: '<button class="slick-prev"><i class="ti-angle-left"></i></button>',
                nextArrow: '<button class="slick-next"><i class="ti-angle-right"></i></button>'
            });
        } else {
            // Fallback: Create a simple custom slider
            createCustomSlider(sliderElement);
        }
    }
}

// Custom slider implementation as fallback
function createCustomSlider(container) {
    const slides = container.querySelectorAll('.slide, .slick-slide, img');
    if (slides.length <= 1) return;
    
    let currentSlide = 0;
    
    // Create slider structure
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    
    // Hide all slides except first
    slides.forEach((slide, index) => {
        slide.style.display = index === 0 ? 'block' : 'none';
        slide.style.width = '100%';
    });
    
    // Create navigation buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'slick-prev custom-prev';
    prevButton.innerHTML = '<i class="ti-angle-left"></i>';
    prevButton.style.cssText = `
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        background: rgba(0,0,0,0.5);
        color: white;
        border: none;
        padding: 10px;
        cursor: pointer;
    `;
    
    const nextButton = document.createElement('button');
    nextButton.className = 'slick-next custom-next';
    nextButton.innerHTML = '<i class="ti-angle-right"></i>';
    nextButton.style.cssText = `
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        background: rgba(0,0,0,0.5);
        color: white;
        border: none;
        padding: 10px;
        cursor: pointer;
    `;
    
    // Create dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slick-dots custom-dots';
    dotsContainer.style.cssText = `
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
        z-index: 10;
    `;
    
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = index === 0 ? 'active' : '';
        dot.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: none;
            background: ${index === 0 ? 'white' : 'rgba(255,255,255,0.5)'};
            cursor: pointer;
        `;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // Add elements to container
    container.appendChild(prevButton);
    container.appendChild(nextButton);
    container.appendChild(dotsContainer);
    
    // Navigation functions
    function goToSlide(index) {
        slides[currentSlide].style.display = 'none';
        dotsContainer.children[currentSlide].style.background = 'rgba(255,255,255,0.5)';
        dotsContainer.children[currentSlide].classList.remove('active');
        
        currentSlide = index;
        slides[currentSlide].style.display = 'block';
        dotsContainer.children[currentSlide].style.background = 'white';
        dotsContainer.children[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }
    
    // Event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
    
    // Auto-play (optional)
    // setInterval(nextSlide, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
    const userAccountBtn = document.getElementById("userAccountBtn")
    const userDropdown = document.getElementById("userDropdown")
    let isDropdownOpen = false
  
    if (userAccountBtn && userDropdown) {
      userAccountBtn.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()
  
        isDropdownOpen = !isDropdownOpen
  
        if (isDropdownOpen) {
          userDropdown.classList.add("show")
          userAccountBtn.setAttribute("aria-expanded", "true")
        } else {
          userDropdown.classList.remove("show")
          userAccountBtn.setAttribute("aria-expanded", "false")
        }
      })
  
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".user-account-dropdown")) {
          userDropdown.classList.remove("show")
          userAccountBtn.setAttribute("aria-expanded", "false")
          isDropdownOpen = false
        }
      })
  
      userAccountBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          userAccountBtn.click()
        }
  
        if (e.key === "Escape") {
          userDropdown.classList.remove("show")
          userAccountBtn.setAttribute("aria-expanded", "false")
          isDropdownOpen = false
          userAccountBtn.focus()
        }
      })
  
      const dropdownItems = userDropdown.querySelectorAll(".dropdown-item")
  
      dropdownItems.forEach((item, index) => {
        item.addEventListener("keydown", (e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault()
            const nextItem = dropdownItems[index + 1] || dropdownItems[0]
            nextItem.focus()
          }
  
          if (e.key === "ArrowUp") {
            e.preventDefault()
            const prevItem = dropdownItems[index - 1] || dropdownItems[dropdownItems.length - 1]
            prevItem.focus()
          }
  
          if (e.key === "Escape") {
            userDropdown.classList.remove("show")
            userAccountBtn.setAttribute("aria-expanded", "false")
            isDropdownOpen = false
            userAccountBtn.focus()
          }
        })
      })
  
      userAccountBtn.setAttribute("aria-haspopup", "true")
      userAccountBtn.setAttribute("aria-expanded", "false")
    }
  
    const mobileMenuToggle = document.querySelector(".fa-bars")
    const mobileMenu = document.querySelector(".responsive-menu #menu")
  
    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("active")
      })
    }
  
    const anchorLinks = document.querySelectorAll('a[href^="#"]')
  
    anchorLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href")
  
        if (href !== "#") {
          const target = document.querySelector(href)
  
          if (target) {
            e.preventDefault()
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        }
      })
    })
  
    console.log(" Header user account functionality initialized!")
  })
  
  window.checkUserLogin = () => {
    
    return false
  }
  
  window.updateUserDropdown = (userData) => {
    const userDropdown = document.getElementById("userDropdown")
  
    if (userDropdown && userData) {
      userDropdown.innerHTML = `
        <a href="profile.html" class="dropdown-item">
          <i class="fas fa-user"></i> Profile
        </a>
        <a href="my-reservations.html" class="dropdown-item">
          <i class="fas fa-calendar-alt"></i> My Reservations
        </a>
        <a href="settings.html" class="dropdown-item">
          <i class="fas fa-cog"></i> Settings
        </a>
        <div style="border-top: 1px solid rgba(228, 204, 180, 0.2); margin: 8px 0;"></div>
        <a href="#" class="dropdown-item" onclick="logout()">
          <i class="fas fa-sign-out-alt"></i> Logout
        </a>
      `
    }
  }
  
  window.logout = () => {
    localStorage.removeItem("userData")
    sessionStorage.removeItem("userToken")
    window.location.href = "home.html"
  }


  document.addEventListener("DOMContentLoaded", () => {
    const userAccountBtn = document.getElementById("userAccountBtn")
    const userDropdown = document.getElementById("userDropdown")
    let isDropdownOpen = false
  
    if (userAccountBtn && userDropdown) {
      userAccountBtn.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()
  
        isDropdownOpen = !isDropdownOpen
  
        if (isDropdownOpen) {
          userDropdown.classList.add("show")
          userAccountBtn.setAttribute("aria-expanded", "true")
        } else {
          userDropdown.classList.remove("show")
          userAccountBtn.setAttribute("aria-expanded", "false")
        }
      })
  
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".user-account-dropdown")) {
          userDropdown.classList.remove("show")
          userAccountBtn.setAttribute("aria-expanded", "false")
          isDropdownOpen = false
        }
      })
  
      userAccountBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          userAccountBtn.click()
        }
  
        if (e.key === "Escape") {
          userDropdown.classList.remove("show")
          userAccountBtn.setAttribute("aria-expanded", "false")
          isDropdownOpen = false
          userAccountBtn.focus()
        }
      })
  
      const dropdownItems = userDropdown.querySelectorAll(".dropdown-item")
  
      dropdownItems.forEach((item, index) => {
        item.addEventListener("keydown", (e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault()
            const nextItem = dropdownItems[index + 1] || dropdownItems[0]
            nextItem.focus()
          }
  
          if (e.key === "ArrowUp") {
            e.preventDefault()
            const prevItem = dropdownItems[index - 1] || dropdownItems[dropdownItems.length - 1]
            prevItem.focus()
          }
  
          if (e.key === "Escape") {
            userDropdown.classList.remove("show")
            userAccountBtn.setAttribute("aria-expanded", "false")
            isDropdownOpen = false
            userAccountBtn.focus()
          }
        })
      })
  
      userAccountBtn.setAttribute("aria-haspopup", "true")
      userAccountBtn.setAttribute("aria-expanded", "false")
    }
  
    const mobileMenuToggle = document.querySelector(".fa-bars")
    const mobileMenu = document.querySelector(".responsive-menu #menu")
  
    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("active")
      })
    }
  
    const anchorLinks = document.querySelectorAll('a[href^="#"]')
  
    anchorLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href")
  
        if (href !== "#") {
          const target = document.querySelector(href)
  
          if (target) {
            e.preventDefault()
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        }
      })
    })
  
    console.log(" Header user account functionality initialized!")
  })
  
  window.checkUserLogin = () => {
    
    return false
  }
  
  window.updateUserDropdown = (userData) => {
    const userDropdown = document.getElementById("userDropdown")
  
    if (userDropdown && userData) {
      userDropdown.innerHTML = `
        <a href="profile.html" class="dropdown-item">
          <i class="fas fa-user"></i> Profile
        </a>
        <a href="my-reservations.html" class="dropdown-item">
          <i class="fas fa-calendar-alt"></i> My Reservations
        </a>
        <a href="settings.html" class="dropdown-item">
          <i class="fas fa-cog"></i> Settings
        </a>
        <div style="border-top: 1px solid rgba(228, 204, 180, 0.2); margin: 8px 0;"></div>
        <a href="#" class="dropdown-item" onclick="logout()">
          <i class="fas fa-sign-out-alt"></i> Logout
        </a>
      `
    }
  }
  
  window.logout = () => {
    localStorage.removeItem("userData")
    sessionStorage.removeItem("userToken")
    window.location.href = "home.html"
  }