"use strict";

document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;

    document.querySelectorAll('[data-bg-image]').forEach(function(element) {
        const image = element.getAttribute('data-bg-image');
        element.style.backgroundImage = `url(${image})`;
    });

    document.querySelectorAll('[data-bg-color]').forEach(function(element) {
        const color = element.getAttribute('data-bg-color');
        element.style.backgroundColor = color;
    });

    window.addEventListener('scroll', function() {
        const stickyHeaders = document.querySelectorAll('.sticky-header');
        if (window.scrollY > 350) {
            stickyHeaders.forEach(header => header.classList.add('is-sticky'));
        } else {
            stickyHeaders.forEach(header => header.classList.remove('is-sticky'));
        }
    });

    const subMenuMegaMenuAlignment = () => {
        const siteMainMenus = document.querySelectorAll('.site-main-menu');

        siteMainMenus.forEach(function(menu) {
            if ((menu.classList.contains('site-main-menu-left') || menu.classList.contains('site-main-menu-right')) && 
                menu.closest('.section-fluid')) {
                const megaMenu = menu.querySelector('.mega-menu');
                menu.style.position = "relative";
                
                if (menu.classList.contains('site-main-menu-left')) {
                    if (megaMenu) {
                        megaMenu.style.left = "0px";
                        megaMenu.style.right = "auto";
                    }
                } else if (menu.classList.contains('site-main-menu-left')) {
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
                const elementOffsetLeft = subMenu.getBoundingClientRect().left;
                const elementWidth = subMenu.offsetWidth;
                const windowWidth = window.innerWidth - 10;
                const isElementVisible = (elementOffsetLeft + elementWidth < windowWidth);
                
                if (!isElementVisible) {
                    if (subMenu.classList.contains('mega-menu')) {
                        const thisOffsetLeft = subMenu.parentElement.getBoundingClientRect().left;
                        const widthDiff = windowWidth - elementWidth;
                        const leftPos = thisOffsetLeft - (widthDiff / 2);
                        
                        subMenu.style.left = -leftPos + "px";
                        subMenu.parentElement.style.position = "relative";
                    } else {
                        subMenu.parentElement.classList.add('align-left');
                    }
                } else {
                    subMenu.style.left = '';
                    subMenu.parentElement.classList.remove('align-left');
                }
            });
        }
    };

    subMenuMegaMenuAlignment();
    
    window.addEventListener('resize', subMenuMegaMenuAlignment);

    (function() {
        const offCanvasToggles = document.querySelectorAll('.offcanvas-toggle');
        const offCanvases = document.querySelectorAll('.offcanvas');
        const offCanvasOverlay = document.querySelector('.offcanvas-overlay');
        const mobileMenuToggles = document.querySelectorAll('.mobile-menu-toggle');

        offCanvasToggles.forEach(function(toggle) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                const target = this.getAttribute('href');
                body.classList.add('offcanvas-open');
                document.querySelector(target).classList.add('offcanvas-open');
                if (offCanvasOverlay) offCanvasOverlay.style.display = 'block';
                
                if (this.parentElement.classList.contains('mobile-menu-toggle')) {
                    this.classList.add('close');
                }
            });
        });

        const closeElements = document.querySelectorAll('.offcanvas-close, .offcanvas-overlay');
        closeElements.forEach(function(element) {
            element.addEventListener('click', function(e) {
                e.preventDefault();
                body.classList.remove('offcanvas-open');
                
                offCanvases.forEach(function(canvas) {
                    canvas.classList.remove('offcanvas-open');
                });
                
                if (offCanvasOverlay) offCanvasOverlay.style.display = 'none';
                
                mobileMenuToggles.forEach(function(toggle) {
                    const link = toggle.querySelector('a');
                    if (link) link.classList.remove('close');
                });
            });
        });
    })();

    function mobileOffCanvasMenu() {
        const offCanvasNavs = document.querySelectorAll('.offcanvas-menu, .overlay-menu');
        
        offCanvasNavs.forEach(function(nav) {
            const subMenus = nav.querySelectorAll('.sub-menu');
            
            subMenus.forEach(function(subMenu) {
                if (!subMenu.parentElement.querySelector('.menu-expand')) {
                    const menuExpand = document.createElement('span');
                    menuExpand.className = 'menu-expand';
                    subMenu.parentElement.insertBefore(menuExpand, subMenu);
                }
            });

            nav.addEventListener('click', function(e) {
                const target = e.target;
                
                if (target.tagName === 'A' || target.classList.contains('menu-expand')) {
                    if (target.getAttribute('href') === '#' || target.classList.contains('menu-expand')) {
                        e.preventDefault();
                        
                        const li = target.closest('li');
                        const ul = li.querySelector('ul');
                        
                        if (ul && ul.style.display === 'block') {
                            li.classList.remove('active');
                            ul.style.display = 'none';
                            
                            const activeLis = li.querySelectorAll('li.active');
                            activeLis.forEach(function(activeLi) {
                                activeLi.classList.remove('active');
                            });
                            
                            const visibleUls = li.querySelectorAll('ul[style="display: block"]');
                            visibleUls.forEach(function(visibleUl) {
                                visibleUl.style.display = 'none';
                            });
                        } else if (ul) {
                            li.classList.add('active');
                            
                            const siblings = Array.from(li.parentElement.children).filter(child => child !== li);
                            siblings.forEach(function(sibling) {
                                sibling.classList.remove('active');
                                const activeLis = sibling.querySelectorAll('li.active');
                                activeLis.forEach(function(activeLi) {
                                    activeLi.classList.remove('active');
                                });
                                
                                const visibleUls = sibling.querySelectorAll('ul[style="display: block"]');
                                visibleUls.forEach(function(visibleUl) {
                                    visibleUl.style.display = 'none';
                                });
                            });
                            
                            ul.style.display = 'block';
                        }
                    }
                }
            });
        });
    }
    
    mobileOffCanvasMenu();

    const headerCategories = document.querySelectorAll('.header-categories');
    headerCategories.forEach(function(category) {
        const toggles = category.querySelectorAll('.category-toggle');
        toggles.forEach(function(toggle) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                    const list = this.nextElementSibling;
                    if (list && list.classList.contains('header-category-list')) {
                        list.style.display = 'none';
                    }
                } else {
                    this.classList.add('active');
                    const list = this.nextElementSibling;
                    if (list && list.classList.contains('header-category-list')) {
                        list.style.display = 'block';
                    }
                }
            });
        });
    });

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
    }


    
});