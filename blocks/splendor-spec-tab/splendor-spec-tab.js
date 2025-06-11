// export default async function decorate(block) {
//     const blockchildCollection = block.children;
//     console.log(blockchildCollection);

//     const blockChild = Array.from(blockchildCollection);

//     blockChild.forEach((el, index) => {
//         el.classList.add("tab-content" + index);
//     });
// }



export default async function decorate(block) {
  const blockChildren = Array.from(block.children);

  blockChildren.forEach((el, index) => {
    // Add tab-content class with index
    el.classList.add("tab-content" + index);

    // Now get children of this tab-content element
    const tabContentChildren = Array.from(el.children);

    // Add tab-list-[number] class to each child
    tabContentChildren.forEach((child, i) => {
      child.classList.add("tab-list-" + (i + 1)); // 1-based index for tab-list
    });
  });
}
