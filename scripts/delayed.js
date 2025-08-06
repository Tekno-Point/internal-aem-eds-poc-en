// add delayed functionality here
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

const data = { url: 'https://poonawalafindev--internal-aem-eds-poc-en--tekno-point.aem.live/poonawallafincorp/' };
postMessageSpartan("share", data);