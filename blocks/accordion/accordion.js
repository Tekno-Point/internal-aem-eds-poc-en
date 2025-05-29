export default function decorate(block) {
    [...block.children].forEach((row) => {
      console.log(row)
      const wrapper = document.createElement('div');
      wrapper.className = 'accordion-wrapper';

      const label = row.children[0];
      const summary = document.createElement('summary');
      summary.className = 'accordion-item-label';
      summary.append(...label.childNodes);

      const body = row.children[1];
      body.className = 'accordion-item-body';

      const button = row.children[2];
      button.className = 'know-more-button';

      const details = document.createElement('details');
      details.className = 'accordion-item';
      details.append(summary, body);

      wrapper.append(details);
      wrapper.append(button);
      row.replaceWith(wrapper);
    });
  } 