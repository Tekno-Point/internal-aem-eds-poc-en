import('./plugin.js');
// add delayed functionality here

let adobeScript = document.createElement("script");
adobeScript.type = 'text/javascript';
adobeScript.async = true;
adobeScript.src = "https://assets.adobedtm.com/56086c44eca3/d7ef90251c90/launch-1aedac27ad88-development.min.js";
document.body.appendChild(adobeScript);

(function () {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
        (function (c, l, a, r, i, t, y) {
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
            t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
            y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
        })(window, document, 'clarity', 'script', 'qtovk12ick');
    `;
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(script);
})();