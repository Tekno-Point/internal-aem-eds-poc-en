export default function decorate(block) {
    const image = block.querySelector('img');
    block.style.backgroundImage = `url(${image.src})`;
    image.remove();
  }