var price = '...';
chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 255] });
chrome.browserAction.setBadgeText({'text':price});
websocket = new WebSocket("wss://stream.binance.com:9443/ws/nanobtc@ticker");

websocket.onopen = function(evt) { console.log(evt) };
websocket.onmessage = function(message) { 
    price = JSON.parse(message.data)['c'];
    percent = parseFloat(JSON.parse(message.data)['P']).toFixed(1);
    document.getElementById("sat").innerHTML = "PRICE: " + price + " SATs"
    document.getElementById("volume").innerHTML = "VOLUME: " + JSON.parse(message.data)['v'] 
    if(percent>0) {
    	chrome.browserAction.setBadgeBackgroundColor({ color: [124,252,0, 255] });
    } else {
    	chrome.browserAction.setBadgeBackgroundColor({ color: [220,20,60, 255] });
    }
    percentStr = (String(Math.abs(percent).toFixed(1)) + "%").slice(1);
    chrome.browserAction.setBadgeText({ 'text': percentStr });
};
