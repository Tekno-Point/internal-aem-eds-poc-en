export default function decorate(block){
    Array.from(block.children).forEach((el,ind)=>{
        el.classList.add("subBlog"+(ind+1))
        Array.from(el.children).forEach((elem,index)=>{
            elem.classList.add("subBlog"+(ind+1)+"-bloginner"+(index+1))
        })
    })
}