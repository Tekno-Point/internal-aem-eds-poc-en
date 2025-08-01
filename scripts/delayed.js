// add delayed functionality here
const HEAD = document.head;

const fontAwesomeLink = document.createElement('link');
fontAwesomeLink.rel = 'stylesheet';
fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css';
HEAD.appendChild(fontAwesomeLink);

const fontLink = document.createElement('link');
fontLink.rel = 'preconnect';
fontLink.href = 'https://fonts.googleapis.com';
HEAD.appendChild(fontLink);


const fontLink2 = document.createElement('link');
fontLink2.rel = 'preconnect';
fontLink2.href = 'https://fonts.gstatic.com';
HEAD.appendChild(fontLink2);


const fontLink3 = document.createElement('link');
fontLink3.rel = 'stylesheet';
fontLink3.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap';4
HEAD.appendChild(fontLink3);
