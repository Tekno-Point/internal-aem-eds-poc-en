// add delayed functionality here
import('./plugin.js');

(function () {
    let accesibilityLoad = false;
    const accessibilityEvents = ['mousemove', 'scroll', 'touchstart'];
    function initializePlugin() {
      accesibilityLoad = true;
      accesibilityPlugin.init();
      accessibilityEvents.forEach(function (event) {
        window.removeEventListener(event, initializePlugin);
      });
    };
    setTimeout(() => {
      if (!accesibilityLoad) {
        accessibilityEvents.forEach(function (event) {
          window.addEventListener(event, initializePlugin);
        });
      }
    }, 1000);
  })();


  function postMessageSpartan(name, data) {
    try {
      if (sessionStorage.getItem('spartanEnabled')) {
        var spartanEvent = {
          name: name,
          data: data
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(spartanEvent));
      }
    } catch (error) {
      console.error("An error occurred in postMessageSpartan function:", error);
    }
  }
  
  const data = { url: "https://srilankan-airlines-mob--internal-aem-eds-poc-en--tekno-point.aem.live/srilankan-airlines-app/" };
  postMessageSpartan("share", data);