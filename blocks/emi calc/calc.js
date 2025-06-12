document.addEventListener('DOMContentLoaded', () => {
  // Select inputs by their container and class
  const amountInput = document.querySelector('.xpulse-emi-range-container input[type="text"]'); // Amount Needed input
  const interestInput = document.querySelectorAll('.xpulse-emi-range-container input[type="text"]')[1]; // Interest rate input with % sign
  const interestRange = document.querySelector('.xpulse-emi-range-container input[type="range"][aria-label="Intrest Range"]');
  const durationInput = document.querySelector('.xpulse-emi-range-container input[type="number"]'); // Duration input
  const durationRange = document.querySelector('.xpulse-emi-range-container input[type="range"][aria-label="duration-range"]');

  // EMI output elements (there are two places you show EMI, let's update both)
  const emiOutputMain = document.querySelector('.emi-payment-section h1'); // Big EMI display (₹ 870)
  const emiOutputDetails = document.querySelector('.emi-amount-text'); // Smaller EMI display (₹ 870)

  // Helper: Clean input text by removing commas and percentage signs
  function cleanNumber(str) {
    return parseFloat(str.replace(/[,%\s₹]/g, '')) || 0;
  }

  function calculateEMI(principal, annualInterestRate, durationMonths) {
    const monthlyInterestRate = (annualInterestRate / 12) / 100;
    const n = durationMonths;

    if (monthlyInterestRate === 0) return principal / n;

    const emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, n)) /
      (Math.pow(1 + monthlyInterestRate, n) - 1);

    return emi;
  }

  function updateEMI() {
    const principal = cleanNumber(amountInput.value);
    const interestRate = cleanNumber(interestInput.value);
    const duration = parseInt(durationInput.value, 10);

    if (principal > 0 && interestRate > 0 && duration > 0) {
      const emi = calculateEMI(principal, interestRate, duration);
      const emiFormatted = `₹ ${emi.toFixed(0)}`;

      emiOutputMain.textContent = emiFormatted;
      emiOutputDetails.textContent = emiFormatted;
    }
  }

  // Sync range sliders and text inputs for interest rate and duration
  function syncInterestInputs() {
    interestInput.value = interestRange.value + '%';
  }
  function syncDurationInputs() {
    durationInput.value = durationRange.value;
  }

  // Event Listeners

  // Amount input and range sync (only one input for amount)
  amountInput.addEventListener('input', () => {
    // remove commas if user types them, keep only digits
    amountInput.value = amountInput.value.replace(/[^\d]/g, '');
    updateEMI();
  });

  // Interest rate range updates text input
  interestRange.addEventListener('input', () => {
    syncInterestInputs();
    updateEMI();
  });

  // Interest rate text input updates range (remove % and validate)
  interestInput.addEventListener('input', () => {
    const cleaned = interestInput.value.replace(/[^\d.]/g, '');
    interestInput.value = cleaned ? cleaned + '%' : '';
    interestRange.value = cleaned || interestRange.min;
    updateEMI();
  });

  // Duration range updates number input
  durationRange.addEventListener('input', () => {
    syncDurationInputs();
    updateEMI();
  });

  // Duration number input updates range input
  durationInput.addEventListener('input', () => {
    let val = parseInt(durationInput.value, 10);
    if (isNaN(val) || val < parseInt(durationInput.min)) val = durationInput.min;
    if (val > parseInt(durationInput.max)) val = durationInput.max;
    durationInput.value = val;
    durationRange.value = val;
    updateEMI();
  });

  // Initial sync and calculation
  syncInterestInputs();
  syncDurationInputs();
  updateEMI();
});
