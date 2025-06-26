export default async function decorate(block) {
  const fincorp = Array.from(block.children);

  fincorp.forEach((child, index) => {

    child.classList.add(`fincorp-${index}`);
  });
}
