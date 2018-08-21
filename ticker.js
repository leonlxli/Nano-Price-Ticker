var price = '...';
chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 255] });
chrome.browserAction.setBadgeText({'text':price});
websocket = new WebSocket("wss://stream.binance.com:9443/ws/nanobtc@ticker");

websocket.onopen = function(evt) { console.log(evt) };
websocket.onmessage = function(message) { 
    price = JSON.parse(message.data)['o'];
    percent = parseFloat(JSON.parse(message.data)['P']).toFixed(1);
    document.getElementById("sat").innerHTML = price + " SATs"
    if(percent>0) {
    	chrome.browserAction.setBadgeBackgroundColor({ color: [124,252,0, 255] });
    } else {
    	chrome.browserAction.setBadgeBackgroundColor({ color: [220,20,60, 255] });
    }
    percentStr = String(Math.abs(percent).toFixed(1)) + "%";
    if(Math.abs(percent) < 1 && percent < 0){
    	percentStr = percentStr.slice(0,1) + percentStr.slice(2)
    }
    console.log(percentStr)
    chrome.browserAction.setBadgeText({ 'text': percentStr });
};
