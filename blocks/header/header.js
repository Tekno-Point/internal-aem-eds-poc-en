import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 1025px)');

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
  // const nav = e.currentTarget;
  // if (!nav.contains(e.relatedTarget)) {
  //   const navSections = nav.querySelector('.nav-sections');
  //   const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
  //   if (navSectionExpanded && isDesktop.matches) {
  //     // eslint-disable-next-line no-use-before-define
  //     toggleAllNavSections(navSections, false);
  //   } else if (!isDesktop.matches) {
  //     // eslint-disable-next-line no-use-before-define
  //     toggleMenu(nav, navSections, false);
  //   }
  // }
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

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
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
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';

  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
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
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
    // collapse menu on focus lost
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
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

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    const closeIcon = navSections.querySelector('.icon-close-icon');
    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navSection) => {
      if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
      navSection.addEventListener('click', () => {
        if (isDesktop.matches) {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          // const checkClose = closeIcon.style.display === 'block';
          // if (checkClose) {
          //   closeIcon.style.display = 'none';
          // }
          // else {
          //   closeIcon.style.display = 'block';
          // }
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        }
      });
    });



    // const isMobile = window.innerWidth < 1025;

    closeIcon.addEventListener('click', () => {
      if (isDesktop.matches) {
        closeIcon.style.display = 'none';
        navSections.querySelector('.default-content-wrapper>ul>li').setAttribute('aria-expanded', "false");
      }
      else {
        const expanded = nav.getAttribute('aria-expanded') === 'true';
        nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        const navElementList = document.querySelectorAll('.nav-drop > p');
        const mobcategory = navSections.querySelector(".mob-category-title p")
        navElementList.forEach(elem => {
          elem.style.display = 'block';
          elem.parentElement.querySelector('ul').style.display = "none";
          mobcategory.innerHTML = ` `;
        })
      }
    })




    if (!isDesktop.matches) {
      const mobCategoryTitle = document.createElement('div');
      mobCategoryTitle.classList.add('mob-category-title');
      mobCategoryTitle.innerHTML = `<span><img src=../../images/back-arrow.svg /></span>`
      const p =  document.createElement('p');
      mobCategoryTitle.appendChild(p);

      const contentWrapper = navSections.querySelector('.default-content-wrapper');
      navSections.insertBefore(mobCategoryTitle, contentWrapper);

      contentWrapper.addEventListener('click', (e) => {
        mobileNav(e, p);
      })
    }


    const backArrow = navSections.querySelector('.mob-category-title span img');
    backArrow.addEventListener('click', () => {
      const navElementList = document.querySelectorAll('.nav-drop > p');
      const mobcategory = navSections.querySelector(".mob-category-title p")
      navElementList.forEach(elem => {
        elem.style.display = 'block';
        elem.parentElement.querySelector('ul').style.display = "none";
        mobcategory.innerHTML = ` `;
      })
    })

  }


  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  // const closeIcon = navSections.querySelector('.icon-close-icon');
  hamburger.addEventListener('click', () => {
    toggleMenu(nav, navSections)
    // closeIcon.style.display = 'block';
  });
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}

function mobileNav(e, mobcategory) {
  const navElement = e.target.parentElement;
  if (navElement.classList.contains('nav-drop')) {
    const navElementList = document.querySelectorAll('.nav-drop > p');
    navElementList.forEach(elem => {
      elem.style.display = 'none';
    })
    const navList = navElement.querySelector('ul');
    navList.style.display = 'block';
    mobcategory.innerHTML = `${e.target.textContent}`;
  }
}