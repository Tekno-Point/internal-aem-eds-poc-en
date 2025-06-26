export default function decorate(block){
    console.log(block);
    Array.from(block.children).forEach((el)=>{
        el.classList.add("custcarousel");
        Array.from(el.children).forEach((elsub,ind)=>{
            elsub.classList.add("custCaro"+(ind+1))
        })
    })
    block.querySelectorAll(".custCaro2").forEach((elem)=>{
        Array.from(elem.children).forEach((subel,index)=>{
            if (index == 0) {
                subel.classList.add("title")
            }
            if (index == 1) {
                subel.classList.add("design")
            }
        })
    })

}