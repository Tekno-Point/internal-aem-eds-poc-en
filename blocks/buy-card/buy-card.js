export default async function decorate(block) {
  const blockChildren = Array.from(block.children);

  blockChildren.forEach((child, index) => {
    const className = `block-child`+index;
    child.classList.add(className);

      const innerChildren = Array.from(child.children);
      innerChildren.forEach((innerChild,index) => {
        innerChild.classList.add('block-child1-child'+ index);
      });
  });
}
