export default function decorate(block) {
    const title = block.children[0];
    title.classList.add('warranty-card-title');

    const images = block.children[1];
    images.classList.add('warranty-card-images');
  
    const wrapper = document.createElement('div');
    wrapper.className = 'warranty-card';
  
    const link = document.createElement('a');
    link.href = '#';
    link.className = 'warranty-card-link'; 
  
    if (title) link.appendChild(title);
    if (images) link.appendChild(images);
  
    wrapper.appendChild(link);
  
    block.innerHTML = '';
    block.appendChild(wrapper);
  }