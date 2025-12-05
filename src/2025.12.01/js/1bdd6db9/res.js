const caption = $._.match(/<img.+?alt="(.*?)"/)?.[1] || $._.match(/<title>(.+?)<\/title>/)?.[1] || '';

if(/"og:video" content="[^"]/.test($._))return $._.match(/https:\/\/video-downloads\.googleusercontent\.com\/[^"]+/)[0]+'#mp4'

const urls = [...$._.matchAll(/<img class=.+?(http?[^=]+)[^<]+?<div/g)];

if (urls.length > 0) return urls.map(x => [x[1] + '=s0', caption]);

return [$._.match(/AF_dataServiceRequests.=.+?http.+?,"(http.+?)"/)[1], caption];