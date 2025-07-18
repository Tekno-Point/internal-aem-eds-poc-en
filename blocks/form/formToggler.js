const forms = [];

const tabsForm = document.querySelector('.trip-form-modal .tabs-wrapper');
const travelDetailsForm = getParentFromChildId('travel-details');
const extendPolicyForm = getParentFromChildId('extend-policy');

forms.push(tabsForm);

function formToggler(formId) {
  const isSingleMultiTrip = formId === 'single-trip' || formId === 'single-trip';

  if (isSingleMultiTrip) {
    if (isSingleMultiTrip == 'single-trip') {
      //toogle single-trip
    } else {
      //toogle multi-trip 
    }
  }

}

function getParentFromChildId(childId) {
  // Get the child element by its ID
  const childElement = document.getElementById(childId);

  // Check if the child element exists
  if (childElement) {
    // Get the parent element
    const parentElement = childElement.parentElement; // or childElement.parentNode
    return parentElement;
  } else {
    console.error('Element with ID ' + childId + ' not found.');
    return null;
  }
}
