document.addEventListener('DOMContentLoaded', function() {
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