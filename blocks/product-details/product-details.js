// export default function decorate(block) {
//     // Extract configuration fields (first row)
//     const configRow = block.children[0];
//     if (!configRow) return;

//     const columns = configRow.children[2]?.textContent.trim() || '5';
   
//     // Remove the configuration row
//     configRow.remove();
    
//     // Create the header section
//     const header = document.createElement('header');
//     header.className = 'key-features-header';
    
//     const h2 = document.createElement('h3');
//     h2.className = 'key-features-main-heading';
//     h2.textContent = mainHeading;
//     header.appendChild(h2);
    
//     // Create the features grid
//     const featuresGrid = document.createElement('div');
//     featuresGrid.className = 'key-features-grid';
//     featuresGrid.setAttribute('data-columns', columns);
    
//     // Process each feature item
//     Array.from(block.children).forEach(featureRow => {
//       const featureItem = document.createElement('div');
//       featureItem.className = 'key-features-item';
      
//       // Get all fields from the original structure
//       const iconName = featureRow.children[0]?.textContent.trim() || '';
//       const customIcon = featureRow.children[1]?.textContent.trim() || '';
//       const featureTitle = featureRow.children[2]?.textContent.trim() || '';
//       const featureValue = featureRow.children[3]?.textContent.trim() || '';
//       const featureUnit = featureRow.children[4]?.textContent.trim() || '';
//       const additionalInfo = featureRow.children[5]?.textContent.trim() || '';
      
//       // Create icon container
//       const iconContainer = document.createElement('div');
//       iconContainer.className = 'key-features-icon';
      
//       // Add the appropriate icon based on iconName
//       if (iconName === 'custom' && customIcon) {
//         iconContainer.innerHTML = customIcon;
//       } else {
//         iconContainer.innerHTML = getIconSVG(iconName);
//       }
      
//       const featureContent = document.createElement('div');
//       featureContent.className = 'key-features-content';
      
//       const titleElement = document.createElement('div');
//       titleElement.className = 'key-features-title';
//       titleElement.textContent = featureTitle;
      
//       const valueContainer = document.createElement('div');
//       valueContainer.className = 'key-features-value-container';
      
//       const valueElement = document.createElement('span');
//       valueElement.className = 'key-features-value';
//       valueElement.textContent = featureValue;
//       valueContainer.appendChild(valueElement);
      
//       if (featureUnit) {
//         const unitElement = document.createElement('span');
//         unitElement.className = 'key-features-unit';
//         unitElement.textContent = featureUnit;
//         valueContainer.appendChild(unitElement);
//       }
      
//       if (additionalInfo) {
//         const infoElement = document.createElement('div');
//         infoElement.className = 'key-features-additional-info';
//         infoElement.textContent = additionalInfo;
//         featureContent.appendChild(infoElement);
//       }
      
//       featureContent.prepend(titleElement, valueContainer);
      
//       featureItem.appendChild(iconContainer);
//       featureItem.appendChild(featureContent);
      
//       featuresGrid.appendChild(featureItem);
//     });
  
//     block.textContent = '';
//     block.appendChild(header);
//     block.appendChild(featuresGrid);
//   }