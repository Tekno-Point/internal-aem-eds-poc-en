// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';

export default async function decorate(block) {
  // build tablist
  const tablist = document.createElement('div');
  tablist.className = 'tab-list';
  tablist.setAttribute('role', 'tablist');

  // decorate tab and tabpanels
  const tab = [...block.children].map((child) => child.firstElementChild);
  tab.forEach((tab, i) => {
    const id = toClassName(tab.textContent);

    // decorate tabpanel
    const tabpanel = block.children[i];
    tabpanel.className = 'tab-panel';
    tabpanel.id = `tabpanel-${id}`;
    tabpanel.setAttribute('aria-hidden', true);
    tabpanel.setAttribute('aria-labelledby', `tab-${id}`);
    tabpanel.setAttribute('role', 'tabpanel');

    // build tab button
    const button = document.createElement('button');
    button.className = 'tab-tab';
    button.id = `tab-${id}`;
    button.innerHTML = tab.innerHTML;
    button.setAttribute('aria-controls', `tabpanel-${id}`);
    button.setAttribute('aria-selected', false);
    button.setAttribute('role', 'tab');
    button.setAttribute('type', 'button');

    // click event to toggle tab
    button.addEventListener('click', () => {
        const isActive = button.classList.contains('btn-active');
        if (!isActive){
        button.classList.remove('btn-active');
        button.setAttribute('aria-selected', 'false');
        tabpanel.setAttribute('aria-hidden', 'true');
        
        button.classList.add('btn-active');
        button.setAttribute('aria-selected', 'true');
        tabpanel.setAttribute('aria-hidden', 'false');
        }
        else{
        button.classList.remove('btn-active');
        button.setAttribute('aria-selected', 'false');
        tabpanel.setAttribute('aria-hidden', 'true');
        }
      // Hide all tabpanels
    //   block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
    //     panel.setAttribute('aria-hidden', true);
    //   });

      // Deselect all tab buttons
    //   tablist.querySelectorAll('button').forEach((btn) => {
    //     btn.setAttribute('aria-selected', false);
    //     btn.classList.remove('btn-active'); // Remove class from all
    //   });

      // Show selected tabpanel and activate button
    //   tabpanel.setAttribute('aria-hidden', false);
    //   button.setAttribute('aria-selected', true);
    //   button.classList.add('btn-active'); // Add class to clicked button
    });

    tablist.append(button);
    tab.remove();
  });

  block.prepend(tablist);

    const tabList = document.querySelector(".tab-list");
  const tabs = tabList.querySelectorAll(".tab-tab");

}