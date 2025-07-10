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