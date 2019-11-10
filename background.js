chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    const headers = JSON.parse(localStorage.getItem('headers')) || [];

    headers.forEach(({ headerKey, headerValue }) => {
      details.requestHeaders.push({name: headerKey, value: headerValue});
    });

    return { requestHeaders: details.requestHeaders };
  },
  // filters
  {urls: ['https://*/*', 'http://*/*']},
  // extraInfoSpec
  ['blocking', 'requestHeaders', 'extraHeaders']
);
