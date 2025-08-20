
export default function decorate(block) {
  // Extract all direct children of the block
  const children = [...block.children];

  // Create the main wrapper for the specification content
  const specificationWrapper = document.createElement('div');
  specificationWrapper.id = 'destini-specification-wrap';
  specificationWrapper.className = 'destini-specification';
  specificationWrapper.setAttribute('data-component', 'destini-specification');

  // Create image animation wrapper
  const imageAnimateWrapper = document.createElement('div');
  imageAnimateWrapper.className = 'image-animate-wraps';

  // Create image containers
  const imageContainers = ['first-img-wrap', 'second-img-wrap', 'third-img-wrap'];
  const imageClasses = ['entry-img', 'middle-img', 'last-img'];
  const mobileImageClasses = ['entry-mob-img', 'middle-mob-img', 'last-mob-img'];

  imageContainers.forEach((containerClass, index) => {
    const container = document.createElement('div');
    container.className = containerClass;

    // Create desktop image
    const desktopImage = document.createElement('img');
    desktopImage.loading = 'lazy';
    desktopImage.className = imageClasses[index];
    desktopImage.src = children[index * 2].querySelector('img').src;
    desktopImage.alt = children[index * 2].querySelector('img').alt;
    container.appendChild(desktopImage);

    // Create mobile image
    const mobileImage = document.createElement('img');
    mobileImage.loading = 'lazy';
    mobileImage.className = mobileImageClasses[index];
    mobileImage.src = children[index * 2 + 1].querySelector('img').src;
    mobileImage.alt = children[index * 2 + 1].querySelector('img').alt;
    container.appendChild(mobileImage);

    imageAnimateWrapper.appendChild(container);
  });

  // Create text animation wrapper
  const textAnimateWrapper = document.createElement('div');
  textAnimateWrapper.className = 'text-animate-wraps';

  // Create feature text wrapper
  const featureTextWrapper = document.createElement('div');
  featureTextWrapper.className = 'feature-text';

  // Process feature items
  children.slice(6, 9).forEach((featureItem) => {
    const featureWrap = document.createElement('div');
    featureWrap.className = 'feature-wrap';

    const mainHeading = document.createElement('div');
    mainHeading.className = 'main-heading';
    mainHeading.textContent = featureItem.children[0].textContent.trim();

    const subHeading = document.createElement('div');
    subHeading.className = 'sub-heading';
    subHeading.textContent = featureItem.children[1].textContent.trim();

    featureWrap.appendChild(mainHeading);
    featureWrap.appendChild(subHeading);
    featureTextWrapper.appendChild(featureWrap);
  });

  textAnimateWrapper.appendChild(featureTextWrapper);

  // Create feature CTAs
  const featureCtas = document.createElement('div');
  featureCtas.className = 'feature-ctas';

  // Create brochure CTA
  const brochureCta = document.createElement('a');
  brochureCta.className = 'cta-first';
  brochureCta.href = children[9].querySelector('a').href;
  brochureCta.download = 'Brochure';
  brochureCta.target = '_blank';

  const brochureIcon = document.createElement('img');
  brochureIcon.loading = 'lazy';
  brochureIcon.src = '/content/dam/hero-commerce/in/en/products/scooters/content-fragments/new-destini-125/assets/icons/download_icon.png';
  brochureIcon.alt = 'link image';
  brochureCta.appendChild(brochureIcon);

  const brochureText = document.createElement('div');
  brochureText.className = 'cta-text';
  brochureText.textContent = children[10].textContent.trim();
  brochureCta.appendChild(brochureText);

  featureCtas.appendChild(brochureCta);

  // Create specification CTA
  const specificationCta = document.createElement('div');
  specificationCta.className = 'cta-second';

  const specificationText = document.createElement('div');
  specificationText.className = 'cta-text';
  specificationText.setAttribute('data-bs-toggle', 'modal');
  specificationText.setAttribute('data-bs-target', '#specModal');
  specificationText.textContent = children[11].textContent.trim();
  specificationCta.appendChild(specificationText);

  const specificationIcon = document.createElement('img');
  specificationIcon.loading = 'lazy';
  specificationIcon.src = '/content/dam/hero-commerce/in/en/products/scooters/content-fragments/new-destini-125/assets/icons/right_arrow_red.png';
  specificationIcon.alt = 'link image';
  specificationCta.appendChild(specificationIcon);

  featureCtas.appendChild(specificationCta);

  textAnimateWrapper.appendChild(featureCtas);

  // Create modal
  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.id = 'specModal';
  modal.setAttribute('role', 'dialog');

  const modalDialog = document.createElement('div');
  modalDialog.className = 'modal-dialog modal-dialog-scrollable modal-cont-mw modal-xl modal-dialog-centered';

  const closeButton = document.createElement('div');
  closeButton.className = 'close';
  closeButton.setAttribute('data-bs-dismiss', 'modal');

  const closeIcon = document.createElement('img');
  closeIcon.loading = 'lazy';
  closeIcon.className = 'specification-container-close-mob';
  closeIcon.src = '/content/dam/hero-commerce/in/en/products/scooters/content-fragments/new-destini-125/assets/icons/close_cta.png';
  closeIcon.alt = 'close';
  closeButton.appendChild(closeIcon);

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content specification-container animate-modal-bottom';

  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';

  const specHeader = document.createElement('div');
  specHeader.className = 'spec-header';
  specHeader.textContent = 'SPECIFICATIONS of XOOM 160';
  modalHeader.appendChild(specHeader);

  const closeButtonHeader = closeButton.cloneNode(true);
  closeButtonHeader.querySelector('img').className = 'specification-container-close';
  modalHeader.appendChild(closeButtonHeader);

  const tabList = document.createElement('ul');
  tabList.className = 'nav nav-tabs';
  tabList.id = 'harley-specs';
  tabList.setAttribute('role', 'tablist');

  const tabItems = [
    { id: 'engine', label: 'Engine', active: true },
    { id: 'transmission', label: 'Transmission' },
    { id: 'suspension', label: 'Suspension' },
    { id: 'tyres', label: 'Tyres' },
    { id: 'dimensions', label: 'Dimensions' },
    { id: 'electricals', label: 'Electricals' },
    { id: 'weight', label: 'Weight' }
  ];

  tabItems.forEach((tabItem, index) => {
    const tabListItem = document.createElement('li');
    tabListItem.className = 'tab-text';
    if (tabItem.active) tabListItem.classList.add('active');

    const tabLink = document.createElement('a');
    tabLink.href = `#${tabItem.id}`;
    tabLink.setAttribute('data-bs-toggle', 'tab');
    tabLink.setAttribute('aria-selected', tabItem.active ? 'true' : 'false');
    if (!tabItem.active) tabLink.setAttribute('tabindex', '-1');
    tabLink.setAttribute('role', 'tab');
    tabLink.textContent = tabItem.label;
    if (tabItem.active) tabLink.classList.add('active');

    tabListItem.appendChild(tabLink);
    tabList.appendChild(tabListItem);
  });

  const tabContent = document.createElement('div');
  tabContent.className = 'tab-content modal-body';

  const tabData = [
    {
      id: 'engine',
      active: true,
      rows: [
        { main: 'Type', desc: 'Liquid cooled, 4 Valve single cylinder SOHC' },
        { main: 'Displacement', desc: '156cc' },
        { main: 'Max Power (bhp/rpm)', desc: '10.9 kw (14.6 bhp) @ 8000 rpm' },
        { main: 'Max Torque (Nm/rpm)', desc: '14 Nm @ 6500 rpm' },
        { main: 'Ignition', desc: 'Fuel Injection (FI)' }
      ]
    },
    {
      id: 'transmission',
      rows: [
        { main: 'Type', desc: 'CVT' },
        { main: 'Clutch Type', desc: 'Dry, Centrifugal' }
      ]
    },
    {
      id: 'suspension',
      rows: [
        { main: 'Front', desc: 'Telescopic Hydraulic shock absorber' },
        { main: 'Rear', desc: 'Dual shock absorbers' }
      ]
    },
    {
      id: 'tyres',
      rows: [
        { main: 'Front Tyre', desc: '120/70 - 14"' },
        { main: 'Rear Tyre', desc: '140/60 - 14"' }
      ]
    },
    {
      id: 'dimensions',
      rows: [
        { main: 'Length', desc: '1983 mm' },
        { main: 'Width', desc: '772 mm' },
        { main: 'Height', desc: '1214 mm' },
        { main: 'Wheelbase', desc: '1348 mm' },
        { main: 'Seat Height', desc: '787 mm' },
        { main: 'Ground Clearance', desc: '155 mm' }
      ]
    },
    {
      id: 'electricals',
      rows: [
        { main: 'Battery', desc: '12V- 6Ah /ETZ-7' },
        { main: 'Starting System', desc: 'Self' }
      ]
    },
    {
      id: 'weight',
      rows: [
        { main: 'Kerb Weight', desc: '142 kg' },
        { main: 'Fuel Tank Capacity', desc: '7 L' }
      ]
    }
  ];

  tabData.forEach((tab) => {
    const tabPane = document.createElement('div');
    tabPane.id = tab.id;
    tabPane.className = `tab-div tab-pane fade ${tab.active ? 'active show' : ''}`;
    tabPane.setAttribute('role', 'tabpanel');

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    tab.rows.forEach((row, index) => {
      const tr = document.createElement('tr');
      tr.className = index % 2 === 0 ? 'even' : 'odd';

      const mainTd = document.createElement('td');
      mainTd.className = 'main-text';
      const mainDiv = document.createElement('div');
      mainDiv.textContent = row.main;
      mainTd.appendChild(mainDiv);
      tr.appendChild(mainTd);

      const descTd = document.createElement('td');
      descTd.className = 'main-desc';
      const descDiv = document.createElement('div');
      descDiv.textContent = row.desc;
      descTd.appendChild(descDiv);
      tr.appendChild(descTd);

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    tabPane.appendChild(table);
    tabContent.appendChild(tabPane);
  });

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(tabList);
  modalContent.appendChild(tabContent);

  modalDialog.appendChild(closeButton);
  modalDialog.appendChild(modalContent);

  modal.appendChild(modalDialog);

  // Assemble the final structure
  specificationWrapper.appendChild(imageAnimateWrapper);
  specificationWrapper.appendChild(textAnimateWrapper);
  specificationWrapper.appendChild(modal);

  // Replace the original block content
  block.innerHTML = '';
  block.appendChild(specificationWrapper);
}
    