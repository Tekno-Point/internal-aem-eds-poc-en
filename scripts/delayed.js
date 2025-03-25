import('./plugin.js');
// add delayed functionality here

let adobeScript = document.createElement("script");
adobeScript.type = 'text/javascript';
adobeScript.async = true;
adobeScript.src = "https://assets.adobedtm.com/56086c44eca3/d7ef90251c90/launch-1aedac27ad88-development.min.js";
document.body.appendChild(adobeScript);

