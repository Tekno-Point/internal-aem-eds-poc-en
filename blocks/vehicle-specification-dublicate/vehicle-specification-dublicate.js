
  export default function decorate(block) {
    // Extract all direct children of the block
    const children = [...block.children];

    // Create wrappers for different sections
    const imageAnimateWrap = document.createElement('div');
    imageAnimateWrap.className = 'image-animate-wraps';

    const textAnimateWrap = document.createElement('div');
    textAnimateWrap.className = 'text-animate-wraps';

    const featureTextWrap = document.createElement('div');
    featureTextWrap.className = 'feature-text';

    const featureCtasWrap = document.createElement('div');
    featureCtasWrap.className = 'feature-ctas';

    // Process image animation section
    const imageContainer = children[0];
    const imageChildren = [...imageContainer.children];

    const imageWraps = [
      { class: 'first-img-wrap', imgClass: 'entry-img' },
      { class: 'second-img-wrap', imgClass: 'middle-img' },
      { class: 'third-img-wrap', imgClass: 'last-img' }
    ];

    imageWraps.forEach((wrap, index) => {
      const wrapDiv = document.createElement('div');
      wrapDiv.className = wrap.class;

      const imgDiv = imageChildren[index * 2];
      const mobImgDiv = imageChildren[index * 2 + 1];

      if (imgDiv) {
        const img = imgDiv.querySelector('img');
        if (img) {
          img.className = wrap.imgClass;
          wrapDiv.appendChild(img);
        }
      }

      if (mobImgDiv) {
        const mobImg = mobImgDiv.querySelector('img');
        if (mobImg) {
          mobImg.className = `${wrap.imgClass}-mob`;
          wrapDiv.appendChild(mobImg);
        }
      }

      imageAnimateWrap.appendChild(wrapDiv);
    });

    // Process feature text section
    const featureContainer = children[1];
    const featureChildren = [...featureContainer.children];

    featureChildren.forEach(featureChild => {
      const featureWrap = document.createElement('div');
      featureWrap.className = 'feature-wrap';

      const mainHeading = document.createElement('div');
      mainHeading.className = 'main-heading';
      mainHeading.textContent = featureChild.textContent.trim();

      const subHeading = document.createElement('div');
      subHeading.className = 'sub-heading';
      subHeading.textContent = featureChild.nextElementSibling.textContent.trim();

      featureWrap.appendChild(mainHeading);
      featureWrap.appendChild(subHeading);

      featureTextWrap.appendChild(featureWrap);
    });

    textAnimateWrap.appendChild(featureTextWrap);

    // Process CTA buttons section
    const ctaContainer = children[2];
    const ctaChildren = [...ctaContainer.children];

    const ctaFirst = document.createElement('a');
    ctaFirst.className = 'cta-first';
    ctaFirst.href = '/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/pdf/xoom_160_Leaflet.pdf';
    ctaFirst.download = 'Brochure';
    ctaFirst.target = '_blank';

    const downloadIconDiv = ctaChildren[0];
    const downloadIcon = downloadIconDiv.querySelector('img');
    if (downloadIcon) {
      downloadIcon.className = '';
      ctaFirst.appendChild(downloadIcon);
    }

    const ctaTextFirst = document.createElement('div');
    ctaTextFirst.className = 'cta-text';
    ctaTextFirst.textContent = 'Brochure';
    ctaFirst.appendChild(ctaTextFirst);

    const ctaSecond = document.createElement('div');
    ctaSecond.className = 'cta-second';

    const ctaTextSecond = document.createElement('div');
    ctaTextSecond.className = 'cta-text';
    ctaTextSecond.setAttribute('data-bs-toggle', 'modal');
    ctaTextSecond.setAttribute('data-bs-target', '#specModal');
    ctaTextSecond.textContent = 'View Full Specifications';
    ctaSecond.appendChild(ctaTextSecond);

    const arrowIcon = document.createElement('img');
    arrowIcon.src = '/content/dam/hero-commerce/in/en/products/scooters/content-fragments/new-destini-125/assets/icons/right_arrow_red.png';
    arrowIcon.alt = 'link image';
    ctaSecond.appendChild(arrowIcon);

    featureCtasWrap.appendChild(ctaFirst);
    featureCtasWrap.appendChild(ctaSecond);

    textAnimateWrap.appendChild(featureCtasWrap);

    // Clear the original block content
    block.innerHTML = '';

    // Append the new structure to the block
    block.appendChild(imageAnimateWrap);
    block.appendChild(textAnimateWrap);

    // Add modal HTML directly to the body
    const modalHTML = `
      <div class="modal fade" id="specModal" role="dialog">
        <div class="modal-dialog modal-dialog-scrollable modal-cont-mw modal-xl modal-dialog-centered">
          <div class="close" data-bs-dismiss="modal">
            <img loading="lazy" class="specification-container-close-mob" src="/content/dam/hero-commerce/in/en/products/scooters/content-fragments/new-destini-125/assets/icons/close_cta.png" alt="close">
          </div>
          <div class="modal-content specification-container animate-modal-bottom">
            <div class="modal-header">
              <div class="spec-header">
                SPECIFICATIONS of XOOM 160
              </div>
              <div class="close" data-bs-dismiss="modal">
                <img loading="lazy" class="specification-container-close" src="/content/dam/hero-commerce/in/en/products/scooters/content-fragments/new-destini-125/assets/icons/close_icon.png" alt="close">
              </div>
            </div>
            <ul class="nav nav-tabs" id="harley-specs" role="tablist">
              <li class="tab-text active">
                <a class="active" href="#engine" data-bs-toggle="tab" aria-selected="true" role="tab">Engine</a>
              </li>
              <li class="tab-text ">
                <a href="#transmission" data-bs-toggle="tab" aria-selected="false" tabindex="-1" role="tab">Transmission</a>
              </li>
              <li class="tab-text ">
                <a href="#suspension" data-bs-toggle="tab" aria-selected="false" tabindex="-1" role="tab">Suspension</a>
              </li>
              <li class="tab-text ">
                <a href="#tyres" data-bs-toggle="tab" aria-selected="false" tabindex="-1" role="tab">Tyres</a>
              </li>
              <li class="tab-text ">
                <a href="#dimensions" data-bs-toggle="tab" aria-selected="false" tabindex="-1" role="tab">Dimensions</a>
              </li>
              <li class="tab-text ">
                <a href="#electricals" data-bs-toggle="tab" aria-selected="false" tabindex="-1" role="tab">Electricals</a>
              </li>
              <li class="tab-text ">
                <a href="#weight" data-bs-toggle="tab" aria-selected="false" tabindex="-1" role="tab">Weight</a>
              </li>
            </ul>
            <div class="tab-content modal-body">
              <div id="engine" class="tab-div tab-pane fade active show" role="tabpanel">
                <table>
                  <tbody>
                    <tr class="even">
                      <td class="main-text"><div>Type</div></td>
                      <td class="main-desc"><div>Liquid cooled, 4 Valve single cylinder SOHC</div></td>
                    </tr>
                    <tr class="odd">
                      <td class="main-text"><div>Displacement</div></td>
                      <td class="main-desc"><div>156cc</div></td>
                    </tr>
                    <tr class="even">
                      <td class="main-text"><div>Max Power (bhp/rpm)</div></td>
                      <td class="main-desc"><div>10.9 kw (14.6 bhp) @ 8000 rpm</div></td>
                    </tr>
                    <tr class="odd">
                      <td class="main-text"><div>Max Torque (Nm/rpm)</div></td>
                      <td class="main-desc"><div>14 Nm @ 6500 rpm</div></td>
                    </tr>
                    <tr class="even">
                      <td class="main-text"><div>Ignition</div></td>
                      <td class="main-desc"><div>Fuel Injection (FI)</div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="transmission" class="tab-div tab-pane fade " role="tabpanel">
                <table>
                  <tbody>
                    <tr class="even">
                      <td class="main-text"><div>Type</div></td>
                      <td class="main-desc"><div>CVT</div></td>
                    </tr>
                    <tr class="odd">
                      <td class="main-text"><div>Clutch Type</div></td>
                      <td class="main-desc"><div>Dry, Centrifugal</div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="suspension" class="tab-div tab-pane fade " role="tabpanel">
                <table>
                  <tbody>
                    <tr class="even">
                      <td class="main-text"><div>Front</div></td>
                      <td class="main-desc"><div>Telescopic Hydraulic shock absorber</div></td>
                    </tr>
                    <tr class="odd">
                      <td class="main-text"><div>Rear</div></td>
                      <td class="main-desc"><div>Dual shock absorbers</div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="tyres" class="tab-div tab-pane fade " role="tabpanel">
                <table>
                  <tbody>
                    <tr class="even">
                      <td class="main-text"><div>Front Tyre</div></td>
                      <td class="main-desc"><div>120/70 - 14"</div></td>
                    </tr>
                    <tr class="odd">
                      <td class="main-text"><div>Rear Tyre</div></td>
                      <td class="main-desc"><div>140/60 - 14"</div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="dimensions" class="tab-div tab-pane fade " role="tabpanel">
                <table>
                  <tbody>
                    <tr class="even">
                      <td class="main-text"><div>Length</div></td>
                      <td class="main-desc"><div>1983 mm</div></td>
                    </tr>
                    <tr class="odd">
                      <td class="main-text"><div>Width</div></td>
                      <td class="main-desc"><div>772 mm</div></td>
                    </tr>
                    <tr class="even">
                      <td class="main-text"><div>Height</div></td>
                      <td class="main-desc"><div>1214 mm</div></td>
                    </tr>
                    <tr class="odd">
                      <td class="main-text"><div>Wheelbase</div></td>
                      <td class="main-desc"><div>1348 mm</div></td>
                    </tr>
                    <tr class="even">
                      <td class="main-text"><div>Seat Height</div></td>
                      <td class="main-desc"><div>787 mm</div></td>
                    </tr>
                    <tr class="odd">
                      <td class="main-text"><div>Ground Clearance</div></td>
                      <td class="main-desc"><div>155 mm</div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="electricals" class="tab-div tab-pane fade " role="tabpanel">
                <table>
                  <tbody>
                    <tr class="even">
                      <td class="main-text"><div>Battery</div></td>
                      <td class="main-desc"><div>12V- 6Ah /ETZ-7</div></td>
                    </tr>
                    <tr class="odd">
                      <td class="main-text"><div>Starting System</div></td>
                      <td class="main-desc"><div>Self</div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="weight" class="tab-div tab-pane fade " role="tabpanel">
                <table>
                  <tbody>
                    <tr class="even">
                      <td class="main-text"><div>Kerb Weight</div></td>
                      <td class="main-desc"><div>142 kg</div></td>
                    </tr>
                    <tr class="odd">
                      <td class="main-text"><div>Fuel Tank Capacity</div></td>
                      <td class="main-desc"><div>7 L</div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML.trim();
    document.body.appendChild(modalContainer);
  }
    