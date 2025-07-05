export default function modifyForm(block) {
  const formBlock = block
  .closest(".aia-banner-container")
  .querySelector(".form form");
  formBlock.querySelectorAll('.medium-width.field-wrapper fieldset').forEach(ele => {
      const radioBtnWrapper = document.createElement('div');
      radioBtnWrapper.classList.add('radioBtnWrapper');
      console.log(ele);
      ele.querySelectorAll('.radio-wrapper').forEach((ele)=>{
        radioBtnWrapper.appendChild(ele)
      })
      ele.append(radioBtnWrapper);
    });
}
