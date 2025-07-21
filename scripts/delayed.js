import('./tpaw-plugin.js');
// add delayed functionality here
createMockDOMForTracking();
const HEAD = document.head;
const BODY = document.body;

const GTM_IDS = ['GTM-MKB6KPH', 'GTM-THSR5W4', 'GTM-KGPSMP'];
GTM_IDS.forEach(id => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
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


const CHAT_BOT_SCRIPT = document.createElement('script');
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
            }, l()}
    })();
   
   
    function applyCustomStyles() {
        var frameDocument = window.frames && window.frames.ymIframe && window.frames.ymIframe.document;
        if (!frameDocument) return;
        const newStyleElement = frameDocument.createElement('style');
        newStyleElement.innerHTML = "#chatOptions .option.vertical-qr { min-width: 100%; } #chatOptions .option.vertical-qr.vertical-qr-center { left: 0; margin-left: 0; }";
        frameDocument.head.appendChild(newStyleElement);
    }
`;
BODY.appendChild(CHAT_BOT_SCRIPT);

const NO_SCRIPT_SRC_LIST = [
  "https://www.googletagmanager.com/ns.html?id=GTM-MKB6KPH",
  "https://www.googletagmanager.com/ns.html?id=GTM-THSR5W4",
  "https://www.googletagmanager.com/ns.html?id=GTM-KGPSMP"
]
const noscriptAdder = (iframeSrc) => {
  const noscript = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src = iframeSrc;
  iframe.height = "0";
  iframe.width = "0";
  iframe.style.display = "none";
  iframe.style.visibility = "hidden";
  noscript.appendChild(iframe);
  BODY.appendChild(noscript);
  console.log(noscript);
}
NO_SCRIPT_SRC_LIST.forEach(iframeSrc => {
  noscriptAdder(iframeSrc);
});

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
BODY.appendChild(VWO_SCRIPT);

const FONTS = document.createElement('script');
FONTS.type = 'text/javascript';
FONTS.innerHTML = `
WebFontConfig = {
    google: { families: [ 'Muli:200,300,400,600,700,800,900&display=swap' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = true;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
`;
HEAD.appendChild(FONTS);

const onChatBotClick = () => {
  let chatBotOGClick = document.getElementById("ymDivBar")
  const els = [...document.querySelectorAll(`.ria-live-chat .default-content-wrapper,
#nav > .nav-tools > div, header .nav-top-menu .default-content-wrapper>ul:first-child li:nth-child(3) a`)].filter(e => e);
  els.forEach(el => {
    el.addEventListener("click", function(e) {
      e.preventDefault();
      if (!chatBotOGClick) {
        chatBotOGClick = document.getElementById("ymDivBar")
      }
      chatBotOGClick.click();
    });
  });
}
onChatBotClick();

function createMockDOMForTracking() {
  // Prevent duplicate insertion
  if (document.getElementById("dummy-container")) return;
  const dummyContainer = document.createElement("div");
  dummyContainer.id = "dummy-container";
  document.body.appendChild(dummyContainer);
  // Helper: create element with optional class and text
  const el = (tag, cls = "", text = "") => {
    const elem = document.createElement(tag);
    if (cls) elem.className = cls;
    if (text) elem.textContent = text;
    return elem;
  };
  // .bottom-menu-wrap.bg-megamenu .menu-list .sub-menu-list li
  const bottomLi = el("li", "");
  const subMenuList = el("ul", "sub-menu-list");
  subMenuList.appendChild(bottomLi);
  const menuList = el("ul", "menu-list");
  menuList.appendChild(subMenuList);
  const bottomMenuWrap = el("div", "bottom-menu-wrap bg-megamenu");
  bottomMenuWrap.appendChild(menuList);
  dummyContainer.appendChild(bottomMenuWrap);
  // .right-top-menu.js-rightmenu-dth .submenu-wrap-top li
  const topLi = el("li");
  const submenuWrapTop = el("ul", "submenu-wrap-top");
  submenuWrapTop.appendChild(topLi);
  const topMenu = el("ul", "right-top-menu js-rightmenu-dth");
  topMenu.appendChild(submenuWrapTop);
  dummyContainer.appendChild(topMenu);
  // [class="col-xs-12 col-sm-12 col-md-3 col-lg-3"] li
  const footerLi = el("li");
  const footerList = el("ul");
  footerList.appendChild(footerLi);
  const footerTitle = el("h4", "", "Footer Title");
  const footerWrap = el("div", "col-xs-12 col-sm-12 col-md-3 col-lg-3");
  footerWrap.appendChild(footerTitle);
  footerWrap.appendChild(footerList);
  dummyContainer.appendChild(footerWrap);
  // .call-main-wrap .il-error and .call-main-wrap input
  const callWrap = el("div", "call-main-wrap");
  callWrap.appendChild(el("div", "il-error")); // empty error div
  callWrap.appendChild(document.createElement("input"));
  callWrap.appendChild(document.createElement("input"));
  // #callback-select with options
  const select = document.createElement("select");
  select.id = "callback-select";
  ["One", "Two"].forEach(val => {
    const opt = document.createElement("option");
    opt.value = val;
    opt.textContent = val;
    select.appendChild(opt);
  });
  callWrap.appendChild(select);
  // .btn-m.js-callback-valid
  callWrap.appendChild(el("button", "btn-m js-callback-valid", "Submit"));
  dummyContainer.appendChild(callWrap);
  // .tabSectionBox li
  const tabBox = el("ul", "tabSectionBox");
  tabBox.appendChild(el("li", "", "Tab Item"));
  dummyContainer.appendChild(tabBox);
  // .products-tabs li with child
  const prodTabs = el("ul", "products-tabs");
  const mobLi = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = "Mobile Tab";
  mobLi.appendChild(span);
  prodTabs.appendChild(mobLi);
  dummyContainer.appendChild(prodTabs);
}

