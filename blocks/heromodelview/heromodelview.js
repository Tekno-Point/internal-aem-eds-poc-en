export default function decorate(block) {

   let props = Array.from(block.children).map((div) => div)
   console.log(props)

   block.innerHTML = '';
   
}