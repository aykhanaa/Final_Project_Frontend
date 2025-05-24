"use strict";

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