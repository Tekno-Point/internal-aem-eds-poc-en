export default function decorate(block) {
  const items = [...block.children];
  const navWrapper = document.createElement('div'); // for regular links
  navWrapper.classList.add('secondary-nav-links');
  const ctaWrapper = document.createElement('div'); // for CTA only
  ctaWrapper.classList.add('secondary-nav-cta-wrapper');
  items.forEach((row) => {
    const href = row.querySelector('.button-container a')?.getAttribute('href') || '#';
    const linkTitle = row.querySelectorAll('div')[1]?.textContent?.trim() || '';
    const linkType = row.querySelectorAll('div')[2]?.textContent?.trim();
    if (href && linkTitle) {
      const a = document.createElement('a');
      a.href = href;
      a.textContent = linkTitle;
      a.classList.add('secondary-nav-item');
      if (linkType === 'true') {
        a.classList.add('secondary-nav-cta');
        ctaWrapper.appendChild(a);
      } else {
        navWrapper.appendChild(a);
      }
    }
  });
  block.innerHTML = '';
  block.classList.add('secondary-navbar');
  block.appendChild(navWrapper);
  block.appendChild(ctaWrapper);
}