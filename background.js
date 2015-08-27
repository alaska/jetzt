chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('Speed-reading in ' + tab.url);
  chrome.tabs.executeScript(null,{
    code: 'window.jetzt.select()'
  });
});

chrome.contextMenus.create({
	"id": "jetztMenu"
	,"title": "Speed-read this with Jetzt"
	,"contexts": [
		"selection"
	]
});

chrome.contextMenus.onClicked.addListener(function(data) {
  if (data.menuItemId == 'jetztMenu') {
    // window.getSelection() doesn't work with PDFs
    // data.selectionText is the workaround
    chrome.tabs.executeScript(null,{
        code: data.selectionText ? 'window.jetzt.select(' + JSON.stringify(data) + ')' : 'window.jetzt.select()'
    });
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.req) {
        case "language":
            chrome.tabs.detectLanguage(sender.tab.id, function(language){
                sendResponse({language: language});
            });
            break;
    }
    return true;
});
