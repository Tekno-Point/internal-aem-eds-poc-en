export default function decorate(block) {
    const banners = Array.from(block.children);
  
    // Merge the last two banners if needed
    if (banners.length >= 3) {
      const secondLast = banners[banners.length - 2];
      const last = banners[banners.length - 1];
  
      // Move all children from the last into the secondLast
      while (last.firstChild) {
        secondLast.appendChild(last.firstChild);
      }
  
      // Remove the now-empty last banner
      block.removeChild(last);
    }
  
    // Apply class names with indexed banner names
    Array.from(block.children).forEach((row, rowIndex) => {
      row.classList.add('dream-home-banner');
      row.classList.add(`dream-home-banner-${rowIndex + 1}`); // unique class per index
  
      Array.from(row.children).forEach((column, colIndex) => {
        column.classList.add('dream-home-banner-col');
        column.classList.add(`sec-${colIndex + 1}`);
  
        if (column.classList.contains('sec-2')) {
          Array.from(column.children).forEach((child, i) => {
            child.classList.add(`sec-2-text-${i + 1}`);
          });
        }
      });
    });
  }
  