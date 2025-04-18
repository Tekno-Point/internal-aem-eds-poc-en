export default function decorate(block) {
    // Add structure classes to child rows
    Array.from(block.children).forEach((row) => {
        row.classList.add("accordion-sec-container");

        Array.from(row.children).forEach((column, index) => {
            column.classList.add("accordion-sec-container-column");
            column.classList.add(`column-${index + 1}`);
        });
    });

    // Add class to default-content-wrapper if exists
    const heading = block.querySelector('.accordion-container > div');
    if (heading) {
        heading.classList.add('new-class'); // No dot when using classList.add
    }

    // Add class to accordion-wrapper
    const accordionWrapper = block.querySelector('.accordion-wrapper');
    if (accordionWrapper) {
        accordionWrapper.classList.add('accordion-content-wrapper');
    }

    // Accordion behavior
    const accordionItems = block.querySelectorAll('.accordion-sec-container');

    accordionItems.forEach((item, i) => {
        const question = item.querySelector('.column-1');
        const answer = item.querySelector('.column-2');

        if (question && answer) {
            // Wrap question in button
            const button = document.createElement('button');
            button.classList.add('accordion-question');
            button.innerHTML = question.innerHTML;
            question.innerHTML = '';
            question.appendChild(button);

            // Style answer
            answer.classList.add('accordion-answer');

            // Default state
            if (i === 0) {
                answer.style.display = 'block'; // Open first
                button.classList.add('open');
            } else {
                answer.style.display = 'none';
            }

            // Click handler for single-open behavior
            button.addEventListener('click', () => {
                accordionItems.forEach((otherItem, j) => {
                    const otherAnswer = otherItem.querySelector('.column-2');
                    const otherButton = otherItem.querySelector('.accordion-question');
                    if (i === j) {
                        const isOpen = otherAnswer.style.display === 'block';
                        otherAnswer.style.display = isOpen ? 'none' : 'block';
                        otherButton.classList.toggle('open', !isOpen);
                    } else {
                        otherAnswer.style.display = 'none';
                        otherButton.classList.remove('open');
                    }
                });
            });
        }
    });


}
// const container = section.querySelector('.accordion-container');
// if (container) {
//   const ul = container.querySelector('ul');
//   if (ul) {
//     ul.classList.add('accordion-heading-list'); // Add custom class to <ul>

//     const lis = ul.querySelectorAll('li');
//     lis.forEach((li, index) => {
//       li.classList.add('accordion-heading-item');
//       li.classList.add(`heading-item-${index + 1}`); // Optional: index-based class
//     });
//   }
// }

