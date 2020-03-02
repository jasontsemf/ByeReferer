chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
        //   Method: GET, POST, etc
        let method = details.method;
        let url = details.url;
        if(!url.includes('google')){
            for (var i = 0; i < details.requestHeaders.length; i++) {
                var header = details.requestHeaders[i];
                if (header.name.toLowerCase() === 'referer') {
                    if(header.value.includes('google')){
                        console.log(
                            `Changing "referer" on ${url} header value from ${header.value} to nothing`
                        );
                        header.value = '';
                        console.log(`${details.requestHeaders.referer}`);
                    }
                }
            }
        }

        return {requestHeaders: details.requestHeaders};
    },

    {
        urls: ['<all_urls>']
    },

    ['requestHeaders', 'extraHeaders', 'blocking']
);