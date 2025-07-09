export default function decorate(block) {
  const allRows = [...block.children];
  const validRows = allRows.filter((row) => row.children.length === 2);

  // Clear block content first
  block.innerHTML = '';

  const detailsList = validRows.map((row) => {
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);

    const body = row.children[1];
    body.className = 'accordion-item-body';

    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.append(summary, body);

    return details;
  });

  // Append only the first 3 items initially
  const visibleCount = 3;
  detailsList.forEach((item, i) => {
    if (i < visibleCount) item.classList.add('visible');
    block.appendChild(item);
  });

  // Create More/Less Button
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'accordion-toggle-btn';
  toggleBtn.textContent = 'More FAQs';
  block.appendChild(toggleBtn);

  let expanded = false;

  toggleBtn.addEventListener('click', () => {
    expanded = !expanded;
    detailsList.forEach((item, i) => {
      if (expanded || i < visibleCount) {
        item.classList.add('visible');
      } else {
        item.classList.remove('visible');
      }
    });
    toggleBtn.textContent = expanded ? 'Less FAQs' : 'More FAQs';
  });

  // Only one open at a time
  block.querySelectorAll('details').forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (detail.open) {
        block.querySelectorAll('details').forEach((el) => {
          if (el !== detail) el.removeAttribute('open');
        });
      }
    });
  });
}
