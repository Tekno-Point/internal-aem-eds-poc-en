export default function decorate(block) {
  // Select all inner divs directly inside the block
  const innerDivs = Array.from(block.children);

  innerDivs.forEach((item) => {
    item.classList.add('prodCard');

    const [imgDiv, textDiv] = item.children;

    if (imgDiv) imgDiv.classList.add('prodImgDiv');
    if (textDiv) textDiv.classList.add('prodTextDiv');
  });
}
