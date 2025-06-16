export default async function decorate(block) {
  const blockChildren = Array.from(block.children);

  blockChildren.forEach((child, index) => {
    const className = `block-child-${index + 1}`;
    child.classList.add(className);

    // If this is the first block child, add class to its children
    if (index === 0) {
      const innerChildren = Array.from(child.children);
      innerChildren.forEach((innerChild,index) => {
        innerChild.classList.add('block-child1-child'+ index);
      });
    }
  });
}
