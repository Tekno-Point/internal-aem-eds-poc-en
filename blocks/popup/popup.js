let popup;
export function showMsg(status, message) {
  popup.style.display = 'flex';
  popup.querySelector('h2').textContent = message;
  // if (status) {
  // } else {
  //     popup.style.display = 'none';
  //     popup.querySelector('h2').textContent = message;
  // }
}
export default function decorate(block) {
  block.innerHTML = `
    <div>
        <div id="popup" class="popupnew">
            <div class="popup-content">
                <span class="close-btn" id="closePopup">&times;</span>
                <h2>Thank You!</h2>
                <p>We appreciate your support.</p>
            </div>
        </div>
    </div>`;

  popup = block.querySelector('.popupnew');
  // const closePopupButton = block.querySelector('#closePopup');

  // Show the popup
  // document.addEventListener('click', () => {
  //     popup.style.display = 'flex';
  // });

  // Close the popup
  // closePopupButton.addEventListener('click', () => {
  //     popup.style.display = 'none';
  // });

  // Close the popup if the user clicks outside the popup content
  block.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.style.display = 'none';
    }
  });
}
