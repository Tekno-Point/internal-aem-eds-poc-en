import { generateAccordionDOM } from '../accordion/accordion.js';

const faqQA = [];
export default async function decorate(block) {
  // each row is an accordion entry
  const accordions = [...block.children];
  // const props = [...block.children].map((row) => row.firstElementChild);
  // console.log(block.classList);
  // const teaserDOM = generateTeaserDOM(props, block.classList);
  // loop through all accordion blocks
  [...accordions].forEach((accordion) => {
    // generate the accordion
    const accordionDOM = generateAccordionDOM(accordion);
    const props = [...accordion.children];
    const [classes, heading1, summary1] = props;
    // empty the content ,keep root element with UE instrumentation
    accordion.textContent = '';
    // add block classes
    console.log(accordion.classList);
   
    classes.textContent.trim().split(",").forEach((cls)=>{
      accordion.classList.add(cls.trim())
     })
    accordion.classList.add('block');
    accordion.append(accordionDOM);

  });

  block.classList.add('shade-box');
  try {
    openFunctionFAQ(block);
  } catch (error) {
    console.error(error);
  }
}

function openFunctionFAQ(block) {
  const titles = block.querySelectorAll('details summary');

  titles.forEach((title) => {
    title.addEventListener('click', function (e) {
      if (this.classList.contains('active')) {
        setTimeout(() => {
          this.closest('details').removeAttribute('open');
        });
        this.classList.remove('active');
      } else {
        titles.forEach((title) => {
          title.closest('details').removeAttribute('open');
          title.classList.remove('active');
        });
        this.classList.toggle('active');
      }
    });
  });
}
