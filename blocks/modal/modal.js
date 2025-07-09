
import { loadFragment } from '../../scripts/scripts.js';
import {
    buildBlock, decorateBlock, loadBlock, loadCSS,
} from '../../scripts/aem.js';
import { div } from "../../scripts/dom-helper.js";
import { renderCard } from '../content-fragment/content-fragment.js';

/*
  This is not a traditional block, so there is no decorate function.
  Instead, links to a /modals/ path are automatically transformed into a modal.
  Other blocks can also use the createModal() and openModal() functions.
*/

export async function createModal(contentNodes) {
    await loadCSS(`${window.hlx.codeBasePath}/blocks/modal/modal.css`);
    const dialog = document.createElement('dialog');
    const dialogContent = document.createElement('div');
    dialogContent.classList.add('modal-content');
    dialogContent.append(...contentNodes);
    dialog.append(dialogContent);

    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.setAttribute('aria-label', 'Close');
    closeButton.type = 'button';
    closeButton.innerHTML = '<span class="icon icon-close"></span>';
    closeButton.addEventListener('click', () => dialog.close());
    dialog.prepend(closeButton);

    const block = buildBlock('modal', '');
    document.querySelector('main').append(block);
    decorateBlock(block);
    await loadBlock(block);

    // close on click outside the dialog
    dialog.addEventListener('click', (e) => {
        const {
            left, right, top, bottom,
        } = dialog.getBoundingClientRect();
        const { clientX, clientY } = e;
        if (clientX < left || clientX > right || clientY < top || clientY > bottom) {
            dialog.close();
        }
    });

    dialog.addEventListener('close', () => {
        document.body.classList.remove('modal-open');
        block.remove();
    });

    block.innerHTML = '';
    block.append(dialog);

    return {
        block,
        showModal: () => {
            dialog.showModal();
            // reset scroll position
            setTimeout(() => { dialogContent.scrollTop = 0; }, 0);
            document.body.classList.add('modal-open');
        },
    };
}

export async function openModal(fragmentUrl) {
    const path = fragmentUrl.startsWith('http')
        ? new URL(fragmentUrl, window.location).pathname
        : fragmentUrl;

    const fragment = await loadFragment(path);
    const { showModal, block } = await createModal(fragment.childNodes);
    //   console.log(block)
    showModal();
    setTimeout(() => {
        login(block);
    }, 100);
}

export function login(block) {
    const loginBtn = block.querySelector('form button');

    loginBtn.addEventListener('click', () => {
        const name = block.querySelector('form .input-wrapper input')?.value;
        const city = block.querySelector('form .select-wrapper select')?.value;

        const userData = {
            username: name,
            city: city
        }
        localStorage.setItem('userData', JSON.stringify(userData));
        const event = new CustomEvent('userDataSave')
        window.dispatchEvent(event);
    })
}

export async function showCards(data) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const swiperWrapper = document.querySelector('.cf-wrapper .content-fragment-wrapper .swiper-wrapper')
    let filteredData;
    let from = userData?.city;

    if (from) {
        filteredData = data.filter(card =>
            card.departureCity && card.departureCity.toLowerCase().includes(from.trim().toLowerCase())
        );
        if (!filteredData) {
            filteredData = data;
        }
    }
    else {
        filteredData = data;
    }
    swiperWrapper.innerHTML = "";
    const cards = renderCard(filteredData);
    cards.forEach(card => {
        swiperWrapper.appendChild(card)
    })
}

export function isLogin(block) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || !userData.username) return;
    const user = document.createElement('div');
    user.classList.add('user-wrapper');

    const profile = userData.username;

    user.innerHTML = `
       <div class="user-profile">Hi ${profile}</div>
    `

    const ul = block.querySelector('.section.nav-tools .default-content-wrapper ul');
    const loginBtn = ul.lastElementChild.querySelector('p');

    loginBtn.replaceWith(user);
}

