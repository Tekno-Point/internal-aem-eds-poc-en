import { fetchPlaceholders } from "./aem.js";

const placeholder =  await fetchPlaceholders()
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = placeholder.genericScript;
script.async = true;
document.body.appendChild(script);