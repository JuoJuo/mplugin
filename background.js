chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    const headers = JSON.parse(localStorage.getItem('headers')) || [];
    const domain = localStorage.getItem('domain') || '';

    if (domain === '') {
      return addHeader(headers, details);
    } else if (details.url.indexOf(domain) > -1){
      return addHeader(headers, details);
    } else {
      return { requestHeaders: details.requestHeaders };
    }
  },
  // filters
  { urls: ['https://*/*', 'http://*/*'] },
  // extraInfoSpec
  ['blocking', 'requestHeaders', 'extraHeaders']
);

function addHeader(headers, details) {
  headers.forEach(({ headerKey, headerValue }) => {
    details.requestHeaders.push({name: headerKey, value: headerValue});
  });

  return { requestHeaders: details.requestHeaders };
}
