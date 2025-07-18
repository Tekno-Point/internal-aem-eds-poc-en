// add delayed functionality here
const HEAD = document.getElementsByTagName('head')[0];
const BODY = document.getElementsByTagName('body')[0];

const CHAT_BOT_SCRIPT = document.createElement('script');
const GOOGLE_TAG_MANAGER_SCRIPT = document.createElement('script');

const GTM_IDS = ['GTM-MKB6KPH', 'GTM-THSR5W4', 'GTM-KGPSMP'];

const NO_SCRIPT_SRC_LIST = [
    "https://www.googletagmanager.com/ns.html?id=GTM-MKB6KPH",
    "https://www.googletagmanager.com/ns.html?id=GTM-THSR5W4",
    "https://www.googletagmanager.com/ns.html?id=GTM-KGPSMP"
]

const noscriptGenerator = (iframeSrc) => {
    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = iframeSrc;
    iframe.height = "0";
    iframe.width = "0";
    iframe.style.display = "none";
    iframe.style.visibility = "hidden";

    noscript.appendChild(iframe);
    document.body.appendChild(noscript);
    console.log(noscript);
}

CHAT_BOT_SCRIPT.innerHTML = `
      window.ymConfig = {"bot":"x1725620362017","host":"https://cloud.yellow.ai"};
    (function() {
        var w = window,
            ic = w.YellowMessenger;
        if ("function" === typeof ic) ic("reattach_activator"), ic("update", ymConfig);
        else {
            var d = document,
                i = function() {
                    i.c(arguments)
                };
            function l() {
                var e = d.createElement("script");
                e.type = "text/javascript", e.async = !0, e.src = "https://cdn.yellowmessenger.com/plugin/widget-v2/latest/dist/main.min.js";
                var t = d.getElementsByTagName("script")[0];
                t.parentNode.insertBefore(e, t)
                    e.onload = function () {
                        applyCustomStyles();
                    };
            }
            i.q = [], i.c = function(e) {
                i.q.push(e)
            }, w.YellowMessenger = i, w.attachEvent ? w.attachEvent("onload", l) : w.addEventListener("load", l, !1)}
    })();
   
   
    function applyCustomStyles() {
        var frameDocument = window.frames && window.frames.ymIframe && window.frames.ymIframe.document;
        if (!frameDocument) return;
        const newStyleElement = frameDocument.createElement('style');
        newStyleElement.innerHTML = "#chatOptions .option.vertical-qr { min-width: 100%; } #chatOptions .option.vertical-qr.vertical-qr-center { left: 0; margin-left: 0; }";
        frameDocument.head.appendChild(newStyleElement);
    }

`;

GTM_IDS.forEach(id => {
    const script = document.createElement('script');
    script.innerHTML = `
        (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${id}');
    `;
    document.head.appendChild(script);
});

NO_SCRIPT_SRC_LIST.forEach(iframeSrc => {
    noscriptGenerator(iframeSrc);
});

HEAD.appendChild(CHAT_BOT_SCRIPT);
HEAD.appendChild(GOOGLE_TAG_MANAGER_SCRIPT);
