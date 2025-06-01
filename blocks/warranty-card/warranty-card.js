export default function decorate(block) {
    const wrapper = document.createElement('div');
    wrapper.className = 'warranty-card-wrapper';

    const anchor = block.querySelector('a');
    anchor.innerHTML = "";

    const textPara = document.querySelector('.warranty-card > div:nth-child(2) p');
    
    block.innerHTML = "";
    anchor.append(textPara);
    wrapper.append(anchor);
    block.append(wrapper)
}