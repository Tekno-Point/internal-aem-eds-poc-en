export default function modifyForm(block) {
  const formBlock = block
  .closest(".aia-banner-container")
  .querySelector(".form form");
  formBlock.querySelectorAll('.medium-width.field-wrapper fieldset').forEach(ele => {
      const radioBtnWrapper = document.createElement('div');
      radioBtnWrapper.classList.add('radioBtnWrapper');
      ele.querySelectorAll('.radio-wrapper').forEach((ele,i)=>{
        radioBtnWrapper.appendChild(ele);
        if (i == 0) {
          ele.querySelector('input').setAttribute("checked", true);
        }
      })
      ele.append(radioBtnWrapper);
    });
    
}
