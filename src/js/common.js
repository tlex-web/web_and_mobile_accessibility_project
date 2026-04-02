/**
 * Open the current clicked menu and close the other menus
 * @param {object} event - The DOM event
 */
function openMenu(event) {
    event.stopPropagation();
    event.preventDefault();

    var currentDropDownButton = event.target;
    var currentDropDownMenu =
        currentDropDownButton.parentNode.querySelector('.dropdown-menu');
    var isOpen = currentDropDownMenu.classList.contains('show');

    // Close all menus and reset aria-expanded
    var dropDownMenus =
        document.querySelectorAll('#nav-bar-content .dropdown .dropdown-menu');
    var dropDownToggles =
        document.querySelectorAll('#nav-bar-content .dropdown-toggle');
    for (var j = 0; j < dropDownMenus.length; j++) {
        dropDownMenus[j].classList.remove('show');
    }
    for (var k = 0; k < dropDownToggles.length; k++) {
        dropDownToggles[k].setAttribute('aria-expanded', 'false');
    }

    if (!isOpen) {
        currentDropDownMenu.classList.add('show');
        currentDropDownButton.setAttribute('aria-expanded', 'true');
    }
}

/**
 * Toggle the navigation content
 * @param {object} event - The DOM event
 */
function toggleNavigation(event) {
    event.stopPropagation();
    event.preventDefault();

    var content = document.getElementById('nav-bar-content');
    var toggler = document.querySelector('.navbar-toggler');
    if (content.classList.contains('collapse')) {
        content.classList.remove('collapse');
        toggler.setAttribute('aria-expanded', 'true');
    } else {
        content.classList.add('collapse');
        toggler.setAttribute('aria-expanded', 'false');
    }
}

/** High contrast mode localStorage key */
var HIGH_CONTRAST_KEY = 'highContrast';

/**
 * Toggle high contrast mode on/off
 */
function toggleHighContrast() {
    var isActive = document.body.classList.toggle('high-contrast');
    localStorage.setItem(HIGH_CONTRAST_KEY, isActive ? 'on' : 'off');

    var buttons = document.querySelectorAll('.high-contrast-button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute('aria-pressed', isActive ? 'true' : 'false');
    }

    announceFontSize(isActive ? 'High contrast mode: on' : 'High contrast mode: off');
}

/** Font size levels and localStorage key */
var FONT_SIZES = ['normal', 'large', 'xlarge'];
var FONT_SIZE_KEY = 'fontSize';

/**
 * Get the current font size level index
 * @returns {number} Index in FONT_SIZES array
 */
function getCurrentFontSizeIndex() {
    var stored = localStorage.getItem(FONT_SIZE_KEY);
    var index = FONT_SIZES.indexOf(stored);
    return index >= 0 ? index : 0;
}

/**
 * Apply a font size level to the page
 * @param {string} level - One of 'normal', 'large', 'xlarge'
 */
function applyFontSize(level) {
    var body = document.body;
    body.classList.remove('font-large', 'font-xlarge');

    if (level === 'large') {
        body.classList.add('font-large');
        document.documentElement.style.fontSize = '1.25rem';
    } else if (level === 'xlarge') {
        body.classList.add('font-xlarge');
        document.documentElement.style.fontSize = '1.5rem';
    } else {
        document.documentElement.style.fontSize = '1rem';
    }

    localStorage.setItem(FONT_SIZE_KEY, level);
}

/**
 * Announce font size change to screen readers via live region
 * @param {string} message - The message to announce
 */
function announceFontSize(message) {
    var region = document.getElementById('font-size-live-region');
    if (!region) return;
    region.textContent = '';
    setTimeout(function() {
        region.textContent = message;
    }, 100);
}

/**
 * Increase font size by one level
 */
function increaseFontSize() {
    var index = getCurrentFontSizeIndex();
    if (index >= FONT_SIZES.length - 1) {
        announceFontSize('Font size: maximum reached');
        return;
    }
    var newLevel = FONT_SIZES[index + 1];
    applyFontSize(newLevel);
    var messages = { 'large': 'Font size: large', 'xlarge': 'Font size: extra large' };
    announceFontSize(messages[newLevel] || '');
}

/**
 * Decrease font size by one level
 */
function decreaseFontSize() {
    var index = getCurrentFontSizeIndex();
    if (index <= 0) {
        announceFontSize('Font size: minimum reached');
        return;
    }
    var newLevel = FONT_SIZES[index - 1];
    applyFontSize(newLevel);
    var messages = { 'normal': 'Font size: normal', 'large': 'Font size: large' };
    announceFontSize(messages[newLevel] || '');
}

document.addEventListener('DOMContentLoaded', function() {
    // Dropdown toggle click handlers
    var dropDownToggles =
        document.querySelectorAll('#nav-bar-content .dropdown-toggle');
    for (var i = 0; i < dropDownToggles.length; i++) {
        dropDownToggles[i].addEventListener('click', openMenu, false);
    }

    // Hamburger toggle
    document.querySelector('.navbar-toggler')
        .addEventListener('click', toggleNavigation, false);

    // Restore font size from localStorage
    var storedSize = localStorage.getItem(FONT_SIZE_KEY);
    if (storedSize && FONT_SIZES.indexOf(storedSize) > 0) {
        applyFontSize(storedSize);
    }

    // Font size button listeners (desktop + mobile)
    var increaseButtons = document.querySelectorAll('.font-increase-button');
    var decreaseButtons = document.querySelectorAll('.font-decrease-button');
    for (var j = 0; j < increaseButtons.length; j++) {
        increaseButtons[j].addEventListener('click', increaseFontSize, false);
    }
    for (var k = 0; k < decreaseButtons.length; k++) {
        decreaseButtons[k].addEventListener('click', decreaseFontSize, false);
    }

    // Restore high contrast from localStorage
    if (localStorage.getItem(HIGH_CONTRAST_KEY) === 'on') {
        document.body.classList.add('high-contrast');
        var hcButtons = document.querySelectorAll('.high-contrast-button');
        for (var m = 0; m < hcButtons.length; m++) {
            hcButtons[m].setAttribute('aria-pressed', 'true');
        }
    }

    // High contrast button listeners
    var contrastButtons = document.querySelectorAll('.high-contrast-button');
    for (var n = 0; n < contrastButtons.length; n++) {
        contrastButtons[n].addEventListener('click', toggleHighContrast, false);
    }
}, false);
