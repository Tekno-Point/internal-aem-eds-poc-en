// add delayed functionality here
const HEAD = document.getElementsByTagName('head')[0];
const BODY = document.getElementsByTagName('body')[0];

const CHAT_BOT_SCRIPT = document.createElement('script');

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
    HEAD.appendChild(script);
});

NO_SCRIPT_SRC_LIST.forEach(iframeSrc => {
    noscriptGenerator(iframeSrc);
});

BODY.appendChild(CHAT_BOT_SCRIPT);


const VWO_SCRIPT = document.createElement('script');
VWO_SCRIPT.type = 'text/javascript';

VWO_SCRIPT.textContent = `
  window._vwo_code || (function() {
    var account_id = 808232,
        version = 2.0,
        settings_tolerance = 2000,
        hide_element = 'body',
        hide_element_style = 'opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important',
        f = false,
        w = window,
        d = document,
        v = d.querySelector('#vwoCode'),
        cK = '_vwo_' + account_id + '_settings',
        cc = {};

    try {
      var c = JSON.parse(localStorage.getItem('_vwo_' + account_id + '_config'));
      cc = c && typeof c === 'object' ? c : {};
    } catch (e) {}

    var stT = cc.stT === 'session' ? w.sessionStorage : w.localStorage;

    var code = {
      use_existing_jquery: function() {
        return typeof use_existing_jquery !== 'undefined' ? use_existing_jquery : undefined;
      },
      library_tolerance: function() {
        return typeof library_tolerance !== 'undefined' ? library_tolerance : undefined;
      },
      settings_tolerance: function() {
        return cc.sT || settings_tolerance;
      },
      hide_element_style: function() {
        return '{' + (cc.hES || hide_element_style) + '}';
      },
      hide_element: function() {
        return typeof cc.hE === 'string' ? cc.hE : hide_element;
      },
      getVersion: function() {
        return version;
      },
      finish: function() {
        if (!f) {
          f = true;
          var e = d.getElementById('_vis_opt_path_hides');
          if (e) e.parentNode.removeChild(e);
        }
      },
      finished: function() {
        return f;
      },
      load: function(e) {
        var t = this.getSettings(),
            n = d.createElement('script'),
            i = this;

        if (t) {
          n.textContent = t;
          d.getElementsByTagName('head')[0].appendChild(n);
          if (!w.VWO || VWO.caE) {
            stT.removeItem(cK);
            i.load(e);
          }
        } else {
          n.fetchPriority = 'high';
          n.src = e;
          n.type = 'text/javascript';
          n.onerror = function() {
            _vwo_code.finish();
          };
          d.getElementsByTagName('head')[0].appendChild(n);
        }
      },
      getSettings: function() {
        try {
          var e = stT.getItem(cK);
          if (!e) return;
          e = JSON.parse(e);
          if (Date.now() > e.e) {
            stT.removeItem(cK);
            return;
          }
          return e.s;
        } catch (e) {
          return;
        }
      },
      init: function() {
        if (d.URL.indexOf('__vwo_disable__') > -1) return;
        var e = this.settings_tolerance();
        w._vwo_settings_timer = setTimeout(function() {
          _vwo_code.finish();
          stT.removeItem(cK);
        }, e);

        var t = d.currentScript,
            n = d.createElement('style'),
            i = this.hide_element(),
            r = t && !t.async && i ? i + this.hide_element_style() : '',
            c = d.getElementsByTagName('head')[0];

        n.setAttribute('id', '_vis_opt_path_hides');
        if (v) n.setAttribute('nonce', v.nonce);
        n.setAttribute('type', 'text/css');

        if (n.styleSheet) {
          n.styleSheet.cssText = r;
        } else {
          n.appendChild(d.createTextNode(r));
        }

        c.appendChild(n);

        this.load('https://dev.visualwebsiteoptimizer.com/j.php?a=' + account_id + '&u=' + encodeURIComponent(d.URL) + '&vn=' + version);
      }
    };

    w._vwo_code = code;
    code.init();
  })();
`;

HEAD.appendChild(VWO_SCRIPT);
