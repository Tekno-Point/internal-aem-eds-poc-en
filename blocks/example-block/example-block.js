/*
<div class="example-block block" data-block-name="example-block" data-block-status="loaded">
  <div>
    <div>
      <picture>
        <source type="image/webp" srcset="..." media="(min-width: 600px)">
        <source type="image/webp" srcset="...">
        <source type="image/png" srcset="..." media="(min-width: 600px)">
        <img loading="lazy" alt="low-code" src="..." width="750" height="496">
      </picture>
    </div>
  </div>
  <div>
    <div>
      <picture>
        <source type="image/webp" srcset="..." media="(min-width: 600px)">
        <source type="image/webp" srcset="...">
        <source type="image/png" srcset="..." media="(min-width: 600px)">
        <img loading="lazy" alt="hero" src="..." width="1600" height="886">
      </picture>
    </div>
  </div>
  <div>
    <div>
      <h2 id="example-block">Example Block</h2>
      <p>This is an example block</p>
      <ul>
        <li>one</li>
        <li>two</li>
      </ul>
    </div>
  </div>
  <div>
    <div>
      <p class="button-container"><a href="/content/adobe-summit-apk-generator" title="Brochure"
          class="button">Brochure</a></p>
    </div>
  </div>
  <div>
    <div>
      <p class="button-container"><a href="#" title="View Specifications" class="button">View Specifications</a> </p>
    </div>
  </div>
</div>
*/

/*
<div class="parent-block block" data-block-name="parent-block" data-block-status="loading">
  <div>//parent-block div
    <div>
      <h3>Hello From Parent</h3>
      <p>This is a parent block</p>
    </div>
  </div>
  <div>// repeating block-item
    <div>
      <picture>
        <img loading="lazy" alt="hero" src="..." width="1600" height="886"> // field imageAlt mergerd with image
      </picture>
    </div>
    <div>
      <p>This is a child block item</p>
      <ul>
        <li>one</li>
        <li>two</li>
      </ul>
    </div>
  </div>
  <div> // repeating block-item
    <div>
      <picture>
        <img loading="lazy" alt="hero" src="..." width="1600" height="886">//field imageAlt mergerd with image
      </picture>
    </div>
    <div>
      <p>This is a child block item</p>
      <ul>
        <li>one</li>
        <li>two</li>
      </ul>
    </div>
  </div>
</div>
*/

export default function decorate(block) {
console.log(block);
debugger;
}