let m=[];
$=$._.match(/"application\/ld\+json">({.+?contentUrl.+?})<\/script>/);
$=$&&JSON.parse($[1]);
$.image?.forEach(i=>i.url!==i.contentUrl&&m.push([i.contentUrl,i.description]));
$.video?.forEach(i=>m.push([i.contentUrl,i.description]));
return m