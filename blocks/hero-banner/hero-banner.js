export default function decorate(block) {
    // Extract content from block
    const blockContent = block.innerHTML;
    block.innerHTML = '';
    
    // Create banner structure
    const bannerContainer = document.createElement('div');
    bannerContainer.className = 'hero-banner-container';
    
    // Add promo bar if specified
    const promoBarData = block.dataset.showPromoBar;
    if (promoBarData && promoBarData.toLowerCase() === 'true') {
      const promoBar = document.createElement('div');
      promoBar.className = 'hero-banner-promo';
      
      const promoTextSpan = document.createElement('span');
      promoTextSpan.className = 'promo-text';
      promoTextSpan.textContent = block.dataset.promoText || 'LIMITED PER';
      promoBar.appendChild(promoTextSpan);
      
      const promoButton = document.createElement('a');
      promoButton.className = 'promo-button';
      promoButton.textContent = block.dataset.promoButtonText || 'Plan now';
      promoButton.href = '#';
      promoBar.appendChild(promoButton);
      
      bannerContainer.appendChild(promoBar);
    }
    
    // Main banner content
    const bannerContent = document.createElement('div');
    bannerContent.className = 'hero-banner-content';
    
    // Text content wrapper
    const textWrapper = document.createElement('div');
    textWrapper.className = 'hero-banner-text';
    
    // Add main heading
    if (block.dataset.mainHeading) {
      const heading = document.createElement('h1');
      heading.className = 'hero-banner-heading';
      heading.textContent = block.dataset.mainHeading;
      textWrapper.appendChild(heading);
    }
    
    // Add sub heading
    if (block.dataset.subHeading) {
      const subHeading = document.createElement('h2');
      subHeading.className = 'hero-banner-subheading';
      subHeading.textContent = block.dataset.subHeading;
      textWrapper.appendChild(subHeading);
    }
    
    // Add CTA button
    if (block.dataset.ctaButtonText) {
      const ctaButton = document.createElement('a');
      ctaButton.className = 'hero-banner-cta';
      ctaButton.textContent = block.dataset.ctaButtonText;
      ctaButton.href = block.dataset.ctaButtonLink || '#';
      textWrapper.appendChild(ctaButton);
    }
    
    // Add tagline if available
    if (block.dataset.taglineText) {
      const tagline = document.createElement('div');
      tagline.className = 'hero-banner-tagline';
      tagline.textContent = block.dataset.taglineText;
      textWrapper.appendChild(tagline);
    }
    
    bannerContent.appendChild(textWrapper);
    
    // Add image if provided
    if (block.querySelector('img')) {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'hero-banner-image';
      const image = block.querySelector('img').cloneNode(true);
      imageWrapper.appendChild(image);
      bannerContent.appendChild(imageWrapper);
    }
    
    bannerContainer.appendChild(bannerContent);
    
    // Create stats bar
    const statsBar = document.createElement('div');
    statsBar.className = 'hero-banner-stats';
    
    // Parse stat items from JSON if available
    try {
      const statItems = JSON.parse(block.dataset.statItems || '[]');
      statItems.forEach(statItem => {
        const statDiv = document.createElement('div');
        statDiv.className = 'stat-item';
        
        const statValue = document.createElement('div');
        statValue.className = 'stat-value';
        statValue.textContent = statItem.statValue || '';
        
        if (statItem.superscript) {
          const sup = document.createElement('sup');
          sup.textContent = statItem.superscript;
          statValue.appendChild(sup);
        }
        
        const statDesc = document.createElement('div');
        statDesc.className = 'stat-description';
        statDesc.textContent = statItem.statDescription || '';
        
        statDiv.appendChild(statValue);
        statDiv.appendChild(statDesc);
        statsBar.appendChild(statDiv);
      });
    } catch (e) {
      console.error('Error parsing stat items:', e);
      
      // Fallback for hardcoded stats (4 stats as shown in the reference image)
      const statData = [
        { value: '85 Lakh+', description: 'Families Protected¹' },
        { value: 'Save tax', description: 'up to ₹46,800⁺⁺' },
        { value: '99.13% Individual Death', description: 'Claim Settlement Ratio⁶' },
        { value: 'Funds rated 4 or 5 star', description: 'by Morningstar⁷' }
      ];
      
      statData.forEach(stat => {
        const statDiv = document.createElement('div');
        statDiv.className = 'stat-item';
        
        const statValue = document.createElement('div');
        statValue.className = 'stat-value';
        statValue.textContent = stat.value;
        
        const statDesc = document.createElement('div');
        statDesc.className = 'stat-description';
        statDesc.textContent = stat.description;
        
        statDiv.appendChild(statValue);
        statDiv.appendChild(statDesc);
        statsBar.appendChild(statDiv);
      });
    }
    
    bannerContainer.appendChild(statsBar);
    
    // Apply background color if specified
    if (block.dataset.backgroundColor) {
      bannerContainer.classList.add(`bg-${block.dataset.backgroundColor}`);
    } else {
      bannerContainer.classList.add('bg-blue'); // Default
    }
    
    block.appendChild(bannerContainer);
  }