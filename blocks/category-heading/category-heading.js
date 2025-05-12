export default function decorate(block) {
    // Extract content from the block divs based on component-models.json field order
    const headingText = block.children[0]?.textContent || '';
    const headingSize = block.children[1]?.textContent || 'h2';
    const textAlignment = block.children[2]?.textContent || 'center';

    // Clear block content
    block.innerHTML = '';

    // Create heading container
    const headingContainer = document.createElement('div');
    headingContainer.className = 'category-heading-container';
    headingContainer.style.textAlign = textAlignment;

    // Create heading element with appropriate tag
    const heading = document.createElement(headingSize);
    heading.className = 'category-heading';
    heading.textContent = headingText;

    // Add heading to container
    headingContainer.appendChild(heading);

    // Add container to block
    block.appendChild(headingContainer);
}