import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

/* function closeOnEscape(e) {
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
} */

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li, .nav-tools .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
    section?.querySelector("ul")?.classList.add("inner-ul");
    section?.querySelectorAll("ul >li")?.forEach((subLi, ind) => {
      isDesktop.matches ? (subLi.setAttribute('aria-expanded', ind == 0 ? 'true' : expanded)) : subLi.setAttribute('aria-expanded', expanded);
    })
  });
}

function toggleAllNavTools(sections, expanded = false) {
  sections.querySelectorAll('.nav-tools .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

// function toggleAllNavSubSections(sections, expanded = false) {
//   sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li >')?.forEach((section, ind) => {
//     section.setAttribute('aria-expanded', ind == 0 ? 'true' : expanded);
//   });
// }

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
  // toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  // toggleAllNavTools(navTools);
  // toggleAllNavSubSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('tabindex', 0);
        // drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('tabindex');
      // drop.removeEventListener('focus', focusNavSection);
    });
  }

  // enable menu collapse on escape keypress
  /* if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
    // collapse menu on focus lost
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  } */
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  let navPath;
  if (isDesktop.matches) {
    navPath = navMeta ? new URL(navMeta, window.location).pathname : '/poonawallafincorp/nav';
  }
  else {
    navPath = getMetadata('mob-nav') || '/poonawallafincorp/mobile-nav';
  }

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
  const navSectionsImg = nav.querySelector(".section.highlight");
  if (navSectionsImg) {
    let imgDefaultCon = navSectionsImg.querySelector(".default-content-wrapper")
    navSections?.querySelectorAll('.default-content-wrapper > ul > li >ul').forEach((section => {
      section.querySelectorAll("li").forEach((li) => {
        const imgClone = imgDefaultCon.cloneNode(true);
        li.appendChild(imgClone);
      })
      // subLiSection.appendChild(imgDefaultCon);
    }))
  }

  navSectionsImg?.remove();

  if (navSections) {

    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navSection) => {
      if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
      navSection.addEventListener('click', (e) => {
        e.stopPropagation();

        // if (isDesktop.matches && !e.target.closest(".inner-ul")) {
        if (!e.target.closest(".inner-ul")) {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
          if (isDesktop.matches) document.body.style.overflow = !expanded ? 'hidden' : 'auto';
        }
      });
      navSection.querySelectorAll("ul >li").forEach((subLi, ind) => {
        subLi?.querySelector("p, a")?.addEventListener("click", (ele) => {
          const li = ele.target?.closest("li");
          const expanded = li?.getAttribute("aria-expanded");
          if (expanded === "false") {
            navSections.querySelectorAll('.default-content-wrapper > ul > li').forEach((section) => {
              section.querySelectorAll("ul >li").forEach((subLi, ind) => {
                subLi.setAttribute('aria-expanded', 'false');
              })
            });
            li.setAttribute('aria-expanded', 'true');
          }
          else if (!isDesktop.matches) {
            navSections.querySelectorAll('.default-content-wrapper > ul > li').forEach((section) => {
              section.querySelectorAll("ul >li").forEach((subLi, ind) => {
                subLi.setAttribute('aria-expanded', 'false');
              })
            });
            li.setAttribute('aria-expanded', 'false');
          }
        })
      })
    });
  }

  const navTools = nav.querySelector('.nav-tools');
  if (navTools) {
    toggleAllNavTools(navTools);
    navTools.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navTool) => {
      if (navTool.querySelector('ul')) navTool.classList.add('nav-drop');
      navTool.addEventListener('click', (e) => {
        // e.stopPropagation()

        // if (isDesktop.matches) {
        const expanded = navTool.getAttribute('aria-expanded') === 'true';
        toggleAllNavTools(navTools);
        navTool.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        // }
      });
    })

    // hamburger for mobile
    const hamburger = document.createElement('div');
    hamburger.classList.add('nav-hamburger');
    hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
    hamburger.addEventListener('click', () => {
      toggleMenu(nav, navSections)
      toggleAllNavSections(navSections, 'false');
    }
    );
    nav.prepend(hamburger);
    nav.setAttribute('aria-expanded', 'false');
    // prevent mobile nav behavior on window resize
    // toggleMenu(nav, navSections);
    toggleMenu(nav, navSections, isDesktop.matches);
    isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

    const navWrapper = document.createElement('div');
    navWrapper.className = 'nav-wrapper';
    navWrapper.append(nav);
    block.append(navWrapper);
  }
}
