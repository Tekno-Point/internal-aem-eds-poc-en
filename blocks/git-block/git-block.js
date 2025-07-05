export default function decorate(block) {
  const wrapperDivs = Array.from(block.children);

  wrapperDivs.forEach((outerDiv) => {
    outerDiv.classList.add('git-lists');

    const innerDiv = outerDiv.querySelector('div');
    if (innerDiv) innerDiv.classList.add('git-list-item');
  });
}
