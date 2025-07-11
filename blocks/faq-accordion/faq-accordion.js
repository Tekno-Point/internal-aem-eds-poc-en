export default function decorate(block) {

  block.id = "faqs"
  const items = [...block.children].filter(
    (item) => item.querySelectorAll('div').length >= 2
  );

  // Clear block
  block.innerHTML = '';

  const visibleCount = 3;
  items.forEach((item, index) => {
    item.classList.add('faq-accordion-item');
    const question = item.children[0];
    const answer = item.children[1];

    question.classList.add('faq-accordion-label');
    answer.classList.add('faq-accordion-body');

    // Hide body by default
    answer.style.maxHeight = '0px';
    answer.style.overflow = 'hidden';

    if (index < visibleCount) item.classList.add('visible');
    block.appendChild(item);
  });

  // Add More/Less Button
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'faq-accordion-toggle-btn';
  toggleBtn.textContent = 'More FAQs';
  block.appendChild(toggleBtn);

  let expanded = false;
  toggleBtn.addEventListener('click', () => {
    expanded = !expanded;
    items.forEach((item, i) => {
      if (expanded || i < visibleCount) {
        item.classList.add('visible');
      } else {
        item.classList.remove('visible');
        item.classList.remove('open');
        item.querySelector('.faq-accordion-body').style.maxHeight = '0px';
      }
    });
    toggleBtn.textContent = expanded ? 'Less FAQs' : 'More FAQs';
  });

  // Accordion behavior: one open at a time
  items.forEach((item) => {
    const question = item.querySelector('.faq-accordion-label');
    const answer = item.querySelector('.faq-accordion-body');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others
      items.forEach((el) => {
        el.classList.remove('open');
        el.querySelector('.faq-accordion-body').style.maxHeight = '0px';
      });

      // Open clicked one
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}
