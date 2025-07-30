
import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
    // Parse the main block fields
    const bgImage = block.children[0]?.children[0].querySelector('img')?.src || '';
    const imageWrapper = block.children[1]?.children[0];
    const textContent = block.children[2]?.children[0]?.innerHTML || '';
    const buttonText = block.children[3]?.children[0]?.textContent?.trim() || '';
    const buttonLink = block.children[4]?.children[0]?.textContent?.trim() || '#';

    document.documentElement.style.setProperty('--aboutus-bg', 'url(' + bgImage + ')');

    // Create the main section
    const aboutSection = document.createElement('div');
    aboutSection.className = 'about-section section-padding section-bg-2 pt-0 pb-0';

    const aboutWrapper = document.createElement('div');
    aboutWrapper.className = 'about-wrapper style-2';

    const row = document.createElement('div');
    row.className = 'row align-items-center';

    // Create the content column
    const contentCol = document.createElement('div');
    contentCol.className = 'about-us-description';

    const aboutContent = document.createElement('div');
    aboutContent.className = 'about-content';

    const titleDiv = document.createElement('div');
    titleDiv.className = 'div-title text-white';

    const titleHeading = document.createElement('h2');
    titleHeading.className = 'wow fadeInUp text-white';
    titleHeading.setAttribute('data-wow-delay', '.3s');
    titleHeading.innerHTML = textContent;
    titleDiv.appendChild(titleHeading);

    aboutContent.append(titleDiv);
    contentCol.appendChild(aboutContent);

    // Create the image column
    const imageCol = document.createElement('div');
    imageCol.className = 'about-us-image';

    const aboutImageItems = document.createElement('div');
    aboutImageItems.className = 'about-image-items';

    if (imageWrapper) {
        const picture = imageWrapper.querySelector('picture');
        if (picture) {
            // const optimizedPicture = createOptimizedPicture(
            //     picture.querySelector('img').src,
            //     imageAlt,
            //     false,
            //     [
            //         { media: '(min-width: 1024px)', width: '800' },
            //         { width: '400' }
            //     ]
            // );

            const optimizedPicture = picture;

            aboutImageItems.appendChild(optimizedPicture);
        }
    }

    imageCol.appendChild(aboutImageItems);

    // Assemble the content row
    aboutWrapper.append(contentCol, imageCol);
    aboutSection.appendChild(aboutWrapper);

    // Parse the counter items
    const counterItems = Array.from(block.children).slice(5);
    if (counterItems.length > 0) {
        const counterSection = document.createElement('div');
        counterSection.className = 'about-us-counter';

        counterItems.forEach((item, index) => {
            const count = item.children[0]?.children[0]?.textContent?.trim() || '';
            const label = item.children[1]?.children[0]?.textContent?.trim() || '';
            const iconWrapper = item.children[2]?.children[0];
            const iconAlt = item.children[3]?.children[0]?.textContent?.trim() || '';

            const counterItem = document.createElement('div');
            counterItem.className = 'counter-items';
            // counterItem.setAttribute('data-wow-delay', `${0.3 + (index * 0.2)}s`);

            const iconDiv = document.createElement('div');
            iconDiv.className = 'counter-icon';

            if (iconWrapper) {
                const iconImg = iconWrapper.querySelector('img');
                if (iconImg) {
                    const optimizedIcon = createOptimizedPicture(
                        iconImg.src,
                        iconAlt,
                        false,
                        [{ width: '48' }]
                    );
                    iconDiv.appendChild(optimizedIcon);
                }
            }
            
            const hoverIcons = document.createElement('div');
            hoverIcons.className = `hover-icons hover-icons-${index + 1}`;

            // Add static icons (not part of the model)
            const staticIcons = [
                'https://www.esafbank.com/wp-content/themes/esaf/images/icons/Icons-05.svg',
                'https://www.esafbank.com/wp-content/themes/esaf/images/icons/Icons-06.svg',
                'https://www.esafbank.com/wp-content/themes/esaf/images/icons/Icons-03.svg',
                'https://www.esafbank.com/wp-content/themes/esaf/images/icons/Icons-02.svg',
                'https://www.esafbank.com/wp-content/themes/esaf/images/icons/Icons-04.svg',
                'https://www.esafbank.com/wp-content/themes/esaf/images/icons/Icons-09.svg',
                'https://www.esafbank.com/wp-content/themes/esaf/images/icons/Icons-12.svg',
                'https://www.esafbank.com/wp-content/themes/esaf/images/icons/Icons-10.svg',
                'https://www.esafbank.com/wp-content/themes/esaf/images/icons/Icons-08.svg',
                'https://www.esafbank.com/wp-content/themes/esaf/images/icons/Icons-11.svg',
                'https://www.esafbank.com/wp-content/themes/esaf/images/icons/Icons-14.svg',
                'https://www.esafbank.com/wp-content/themes/esaf/images/icons/Icons-15.svg',
                'https://www.esafbank.com/wp-content/themes/esaf/images/icons/Icons-18.svg',
                'https://www.esafbank.com/wp-content/themes/esaf/images/icons/Icons-16.svg',
                'https://www.esafbank.com/wp-content/themes/esaf/images/icons/Icons-17.svg',
                'https://www.esafbank.com/wp-content/themes/esaf/images/icons/Icons-21.svg',
                'https://www.esafbank.com/wp-content/themes/esaf/images/icons/Icons-22.svg',
                'https://www.esafbank.com/wp-content/themes/esaf/images/icons/Icons-23.svg',
                'https://www.esafbank.com/wp-content/themes/esaf/images/icons/Icons-24.svg',
                'https://www.esafbank.com/wp-content/themes/esaf/images/icons/Icons-20.svg'
            ];

            staticIcons.slice(index * 5, (index + 1) * 5).forEach(iconSrc => {
                const iconImg = document.createElement('img');
                iconImg.src = iconSrc;
                iconImg.alt = '';
                iconImg.className = 'hover-icon';
                hoverIcons.appendChild(iconImg);
            });

            const contentDiv = document.createElement('div');
            contentDiv.className = 'content';

            const countHeading = document.createElement('h2');
            countHeading.innerHTML = `<span class="count">${count}</span>+`;

            const labelParagraph = document.createElement('p');
            labelParagraph.textContent = label;

            contentDiv.append(countHeading, labelParagraph);
            iconDiv.append(hoverIcons);
            counterItem.append(iconDiv, contentDiv);
            counterSection.appendChild(counterItem);
        });

        aboutSection.appendChild(counterSection);
    }

    // Replace the original block content
    block.innerHTML = '';
    block.appendChild(aboutSection);

    // Move instrumentation
    moveInstrumentation(block, aboutSection);

    // Add loaded class for CSS transitions
    setTimeout(() => {
        block.classList.add('loaded');
    }, 100);

    // Initialize animations on scroll
    // const observer = new IntersectionObserver((entries) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             entry.target.classList.add('animate');
    //             observer.unobserve(entry.target);
    //         }
    //     });
    // }, { threshold: 0.1 });

    // const animatableElements = aboutSection.querySelectorAll('.wow');
    // animatableElements.forEach(el => observer.observe(el));
}
