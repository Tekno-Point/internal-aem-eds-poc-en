export default function decorate(block) {
  if(!location.href.includes("author")){
  [...block.children].forEach((row) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'accordion-container';

    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);

    const body = row.children[1];
    body.className = 'accordion-item-body';

    const button = row.children[2];
    button.className = 'know-more-button';

    const details = document.createElement('div');
    details.className = 'accordion-item';
    details.append(summary, body);

    // details.addEventListener('click', () => {
    //   details.classList.toggle('active')
    // })

    wrapper.append(details);
    wrapper.append(button);
    row.replaceWith(wrapper);
    document.querySelectorAll('.section.faq-card .accordion-item').forEach(label => {
  // Example: Add a click listener
  label.addEventListener('click', () => {
    label.classList.toggle('active');
  });
});
  });
  
} 
}
// Hover Functionality