export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
}

const targetP = document.querySelector('.section.demo-text .default-content-wrapper p:nth-child(6)');
const nextP = document.querySelector('.section.demo-text .default-content-wrapper p:nth-child(7)');

if (targetP) {
  // Create a new <div> wrapper
  const wrapperDiv = document.createElement('div');

  // Optionally, add a class to the wrapper
  wrapperDiv.classList.add('wrapped-paragraph');

  // Insert the wrapper before the <p> element
  targetP.parentNode.insertBefore(wrapperDiv, targetP);

  // Move the <p> inside the new wrapper
  wrapperDiv.appendChild(targetP);
  wrapperDiv.appendChild(nextP);
}
