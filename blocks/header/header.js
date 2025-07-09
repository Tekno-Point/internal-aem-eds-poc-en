import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../../scripts/scripts.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

let removeClickOutsideHandler = null;

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

function handleClickOutsideNav(e, nav, navSections, hamburger) {
  if (
    !navSections.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    toggleMenu(nav, navSections, false);
  }
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = 'false') {
  sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? forceExpanded : nav.getAttribute('aria-expanded') !== 'true';
  const button = nav.querySelector('.nav-hamburger button');
  // Prevent background scroll only when overlay is active (mobile menu open)
  if (expanded && !isDesktop.matches) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
  nav.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  toggleAllNavSections(navSections, 'false');
  button.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
  // Toggle overlay for mobile
  if (nav._overlay) {
    nav._overlay.style.display = (expanded && !isDesktop.matches) ? 'block' : 'none';
  }
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }

  // enable menu collapse on escape keypress
  if (expanded && !isDesktop.matches) {
    // Add click outside handler for mobile only when menu is open
    if (!removeClickOutsideHandler) {
      const hamburger = nav.querySelector('.nav-hamburger');
      const clickHandler = (e) => handleClickOutsideNav(e, nav, navSections, hamburger);
      document.addEventListener('mousedown', clickHandler);
      removeClickOutsideHandler = () => document.removeEventListener('mousedown', clickHandler);
    }
    window.addEventListener('keydown', closeOnEscape);
    // Don't add focusout listener for mobile - only use click outside
  } else {
    // Remove click outside handler if present
    if (removeClickOutsideHandler) {
      removeClickOutsideHandler();
      removeClickOutsideHandler = null;
    }
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  // Add overlay for mobile
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.style.display = 'none';

  const classes = ['top-menu', 'brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  if (!isDesktop.matches) {

    const secondUlListTopMenu = nav.querySelector(".nav-top-menu .default-content-wrapper ul:nth-child(2)")
    const loginButton = nav.querySelector(".nav-top-menu .default-content-wrapper > .button-container");
    const callBack = nav.querySelector(".nav-top-menu .default-content-wrapper > ul li:nth-child(2) a");
    const sectionsContentWrapper = nav.querySelector(".nav-sections .default-content-wrapper");

    loginButton.classList.add('login-button');
    callBack.classList.add('call-back');

    // Add cross (close) button after login button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'nav-login-close';
    closeBtn.setAttribute('aria-label', 'Close menu');
    closeBtn.addEventListener('click', () => {
      const nav = document.getElementById('nav');
      const navSections = nav.querySelector('.nav-sections');
      toggleMenu(nav, navSections, false);
    });
    loginButton.appendChild(closeBtn);
    //appending secondUlListTopMenu in sectionsContentWrapper for mobile view
    if (secondUlListTopMenu && sectionsContentWrapper) {
      sectionsContentWrapper.insertBefore(loginButton, sectionsContentWrapper.firstChild);
      // Insert callBack after the first child of sectionsContentWrapper
      sectionsContentWrapper.insertBefore(callBack, sectionsContentWrapper.firstChild.nextSibling);
      sectionsContentWrapper.appendChild(secondUlListTopMenu);
    }
    // Insert overlay as first child of nav for mobile only
    nav.prepend(overlay);
  }

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navSection) => {
      if (navSection.querySelector('ul')) {
        navSection.classList.add('nav-drop');
        const navSectionIconSRC = navSection.querySelector(".icon img")?.src;
        const innerList = navSection.querySelector('ul');
        innerList.style.setProperty('--before-bg', `url("${navSectionIconSRC}")`);
      }

      if (!isDesktop.matches) {
        navSection.addEventListener('click', (e) => {
          const scrollHeight = navSection.scrollHeight;
          navSection.style.setProperty('--scroll-height', `${scrollHeight}px`);
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        });
      }
    });
  }

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
  // Store overlay on nav for access in toggleMenu
  nav._overlay = overlay;
 
  document.addEventListener('focusin', function(e) {
    if (e.target.matches('.field-wrapper input')) {
      const wrapper = e.target.closest('.field-wrapper');
      if (wrapper) {
        wrapper.classList.add('focus-active');
      }
    }
  });
  
  document.addEventListener('focusout', function(e) {
    if (e.target.matches('.field-wrapper input')) {
      const wrapper = e.target.closest('.field-wrapper');
      if (wrapper && e.target.value.length === 0) {
        wrapper.classList.remove('focus-active');
      }
    }
  });
}
