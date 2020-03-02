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
                    }
                }
            }
        }

        // This is a normal array and can be modified like any array (use `push` to add new entries, for example)
        // let requestHeaders = details.requestHeaders;

        // Uncomment the below to log details:
        // console.log(`onBeforeSendHeaders: Request id ${details.requestId}: "${details.method} ${details.url}" (type: ${details.type})`);
        console.log(`${details.requestHeaders.referer}`);
        return {requestHeaders: details.requestHeaders};
    },

    {
        urls: ['<all_urls>']
    },

    // "Extra Info" Spec: "blocking" says that this callback might modify (change headers) the request,
    // "requestHeaders" makes sure that `details` includes the request headers, and "extraHeaders" makes it so
    // the details includes some extra (more privacy-sensitive) headers that would normally not be provided by Chrome
    ['requestHeaders', 'extraHeaders', 'blocking']
);