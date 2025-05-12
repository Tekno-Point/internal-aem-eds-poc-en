export default function decorate(block) {
    // Extract content from the block divs based on component-models.json field order
    const backgroundColor = block.children[0]?.textContent || '#0075BE';
    const textColor = block.children[1]?.textContent || '#FFFFFF';

    // Get stats items from remaining divs (multifield)
    const statsItems = [];
    for (let i = 2; i < block.children.length; i++) {
        const row = block.children[i];
        if (row.children.length >= 2) {
            statsItems.push({
                figure: row.children[0]?.textContent || '',
                description: row.children[1]?.textContent || '',
                superscript: row.children[2]?.textContent || ''
            });
        }
    }

    // Clear block content
    block.innerHTML = '';

    // Create stats bar container
    const statsBar = document.createElement('div');
    statsBar.className = 'stats-bar-container';
    statsBar.style.backgroundColor = backgroundColor;
    statsBar.style.color = textColor;

    // Create stats items
    statsItems.forEach(item => {
        const statsItem = document.createElement('div');
        statsItem.className = 'stats-item';

        const figure = document.createElement('div');
        figure.className = 'stats-figure';

        const figureText = document.createElement('span');
        figureText.className = 'stats-figure-text';
        figureText.textContent = item.figure;

        figure.appendChild(figureText);

        if (item.superscript) {
            const sup = document.createElement('sup');
            sup.textContent = item.superscript;
            figure.appendChild(sup);
        }

        const description = document.createElement('div');
        description.className = 'stats-description';
        description.textContent = item.description;

        statsItem.appendChild(figure);
        statsItem.appendChild(description);
        statsBar.appendChild(statsItem);
    });

    // Add stats bar to block
    block.appendChild(statsBar);
}