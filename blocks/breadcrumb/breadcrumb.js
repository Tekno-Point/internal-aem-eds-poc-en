import { getMetadata } from '../../scripts/aem.js';
import { fetchPlaceholders } from '../../scripts/placeholders.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const navigation = document.getElementById('main-navigation');
    const sections = navigation.querySelector('.sections-section');
    const expandedSection = sections.querySelector('[aria-expanded="true"]');
    if (expandedSection && isDesktop.matches) {
      toggleAllSections(sections);
      expandedSection.focus();
    } else if (!isDesktop.matches) {
      toggleMenu(navigation, sections);
      navigation.querySelector('button').focus();
    }
  }
}

function closeOnFocusLost(e) {
  const navigation = e.currentTarget;
  if (!navigation.contains(e.relatedTarget)) {
    const sections = navigation.querySelector('.sections-section');
    const expandedSection = sections.querySelector('[aria-expanded="true"]');
    if (expandedSection && isDesktop.matches) {
      toggleAllSections(sections, false);
    } else if (!isDesktop.matches) {
      toggleMenu(navigation, sections, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isDropdown = focused.className === 'dropdown-section';
  if (isDropdown && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    toggleAllSections(focused.closest('.sections-section'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all navigation sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllSections(sections, expanded = false) {
  sections.querySelectorAll('.sections-section .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire navigation
 * @param {Element} navigation The container element
 * @param {Element} sections The sections within the container element
 * @param {*} forceExpanded Optional param to force expand behavior when not null
 */
function toggleMenu(navigation, sections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : navigation.getAttribute('aria-expanded') === 'true';
  const button = navigation.querySelector('.hamburger-container button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  navigation.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllSections(sections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable dropdown keyboard accessibility
  const dropdowns = sections.querySelectorAll('.dropdown-section');
  if (isDesktop.matches) {
    dropdowns.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusSection);
      }
    });
  } else {
    dropdowns.forEach((drop) => {
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusSection);
    });
  }

  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    window.addEventListener('keydown', closeOnEscape);
    navigation.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    navigation.removeEventListener('focusout', closeOnFocusLost);
  }
}

function getDirectTextContent(menuItem) {
  const menuLink = menuItem.querySelector(':scope > a');
  if (menuLink) {
    return menuLink.textContent.trim();
  }
  return Array.from(menuItem.childNodes)
    .filter((n) => n.nodeType === Node.TEXT_NODE)
    .map((n) => n.textContent)
    .join(' ');
}

async function buildBreadcrumbsFromNavTree(navigation, currentUrl) {
  const crumbs = [];

  const homeUrl = document.querySelector('.brand-section a[href]').href;

  let menuItem = Array.from(navigation.querySelectorAll('a')).find((a) => a.href === currentUrl);
  if (menuItem) {
    do {
      const link = menuItem.querySelector(':scope > a');
      crumbs.unshift({ title: getDirectTextContent(menuItem), url: link ? link.href : null });
      menuItem = menuItem.closest('ul')?.closest('li');
    } while (menuItem);
  } else if (currentUrl !== homeUrl) {
    crumbs.unshift({ title: getMetadata('og:title'), url: currentUrl });
  }

  const placeholders = await fetchPlaceholders();
  const homePlaceholder = placeholders.breadcrumbsHomeLabel || 'Home';

  crumbs.unshift({ title: homePlaceholder, url: homeUrl });

  // last link is current page and should not be linked
  if (crumbs.length > 1) {
    crumbs[crumbs.length - 1].url = null;
  }
  crumbs[crumbs.length - 1]['aria-current'] = 'page';
  return crumbs;
}

async function buildBreadcrumbs() {
  const breadcrumbs = document.createElement('nav');
  breadcrumbs.className = 'breadcrumbs';

  const navigation = document.querySelector('.sections-section');
  const crumbs = await buildBreadcrumbsFromNavTree(navigation, document.location.href);

  const ol = document.createElement('ol');
  ol.append(...crumbs.map((item) => {
    const li = document.createElement('li');
    if (item['aria-current']) li.setAttribute('aria-current', item['aria-current']);
    if (item.url) {
      const a = document.createElement('a');
      a.href = item.url;
      a.textContent = item.title;
      li.append(a);
    } else {
      li.textContent = item.title;
    }
    return li;
  }));

  breadcrumbs.append(ol);
  return breadcrumbs;
}

/**
 * Loads and decorates the header, mainly the navigation
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load navigation as fragment
  const navigationMeta = getMetadata('nav');
  const navigationPath = navigationMeta ? new URL(navigationMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navigationPath);

  // decorate navigation DOM
  block.textContent = '';
  const navigation = document.createElement('nav');
  navigation.id = 'main-navigation';
  while (fragment.firstElementChild) navigation.append(fragment.firstElementChild);

  const sectionNames = ['brand', 'sections', 'tools'];
  sectionNames.forEach((name, i) => {
    const section = navigation.children[i];
    if (section) section.classList.add(`${name}-section`);
  });

  const brandSection = navigation.querySelector('.brand-section');
  const brandLink = brandSection ? brandSection.querySelector('.button') : null;
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }

  const sectionsSection = navigation.querySelector('.sections-section');
  if (sectionsSection) {
    sectionsSection.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((sectionItem) => {
      if (sectionItem.querySelector('ul')) sectionItem.classList.add('dropdown-section');
      sectionItem.addEventListener('click', () => {
        if (isDesktop.matches) {
          const expanded = sectionItem.getAttribute('aria-expanded') === 'true';
          toggleAllSections(sectionsSection);
          sectionItem.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        }
      });
    });
  }

  const toolsSection = navigation.querySelector('.tools-section');
  if (toolsSection) {
    const search = toolsSection.querySelector('a[href*="search"]');
    if (search && search.textContent === '') {
      search.setAttribute('aria-label', 'Search');
    }
  }

  // hamburger for mobile
  const hamburgerContainer = document.createElement('div');
  hamburgerContainer.classList.add('hamburger-container');
  hamburgerContainer.innerHTML = `<button type="button" aria-controls="main-navigation" aria-label="Open navigation">
      <span class="hamburger-icon"></span>
    </button>`;
  hamburgerContainer.addEventListener('click', () => toggleMenu(navigation, sectionsSection));
  navigation.prepend(hamburgerContainer);
  navigation.setAttribute('aria-expanded', 'false');
  // prevent mobile nav behavior on window resize
  toggleMenu(navigation, sectionsSection, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(navigation, sectionsSection, isDesktop.matches));

  const navigationWrapper = document.createElement('div');
  navigationWrapper.className = 'navigation-wrapper';
  navigationWrapper.append(navigation);
  block.append(navigationWrapper);

  // Breadcrumbs are now rendered in the body, not here


  const breadcrumbs = Array.from(block.children);
  breadcrumbs.forEach((child, index) => {
console.log(child);
    child.classList.add(`breadcrumbs-${index}`);
  });
}

/**
 * Renders breadcrumbs in the body above <main>
 */
export async function renderBreadcrumbsInBody() {
  if (getMetadata('breadcrumbs').toLowerCase() === 'true') {
    const breadcrumbs = await buildBreadcrumbs();
    let container = document.querySelector('.breadcrumbs-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'breadcrumbs-container';
      const main = document.querySelector('main');
      if (main) {
        main.parentNode.insertBefore(container, main);
      } else {
        document.body.prepend(container);
      }
    }
    container.innerHTML = '';
    container.append(breadcrumbs);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  renderBreadcrumbsInBody();
});