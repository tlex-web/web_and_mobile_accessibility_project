/**
 * Keyboard event handlers for accessible navigation.
 * Handles ESC (close menu), Space (activate items), and Tab-out (close menu on blur).
 * Loaded after common.js on all pages.
 */
document.addEventListener('DOMContentLoaded', function() {
    var navContent = document.getElementById('nav-bar-content');
    if (!navContent) return;

    /**
     * ESC key: close open sub-menu and return focus to toggle button
     * Per NAV-05, D-06
     */
    navContent.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            var openMenu = navContent.querySelector('.dropdown-menu.show');
            if (openMenu) {
                var toggle = openMenu.parentNode.querySelector('.dropdown-toggle');
                openMenu.classList.remove('show');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.focus();
            }
        }
    });

    /**
     * SPACE key: activate menu items (toggles, links, dropdown items)
     * Per NAV-06, D-08. Prevents default scroll behavior (Pitfall 4).
     */
    navContent.addEventListener('keydown', function(event) {
        if (event.key === ' ' || event.key === 'Spacebar') {
            var target = event.target;
            if (target.classList.contains('dropdown-toggle') ||
                target.classList.contains('dropdown-item') ||
                target.classList.contains('nav-link')) {
                event.preventDefault();
                target.click();
            }
        }
    });

    /**
     * Tab-out detection: close dropdown when focus leaves container
     * Per NAV-07, D-07. Uses focusout + relatedTarget (Pitfall 2: handles null).
     */
    var dropdowns = navContent.querySelectorAll('.dropdown');
    for (var i = 0; i < dropdowns.length; i++) {
        dropdowns[i].addEventListener('focusout', function(event) {
            var dropdown = this;
            // relatedTarget is null when focus goes to browser chrome — treat as "left"
            if (!event.relatedTarget || !dropdown.contains(event.relatedTarget)) {
                var menu = dropdown.querySelector('.dropdown-menu.show');
                if (menu) {
                    menu.classList.remove('show');
                    var toggle = dropdown.querySelector('.dropdown-toggle');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }
});
