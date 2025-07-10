export default function decorate(block) {
  const isDesktop = window.matchMedia('(min-width: 900px)').matches;

  const tabPane = document.createElement('div');
  tabPane.className = 'tab-pane top-second-nav-js active';
  tabPane.id = 'personal'; // Set dynamically if needed

  const navList = document.createElement('ul');
  navList.className = 'top-nav-left';

  [...block.children].forEach((item) => {
    const li = document.createElement('li');
    li.className = 'drop-down all-drop-down';

    const children = [...item.children];
    const title = children[0]?.textContent?.trim() || 'Menu';
    const viewAllLink = children[1]?.querySelector('a')?.getAttribute('href') || '#';
    const viewAllText = children[1]?.querySelector('a')?.textContent?.trim() || '#';
    const subTitle = children[2]?.textContent?.trim() || '';
    const cardItems = [...children[3]?.querySelectorAll('li') || []];

    // Top link: title
    const topLink = document.createElement('a');
    topLink.href = viewAllLink;
    topLink.textContent = title;
    li.appendChild(topLink);

    // Dropdown content container
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown-content animated fadeIn menu-cardList-cnt';

    // Header box
    const hdBx = document.createElement('div');
    hdBx.className = 'hd-bx';

    if (isDesktop) {
      // Desktop: separate subtitle and link
      const hdTitle = document.createElement('p');
      hdTitle.className = 'hd-bx-h4';
      hdTitle.textContent = subTitle;

      const hdLink = document.createElement('a');
      hdLink.className = 'link';
      hdLink.setAttribute('data-gtm-l3-alllinkcta', '');
      hdLink.href = viewAllLink;
      hdLink.textContent = `View all ${title}`;

      hdBx.append(hdTitle, hdLink);
    } else {
      // Mobile: merged link
      const hdLink = document.createElement('a');
      hdLink.className = 'hd-bx-h4 link';
      hdLink.setAttribute('data-gtm-l3-alllinkcta', '');
      hdLink.href = viewAllLink;
      hdLink.textContent = `View all ${title}`;

      hdBx.append(hdLink);
    }

    dropdown.append(hdBx);

    // Menu cards
    const menuCards = document.createElement('div');
    menuCards.className = 'menu-cardList MT15';

    cardItems.forEach((liItem, i) => {
      const cardTitle = liItem.textContent?.trim() || 'Card';
      const card = document.createElement('div');
      card.className = `grdiantCard grdP${(i % 3) + 1}`; // Rotate grdP1,2,3

      const anchor = document.createElement('a');
      anchor.href = '#'; // Replace with actual href if available
      anchor.setAttribute('data-gtm-desk-l3cards-click', '');

      const tags = document.createElement('div');
      tags.className = 'tags';
      tags.style.display = 'none';

      const titleDiv = document.createElement('div');
      titleDiv.className = 'title';
      titleDiv.innerHTML = cardTitle + '<span class="icon-Right"></span>';

      anchor.append(tags, titleDiv);
      card.append(anchor);
      menuCards.append(card);
    });

    dropdown.append(menuCards);
    li.append(dropdown);
    navList.append(li);
  });

  tabPane.append(navList);
  block.textContent = '';
  block.append(tabPane);
}
