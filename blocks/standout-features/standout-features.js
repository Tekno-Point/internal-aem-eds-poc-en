export default function decorate(block) {
  // Get all rows from the block, representing the title and the features
  const rows = [...block.children];

  // The first row is the title
  const titleRow = rows.shift();
  const titleTextWrap = document.createElement('div');
  titleTextWrap.className = 'left-text-wrap';
  const titleParagraphs = [...titleRow.firstElementChild.children];

  // Modify the second title paragraph to include the 'leader' span
  const secondTitleP = titleParagraphs[1];
  secondTitleP.innerHTML = `<span class="leader">${secondTitleP.textContent}</span>`;

  // Move title paragraphs into the new wrapper
  titleParagraphs.forEach(p => titleTextWrap.appendChild(p));

  // The remaining rows are the features
  const featuresWrap = document.createElement('div');
  featuresWrap.className = 'bottom-specs-wrap d-flex';

  rows.forEach((row) => {
    // Each row represents a single feature
    const uniqueBox = document.createElement('div');
    uniqueBox.className = 'unique-boxes d-flex animate third fadeInUpStand';

    const [iconCell, descCell] = [...row.children];

    // Create a new wrapper for the icon and move the picture element inside
    const boxImgWrap = document.createElement('div');
    boxImgWrap.className = 'box-img-wrap';
    const picture = iconCell.querySelector('picture');
    if (picture) {
      boxImgWrap.appendChild(picture);
    }
    
    // Create a new wrapper for the description and move the p elements inside
    const textContainer = document.createElement('div');
    textContainer.className = 'top-specs-cc-text-container count-up-parent';
    const descriptionSpan = document.createElement('span');
    descriptionSpan.className = 'cc-unit-value-container d-block';
    
    // Get the two paragraphs for the description text
    const [valueP, unitP] = [...descCell.children];
    
    // Create and populate the cc-value span
    const ccValueSpan = document.createElement('span');
    ccValueSpan.className = 'cc-value count-up';
    ccValueSpan.textContent = valueP.textContent.trim();
    
    // Create and populate the cc-unit span
    const ccUnitSpan = document.createElement('span');
    ccUnitSpan.className = 'cc-unit d-block';
    ccUnitSpan.textContent = unitP.textContent.trim();

    // Append the spans to the main description span
    descriptionSpan.appendChild(ccValueSpan);
    descriptionSpan.appendChild(ccUnitSpan);
    
    textContainer.appendChild(descriptionSpan);

    uniqueBox.appendChild(boxImgWrap);
    uniqueBox.appendChild(textContainer);
    featuresWrap.appendChild(uniqueBox);
  });

  // Clear the original block content
  block.textContent = '';
  // Append the newly structured elements
  block.appendChild(titleTextWrap);
  block.appendChild(featuresWrap);
}
