import { getMetadata } from '../../scripts/aem.js';
import { fetchPlaceholders } from '../../scripts/placeholders.js';

/**
 * Loads and decorates the navigation (not breadcrumbs)
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

  // Breadcrumbs are NOT loaded here!
}

// --- Breadcrumbs logic below ---

/**
 * Builds breadcrumbs based on the URL path, not the navigation
 */
async function buildBreadcrumbs() {
  const breadcrumbs = document.createElement('nav');
  breadcrumbs.className = 'breadcrumbs';

  const placeholders = await fetchPlaceholders();
  const homeLabel = placeholders.breadcrumbsHomeLabel || 'Home';

  const ol = document.createElement('ol');
  const pathParts = window.location.pathname.replace(/\/$/, '').split('/').filter(Boolean);

  // Home link
  const homeLi = document.createElement('li');
  if (pathParts.length > 0) {
    const a = document.createElement('a');
    a.href = '/';
    a.textContent = homeLabel;
    homeLi.append(a);
  } else {
    homeLi.textContent = homeLabel;
    homeLi.setAttribute('aria-current', 'page');
  }
  ol.append(homeLi);

  // Path parts
  let cumulativePath = '';
  pathParts.forEach((part, idx) => {
    cumulativePath += `/${part}`;
    const li = document.createElement('li');
    const isLast = idx === pathParts.length - 1;
    const label = decodeURIComponent(part.replace(/-/g, ' '));
    if (isLast) {
      li.textContent = label;
      li.setAttribute('aria-current', 'page');
    } else {
      const a = document.createElement('a');
      a.href = cumulativePath + '/';
      a.textContent = label;
      li.append(a);
    }
    ol.append(li);
  });

  breadcrumbs.append(ol);
  return breadcrumbs;
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

// Only render breadcrumbs in the body, never in the nav
window.addEventListener('DOMContentLoaded', () => {
  renderBreadcrumbsInBody();
});

// --- Navigation helpers (unchanged) ---

function toggleAllSections(sections, expanded = false) {
  sections.querySelectorAll('.sections-section .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

function toggleMenu(navigation, sections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : navigation.getAttribute('aria-expanded') === 'true';
  const button = navigation.querySelector('.hamburger-container button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  navigation.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllSections(sections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
}