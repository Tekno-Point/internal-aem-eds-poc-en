export default async function decorate(block) {
  const hero = Array.from(block.children);

  hero.forEach((child, index) => {

    child.classList.add(`hero-${index}`);
  });
}
