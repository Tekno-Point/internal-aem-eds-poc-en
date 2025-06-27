import { getMetadata } from '../../scripts/aem.js';
import { fetchPlaceholders } from '../../scripts/placeholders.js';
/**
 * Loads and decorates the navigation (not breadcrumbs)
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // Clear block
  block.innerHTML = '';
  // Build breadcrumb structure
  const container = document.createElement('div');
  container.className = 'container-fluid';
  const ul = document.createElement('ul');
  ul.className = 'breadcrumb mob-hide artBredcrumb';
  // Example: statically define your breadcrumb items
  // You can make this dynamic if needed
  const crumbs = [
    { label: 'Home >', href: 'https://pws-hdfcsites-sit.adobecqms.net/?icid=website_organic_breadcrumb:link:home' },
    { label: 'Blogs >', href: 'https://pws-hdfcsites-sit.adobecqms.net/blogs?icid=website_organic_breadcrumb:link:blogs' },
    { label: 'Demat Account >', href: 'https://pws-hdfcsites-sit.adobecqms.net/blogs/demat-account?icid=website_organic_breadcrumb:link:demataccount', id: 'prevLink' },
    { label: 'How to Learn Stock Market', active: true, id: 'curr-link' },
  ];
  crumbs.forEach((crumb, idx) => {
    const li = document.createElement('li');
    li.className = 'breadcrumb-item' + (crumb.active ? ' active' : '');
    if (crumb.id) li.id = crumb.id;
    if (crumb.active) li.setAttribute('aria-current', 'page');
    if (crumb.href && !crumb.active) {
      const a = document.createElement('a');
      a.href = crumb.href;
      a.textContent = crumb.label;
      li.append(a);
    } else {
      li.textContent = crumb.label;
    }
    ul.append(li);
  });
  container.append(ul);
  block.append(container);
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


