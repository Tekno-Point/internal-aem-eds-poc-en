export default async function decorate(block) {
    const items = [...block.children];
  
    items.forEach((item, index) => {
      const [headerDiv, contentDiv] = item.children;
  
      // Assign classes for styling
      item.classList.add('accordion-item');
      headerDiv.classList.add('accordion-header');
      contentDiv.classList.add('accordion-content');
  
      // Create a button for the header (for accessibility and focus)
      const button = document.createElement('button');
      button.innerHTML = headerDiv.innerHTML;
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-controls', `accordion-content-${index}`);
      button.id = `accordion-header-${index}`;
      button.classList.add('accordion-button');
  
      // Clear original header and add button
      headerDiv.innerHTML = '';
      headerDiv.appendChild(button);
  
      // Set content attributes
      contentDiv.id = `accordion-content-${index}`;
      contentDiv.setAttribute('role', 'region');
      contentDiv.setAttribute('aria-labelledby', button.id);
      contentDiv.hidden = true;
  
      // Toggle logic
      button.addEventListener('click', () => {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !isExpanded);
        contentDiv.hidden = isExpanded;
      });
    });
  }
  