export default function decorate(block) {
    const linkContainer = block.children[0];
    const title = block.children[1];
    const images = block.children[2];
  
    const anchor = linkContainer.querySelector('a');
    if (!anchor) return;
  
    anchor.classList.add('warranty-card-link');
    anchor.innerText = ""

    title.classList.add('warranty-card-title');
    images.classList.add('warranty-card-images');

    anchor.appendChild(title);
    anchor.appendChild(images);
  
    const wrapper = document.createElement('div');
    wrapper.className = 'warranty-card';
    wrapper.appendChild(anchor);

    block.innerHTML = '';
    block.appendChild(wrapper);
  }
  