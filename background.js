// chrome.runtime.onInstalled.addListener(function() {
//   chrome.storage.sync.set({'value': []}, () => {});
//
//
//
// });

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    details.requestHeaders.push({name: 'test', value: '123'});
    return { requestHeaders: details.requestHeaders };
  },
  // filters
  {urls: ['https://*/*', 'http://*/*']},
  // extraInfoSpec
  ['blocking', 'requestHeaders', 'extraHeaders']);
