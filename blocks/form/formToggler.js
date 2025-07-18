let forms = [];

function formToggler(formId) {
  // Ensure the forms are initialized before we try to switch between them
  if (forms.length === 0) {
    initializeForms();  // Initialize forms if not already initialized
  }

  const isSingleMultiTrip = formId === 'single-trip' || formId === 'multi-trip';

  if (isSingleMultiTrip) {
    switchForm(forms[0]); // Assuming tabsForm is the first item in the array
    if (formId === 'single-trip') {
      // Toggle single-trip specific logic
      console.log('Single Trip Form');
    } else {
      // Toggle multi-trip specific logic
      console.log('Multi Trip Form');
    }
    return;
  }

  // Handle other forms
  if (formId === 'travel-details') {
    switchForm(forms[1]); // travelDetailsForm is the second item
  } else if (formId === 'extend-policy') {
    switchForm(forms[2]); // extendPolicyForm is the third item
  } else {
    // Default form
    switchForm(forms[0]); // Default to tabsForm
  }
}

// Function to display one form and hide others
function switchForm(displayForm) {
  forms.forEach(form => {
    if (form === displayForm) {
      form.style.display = 'block'; // Show the selected form
    } else {
      form.style.display = 'none'; // Hide the others
    }
  });
}

/**
 * Get the parent element of a child element based on provided child ID and parent class/id.
 * 
 * @param {string} childId - The ID of the child element.
 * @param {string} parentSelector - The class or ID of the parent element.
 * @returns {Element|null} The parent element if found, otherwise null.
 */
export function getParentFromChildId(childId, parentSelector) {
  // Get the child element by its ID
  const childElement = document.getElementById(childId);

  // Check if the child element exists
  if (childElement) {
    // Get the parent element based on the parentSelector
    let parentElement = childElement.closest(parentSelector);

    // Return the parent element (if found), or null if not found
    return parentElement;
  } else {
    console.error('Element with ID ' + childId + ' not found.');
    return null;
  }
}


// Function to initialize all forms and populate the global forms array
function initializeForms() {
  const tabsForm = document.querySelector('.trip-form-modal .tabs-wrapper');
  const travelDetailsForm = getParentFromChildId('travel-details', '.form-wrapper');
  const extendPolicyForm = getParentFromChildId('extend-policy', '.form-wrapper');

  // Populate the global forms array
  forms = [tabsForm, travelDetailsForm, extendPolicyForm];

  console.log("Forms Initialized: ", forms);
}


// Export the function if using modules
export default formToggler;
