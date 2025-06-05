export function inputContainer(form) {
    const inputs = form.querySelectorAll('.tel-wrapper input');
    const resetOtp = form.querySelector('.button-wrapper #form-10');
    let timerInterval;

    resetOtp.addEventListener('click', ()=> {
        startOtpTimer();
    })

    function startOtpTimer() {
        const timerElement = form.querySelector("#form-11");
        let timeRemaining = 60;

        if (timerInterval) {
            clearInterval(timerInterval);
        }

        timerInterval = setInterval(() => {
            timeRemaining--;
            let minutes = Math.floor(timeRemaining / 60);
            let seconds = timeRemaining % 60;

            timerElement.textContent = `${String(minutes).padStart(2, "0")}:${String(
                seconds
            ).padStart(2, "0")}`;

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                timerElement.textContent = "00:00";

                resetOtp.classList.add("enable-pointer");
            }
        }, 1000);
    }

    function handleOtpLoginForm(input, index) {
        if (input.value && index < inputs.length - 1) {
            inputs[index + 1].focus();
          }
    }

    function handleOtpKeydown(e, input, index) {
        if (e.key === "Backspace") {
          e.preventDefault();
          if (input.value !== "") {
            input.value = "";
          } else if (index > 0) {
            inputs[index - 1].focus();
            inputs[index - 1].value = "";
          }
        }
    }

    inputs.forEach((input, index) => {
        console.log(input)
        input.setAttribute('maxlength', '1');
        input.addEventListener('keydown', (e) => handleOtpKeydown(e, input, index));
        input.addEventListener("input",()=> handleOtpLoginForm(input, index));
    })
}