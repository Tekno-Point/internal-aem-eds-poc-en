import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {

  // Array.from(block.children).forEach((row, rowIndex) => {
  //   row.classList.add("footer-content");
  //   row.classList.add(`sec-${rowIndex + 1}`);
  //   Array.from(row.children).forEach((column, colIndex) => {
  //     column.classList.add("footer-content-column");
  //     column.classList.add(`sebtxt-${colIndex + 1}`);
  //   });
  // });
  // const listBlocks = block.querySelectorAll(".footer-content-column ul");
  // listBlocks.forEach((ul, index) => {
  //   ul.classList.add('footer-content-ul');
  // });
  //  accoridanBlock(block)
  // // load footer as fragment
  // Array.from(document.querySelector(".columns").children).forEach((el,index)=>{
  //   el.classList.add("footer-bottom"+(index+1))
  //   Array.from(el.children).forEach((elSub,Jindex)=>{
  //     elSub.classList.add("footer-sub"+(index+1) +"-bottom"+(Jindex+1))
  //   })
  // })

  // const divWrapper = document.createElement("div");
  // divWrapper.classList.add("download")
  // const diviconwrapper = document.createElement("div");
  // diviconwrapper.classList.add("download-iconwrapper")
  // diviconwrapper.append(document.querySelector("#download-app").nextElementSibling)
  // diviconwrapper.append(document.querySelector("#download-app").nextElementSibling.nextElementSibling)
  // divWrapper.append(diviconwrapper)

  // const divtwoWrapper = document.createElement("div");
  // divtwoWrapper.classList.add("follow-us")
  // const divicontwowrapper = document.createElement("div");
  // divicontwowrapper.classList.add("follow-iconwrapper")
  // divicontwowrapper.append(document.querySelector("#follow-us-on").nextElementSibling)
  // divicontwowrapper.append(document.querySelector("#follow-us-on").nextElementSibling.nextElementSibling)
  // divicontwowrapper.append(document.querySelector("#follow-us-on").nextElementSibling.nextElementSibling.nextElementSibling)
  // divicontwowrapper.append(document.querySelector("#follow-us-on").nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling)
  // divicontwowrapper.append(document.querySelector("#follow-us-on").nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling)
  // divtwoWrapper.append(divicontwowrapper)

  // document.querySelector(".footer-sub1-bottom4").innerHTML = "";
  // document.querySelector(".footer-sub1-bottom4").innerHTML+=divWrapper;
  // document.querySelector(".footer-sub1-bottom4").innerHTML+=divtwoWrapper


  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);


  block.append(footer);
  
}
