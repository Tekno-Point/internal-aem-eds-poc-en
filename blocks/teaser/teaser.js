// export default function decorate(block) {
//     let childrens = block.children;

//     Array.from(childrens).forEach(elem => {
//         let firstElem = elem.children[0];
//         firstElem.classList.add("teaser-image");
//         let SecondElem = elem.children[1];
//         SecondElem.classList.add("teaser-content");

//         let anchor = elem.querySelector('a');
//         let anchorLink = anchor.href;
        
//         let newAnchor = document.createElement('a');
//         newAnchor.href = anchorLink;

//         newAnchor.append(elem);
//         block.append(newAnchor)
//     });
// }