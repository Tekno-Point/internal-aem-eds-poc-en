import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
    const navItems = Array.from(block.children).slice(0); // All children are nav items
    const navList = document.createElement('ul');
    navList.classList.add('nav-list');

    navItems.forEach((item, index) => {
        const title = item.children[0]?.textContent?.trim() || '';
        const link = item.children[1]?.textContent?.trim() || '';
        const description = item.children[2]?.innerHTML?.trim() || '';

        const listItem = document.createElement('li');
        listItem.classList.add('nav-item');

        const anchor = document.createElement('a');
        anchor.href = link;
        anchor.textContent = title;

        const details = document.createElement('div');
        details.classList.add('nav-item-details');
        details.innerHTML = description;

        listItem.appendChild(anchor);
        listItem.appendChild(details);
        navList.appendChild(listItem);

        // Add hover functionality
        listItem.addEventListener('mouseover', () => {
            details.style.display = 'block';
        });

        listItem.addEventListener('mouseleave', () => {
            details.style.display = 'none';
        });
    });

    block.innerHTML = '';
    block.appendChild(navList);
}