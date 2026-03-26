<!-- GSD:project-start source:PROJECT.md -->
## Project

**Web and Mobile Accessibility — Course Project**

A university course project for UZH's "Web and Mobile Accessibility" course (Prof. Dr. Alireza Darvishy). The task is to take a sample website with intentional accessibility problems across 4 HTML pages and fix them according to WCAG guidelines, HTML5 semantics, and ARIA best practices. The deliverables are the fixed implementation (80%), a 10-minute presentation (10%), and a reflective report (10%).

**Core Value:** Every page of the sample website must be fully navigable and usable with a screen reader (JAWS/VoiceOver), with proper semantic structure, keyboard support, and ARIA attributes.

### Constraints

- **Tech stack**: Must use existing HTML/CSS/JS — no frameworks, no build tools, no npm
- **Browser**: Chrome is the target browser for testing
- **Screen reader**: JAWS (Windows) or VoiceOver (Mac) — implementation must work with these
- **Standards**: WCAG 2.1 AA compliance is the target
- **Scope**: Exercises 1-7 from the course handout; no additional features beyond what's asked
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- HTML5 - Used for all page markup and semantic structure
- JavaScript (ES5/ES6) - Used for client-side interactivity and form validation
- CSS3 - Used for styling and responsive design
- Python 3 - Used for local development server (for serving HTML pages)
## Runtime
- Browser (client-side) - Chrome recommended (explicitly mentioned in documentation)
- No backend runtime detected - This is a static site served over HTTP/HTTPS
- None - All dependencies are embedded directly as local files
- Lockfile: Not applicable
## Frameworks
- Bootstrap 4.0.0 - Comprehensive CSS framework for responsive grid layout and components
- jQuery 3.2.1 - JavaScript library for DOM manipulation and event handling
- Popper.js - Positioning library for Bootstrap dropdowns
- WAVE Accessibility Plugin - Chrome extension for accessibility evaluation
- JAWS - Screen reader for accessibility testing
- ZoomText - Magnification and accessibility software
- Python 3 SimpleHTTPServer or similar - Development server for local testing
## Key Dependencies
- `src/js/jquery.js` - jQuery 3.2.1 library (self-contained)
- `src/js/popper.js` - Popper.js library for dropdown positioning
- `src/js/bootstrap.js` - Bootstrap 4.0.0 JavaScript components
- `src/css/bootstrap.css` - Bootstrap 4.0.0 CSS (8,340 lines, minified)
## Configuration
- No environment variables required
- No .env files present
- Static asset serving only
- No build configuration files (webpack, babel, etc.)
- No package.json or dependency manifest files
- Direct file serving approach
## Platform Requirements
- Windows 10+ (as per installation documentation)
- Chrome browser (explicitly recommended)
- Optional screen reader (JAWS) and magnification software (ZoomText)
- Python 3 (for local development server)
- Optional: WAVE Chrome Extension
- Any modern browser (Chrome, Firefox, Safari, Edge)
- HTTP/HTTPS server capable of serving static files
- No server-side runtime required
## Browser Support
- Chrome (primary target)
- All modern browsers supporting:
## Asset Organization
- `src/index.html` - Homepage
- `src/login.html` - Login and registration page
- `src/article.html` - Article detail page
- `src/empty.html` - Template page for dynamic content
- `src/css/` - All CSS files (bootstrap.css, common.css, page-specific CSS)
- `src/js/` - All JavaScript files (jquery.js, popper.js, bootstrap.js, page-specific JS)
- `src/img/` - Image assets
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- Lowercase with hyphens for separators: `login.js`, `common.js`, `article.css`
- Paired HTML/JS/CSS files with matching names: `login.html`, `login.js`, `login.css`
- External library files preserved with original naming: `bootstrap.js`, `jquery.js`, `popper.js`
- camelCase naming convention
- Descriptive names indicating purpose: `openMenu()`, `toggleNavigation()`, `setValid()`, `setInvalid()`, `getUrlParameter()`
- Verb-first pattern for action functions: `setValid()`, `removeValidation()`, `login()`, `register()`, `forgot()`
- camelCase naming convention
- Descriptive names for clarity: `currentDropDownButton`, `currentDropDownMenu`, `dropDownMenus`, `hasError`
- Use of `var` keyword exclusively (ES5 style, no `let`/`const`)
- Boolean variables prefixed with `is` or contain verb forms: `isOpen`, `hasError`
- PascalCase for constructor functions: `Alert`, `Button`, `Carousel`, `Collapse`, `Dropdown` (in bootstrap.js)
- Lowercase for utility objects: `Util` (mixed pattern observed in libraries)
## Code Style
- No automated formatter configured (no `.prettierrc`, `eslint`, or similar detected)
- Manual formatting observed:
- No linter configuration detected
- Code relies on manual review and basic validation
## Import Organization
- No module imports/exports in custom code
- External libraries loaded via `<script>` tags in HTML files
- Load order in `src/login.html`:
- Relative paths only: `./js/`, `./css/`, `./img/`
- No path aliasing system configured
## Error Handling
- Validation-focused error handling (form validation)
- No try-catch blocks in custom code
- Errors handled through form validation state:
## Logging
- No structured logging in custom code
- Console methods not used for debugging/logging
- Reliance on browser developer tools for debugging
- No log statements or debug output in `src/js/common.js`, `src/js/login.js`, `src/js/empty.js`
## Comments
- JSDoc comments used for all public functions
- Parameter descriptions included for clarity
- Return value documentation included
## Function Design
- Small, focused functions (most under 50 lines)
- Examples: `setValid()` (3 lines), `toggleNavigation()` (8 lines), `openMenu()` (17 lines)
- Longer functions: `register()` (67 lines), `login()` (35 lines) for complex validation logic
- Minimal parameters (1-2 typically)
- DOM event objects passed directly as `event` parameter
- DOM elements queried within function rather than passed as parameters
- Mostly void (functions modify DOM state)
- Utility functions return values: `getUrlParameter()` returns string or null
## Module Design
- No module export system
- Global function definitions loaded via `<script>` tags
- Functions attached to global scope
- Not applicable (no module system)
- `index.js` is empty: `src/js/index.js`
- Functionality organized by feature pages: `common.js`, `login.js`, `article.js`
## DOM Manipulation Patterns
- Using `document.getElementById()` for element selection
- Using `document.querySelectorAll()` for multiple element selection
- Using `.classList` API for adding/removing CSS classes
## Event Handling
- Event listeners attached in `DOMContentLoaded` callback
- Multiple event listeners chained with separate `.addEventListener()` calls
- Event object methods used: `event.stopPropagation()`, `event.preventDefault()`
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- Server-delivered HTML files with embedded CSS and JavaScript
- Client-side interactivity via vanilla JavaScript and Bootstrap framework
- Responsive design with mobile-first CSS approach
- Accessibility-focused implementation (WCAG standards)
- No build process or compilation step
## Layers
- Purpose: Render UI and handle user interactions
- Location: `src/` (HTML, CSS, JS files)
- Contains: HTML templates, CSS stylesheets, client-side JavaScript
- Depends on: jQuery, Popper.js, Bootstrap framework
- Used by: Browser clients
- Purpose: Define page semantics and accessibility features
- Location: `src/*.html` files (index.html, login.html, article.html, empty.html)
- Contains: Semantic HTML with ARIA labels, form controls, navigation structures
- Depends on: None (standalone files)
- Used by: Presentation layer, CSS for styling
- Purpose: Control visual appearance and responsive behavior
- Location: `src/css/` directory
- Contains: Bootstrap CSS (3rd party), common styles, page-specific styles
- Depends on: Bootstrap framework
- Used by: HTML rendering engine
- Purpose: Handle DOM events and form validation
- Location: `src/js/` directory
- Contains: Event handlers, form validation logic, navigation toggling
- Depends on: DOM API, jQuery, Bootstrap.js
- Used by: Browser event system
## Data Flow
- Client-side state stored in DOM element classes (`.show`, `.is-valid`, `.is-invalid`, `.collapse`)
- No centralized state management
- No persistence between page loads
- Form data sent via standard HTML form submission
## Key Abstractions
- Purpose: Display logo, title, and font size adjustment buttons
- Examples: `src/index.html` lines 15-36, `src/login.html` lines 15-36
- Pattern: Responsive container with logo, media layout, responsive button group
- Accessible via semantic HTML: `<img>` with alt attributes, `<button>` elements
- Purpose: Main site navigation with dropdown menus
- Examples: `src/index.html` lines 38-120, `src/login.html` lines 38-120
- Pattern: Bootstrap navbar with collapsible mobile menu and dropdown toggles
- Accessible via ARIA labels: `id`, `aria-*` attributes for screen readers
- Purpose: Display footer links
- Examples: `src/index.html` lines 222-232, `src/login.html` lines 227-237
- Pattern: Dark background container with link grid
- Accessible via semantic `<a>` elements with clear link text
- Purpose: Collect and validate user input
- Examples: `src/login.html` lines 129-148 (login form), lines 157-221 (register form)
- Pattern: Bootstrap form-group containers with input/select elements
- Accessible via: `<label>` elements, `aria-describedby` for help text, `required` attributes
- Purpose: Provide reusable validation state management
- Location: `src/js/login.js`
- Pattern: `setValid()`, `setInvalid()`, `removeValidation()` functions manipulate CSS classes
## Entry Points
- Location: `src/index.html`
- Triggers: Direct browser navigation to "/" or "index.html"
- Responsibilities:
- Location: `src/login.html`
- Triggers: User clicks "Login" link in navigation
- Responsibilities:
- Location: `src/article.html`
- Triggers: User clicks article link in news section
- Responsibilities:
- Location: `src/empty.html`
- Triggers: User clicks faculty, education, or other placeholder links
- Responsibilities:
## Error Handling
- Invalid fields receive `.is-invalid` class for red styling
- Error message displayed via toggling `.d-none` class on error container
- Examples: `src/js/login.js` lines 36-62 (login validation), lines 99-166 (register validation)
- Pattern: Validate field, check validity, add/remove classes, show/hide message
- No backend error handling currently implemented
- Forms don't actually submit to backend
- Validation prevents invalid submission attempts
## Cross-Cutting Concerns
- Approach: WCAG 2.1 AA standards compliance
- Semantic HTML with proper heading hierarchy
- ARIA labels and descriptions for form controls
- Responsive design for all screen sizes
- Font size adjustment buttons for readability control
- Screen reader announcements via `sr-only` class
- Color contrast ratios meeting WCAG standards
- Approach: Mobile-first CSS with Bootstrap breakpoints
- Breakpoints: `d-none d-lg-block` hides desktop elements on mobile
- `col-12 col-lg-6` adapts column widths for different screens
- Examples: `src/css/common.css` lines 39-47 (responsive font buttons)
- Approach: Server-side navigation with client-side enhancement
- Relative links allow offline operation
- Query parameters for dynamic content (e.g., `?title=Applied+sciences`)
- Both dropdown and collapsible navigation for accessibility
- Approach: CSS classes indicate state
- Validation states: `.is-valid`, `.is-invalid` for form fields
- Menu states: `.show` for open dropdowns, `.collapse` for hidden navbars
- Focus states: Bootstrap provides focus styling for all interactive elements
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
