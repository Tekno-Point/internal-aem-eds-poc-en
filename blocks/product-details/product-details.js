export default function decorate(block) {
    const configRow = block.children[0];
    if (!configRow) return;

    const columns = configRow.children[0]?.textContent.trim() || '5';
    configRow.remove();

    const productsGrid = document.createElement('div');
    productsGrid.className = 'products-grid';
    productsGrid.setAttribute('data-columns', columns);

    Array.from(block.children).forEach(productRow => {
        const productIcon = productRow.children[0].children[0].children[0].children[0]|| '';
        const productTitle = productRow.children[1]?.textContent.trim() || '';
        const productValue = productRow.children[2]?.textContent.trim() || '';
        const productUnit = productRow.children[3]?.textContent.trim() || '';

        const productItem = document.createElement('div');
        productItem.className = 'product-item';

        productItem.innerHTML = `
           <div class="product-image">
           ${productIcon.outerHTML}
           </div>
           <div class="product-content">
               <h3 class="product-title">${productTitle}</h3>
               <div class="value-container">
                   <span class="product-value">${productValue}</span>
                   <span class="product-unit">${productUnit}<span>
               </div>
           </div>
        `
        productsGrid.appendChild(productItem)
    })
    block.innerHTML = '';
    block.appendChild(productsGrid)
}