import {decorateSections} from '../../scripts/scripts';
import { decorateSections } from '../../scripts/aem';

export default function decorate(main) {
    main.querySelectorAll(':scope > div:not([data-section-status])').forEach((section) => {
        const wrappers = [];
        let defaultContent = false;

        [...section.children].forEach((e) => {
            if ((e.tagName === 'DIV' && e.className) || !defaultContent) {
                const wrapper = document.createElement('div');
                wrappers.push(wrapper);
                defaultContent = e.tagName !== 'DIV' || !e.className;
                if (defaultContent) wrapper.classList.add('default-content-wrapper');
            }
            wrappers[wrappers.length - 1].append(e);
        });

        wrappers.forEach((wrapper) => section.append(wrapper));
        section.classList.add('section');
        section.dataset.sectionStatus = 'initialized';
        section.style.display = 'none';

        // Process section metadata
        const sectionMeta = section.querySelector('div.section-metadata');
        if (sectionMeta) {
            const meta = readBlockConfig(sectionMeta);
            Object.keys(meta).forEach((key) => {
                if (key === 'style') {
                    const styles = meta.style
                        .split(',')
                        .filter((style) => style)
                        .map((style) => toClassName(style.trim()));
                    styles.forEach((style) => section.classList.add(style));
                } else {
                    section.dataset[toCamelCase(key)] = meta[key];
                }
            });
            sectionMeta.parentNode.remove();
        }
    });
}
