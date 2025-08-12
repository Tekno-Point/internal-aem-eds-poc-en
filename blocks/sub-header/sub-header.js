
  export default function decorate(block) {
    // Create the main wrapper div with the appropriate classes.
    const wrapper = document.createElement('div');
    wrapper.className = 'hero-container';

    // Create the unordered list element.
    const ul = document.createElement('ul');
    ul.className = 'header__brand--navbar d-flex align-items-center justify-content-sm-start justify-content-lg-center';

    // Loop through each direct child div in the block, as each one represents a menu item.
    block.querySelectorAll(':scope > div').forEach((childDiv) => {
        // Find the picture element to get the image source and alt text.
        const pictureElement = childDiv.querySelector('picture');
        const imgElement = pictureElement ? pictureElement.querySelector('img') : null;

        // Find the link element to get the href and text.
        const linkElement = childDiv.querySelector('a.button');

        // Only proceed if both an image and a link are found.
        if (imgElement && linkElement) {
            // Create a new list item (li).
            const li = document.createElement('li');

            linkElement.className = 'd-flex align-items-center px-8 menu weight-medium text-decoration-none text-uppercase';
            imgElement.className = 'variation-icon';

            // Create a span to hold the link text.
            const span = document.createElement('span');
            span.textContent = linkElement.textContent;
            linkElement.textContent = '';

            // Build the new HTML structure by appending the new elements.
            linkElement.appendChild(imgElement);
            linkElement.appendChild(span);
            li.appendChild(linkElement);
            ul.appendChild(li);
        }
    });

    // Clear the original content of the block.
    block.innerHTML = '';

    // Append the new ul to the wrapper and the wrapper to the block.
    wrapper.appendChild(ul);
    block.appendChild(wrapper);
}
  