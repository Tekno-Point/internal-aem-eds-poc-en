export default function decorate(block) {
  const items = [...block.children].filter(
    (item) => item.querySelectorAll('div').length >= 2
  );

  block.innerHTML = '';

  const visibleCount = 3;
  items.forEach((item, index) => {
    item.classList.add('accordion-item');
    const question = item.children[0];
    const answer = item.children[1];

    question.classList.add('accordion-item-label');
    answer.classList.add('accordion-item-body');

    answer.style.maxHeight = '0px';
    answer.style.overflow = 'hidden';

    if (index < visibleCount) item.classList.add('visible');
    block.appendChild(item);
  });

  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'accordion-toggle-btn';
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
        item.querySelector('.accordion-item-body').style.maxHeight = '0px';
      }
    });
    toggleBtn.textContent = expanded ? 'Less FAQs' : 'More FAQs';
  });

  items.forEach((item) => {
    const question = item.querySelector('.accordion-item-label');
    const answer = item.querySelector('.accordion-item-body');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      items.forEach((el) => {
        el.classList.remove('open');
        el.querySelector('.accordion-item-body').style.maxHeight = '0px';
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}
