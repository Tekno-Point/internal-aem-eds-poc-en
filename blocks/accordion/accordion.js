export default function decorate(block) {
    Array.from(block.children).forEach((row) => {
        row.classList.add("accordion-sec-container");
        Array.from(row.children).forEach((column, index) => {
            column.classList.add("accordion-sec-container-column");
            column.classList.add(`column-${index + 1}`);
        });
    });
    const heading = block.querySelector('.accordion-container > div');
    if (heading) {
        heading.classList.add('new-class'); // No dot when using classList.add
    }

    const accordionWrapper = block.querySelector('.accordion-wrapper');
    if (accordionWrapper) {
        accordionWrapper.classList.add('accordion-content-wrapper');
    }

    const accordionItems = block.querySelectorAll('.accordion-sec-container');

    accordionItems.forEach((item, i) => {
        const question = item.querySelector('.column-1');
        const answer = item.querySelector('.column-2');

        if (question && answer) {
            const button = document.createElement('button');
            button.classList.add('accordion-question');
            button.innerHTML = question.innerHTML;
            question.innerHTML = '';
            question.appendChild(button);

            answer.classList.add('accordion-answer');

            if (i === 0) {
                answer.style.display = 'block'; // Open first
                button.classList.add('open');
            } else {
                answer.style.display = 'none';
            }

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