
/* this function also gets called by accordion-group */
export function generateAccordionDOM(acc) {
  const details = document.createElement('details');
  const summary = document.createElement('summary');
  details.append(summary);
  const props = [...acc.children];
  const [classes, heading1, summary1] = props;

  summary.append(heading1.textContent.trim());

  const elementText = summary1.innerHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  const elementDiv = document.createElement('div');

  elementDiv.innerHTML = elementText;

  details.append(elementDiv);

 [...classes.children].forEach((cls)=>{
  // details.closest("block").classList.add(cls.textContent.trim())
 })

  return details;

  // Array.from(acc.children).forEach(async (element, i) => {
  //   if (i === 0) {
  //     // const heading = element.querySelector("h2,h3,h4,h5,h6");
  //     const heading = element;
  //     summary.append(heading || element.textContent.trim());
  //   } else {
  //     const elementText = element.innerHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  //     const elementDiv = document.createElement('div');

  //     elementDiv.innerHTML = elementText;

  //     details.append(elementDiv);
  //   }
  // });

  // return details;
}

// export default function decorate(block) {
//   const dom = generateAccordionDOM(block);
//   block.textContent = '';
//   block.append(dom);
// }


