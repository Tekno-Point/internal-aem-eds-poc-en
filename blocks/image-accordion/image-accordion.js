export default function decorate(block) {
    [...block.children].forEach((row) => {
        const label = row.children[1];
        const summary = document.createElement('summary');
        summary.className = 'accordion-item-label';
        summary.append(...label.children)

        const image = row.children[0];
        const content = row.children[2];

        const body = document.createElement('div');
        body.className = 'accordion-item-body';
        body.append(image, content);

        const details = document.createElement('details');
        details.className = 'accordion-item';
        details.append(summary, body);

        summary.addEventListener('click', () => {
            details.classList.toggle('active')
        })

        row.replaceWith(details);
    })
}