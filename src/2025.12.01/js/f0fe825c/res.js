let meta = document.querySelector('head > meta[name="referrer"]');
if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'referrer';
    meta.content = 'same-origin';
    document.getElementsByTagName('head')[0].appendChild(meta);
} else if (meta.attributes.content.value !== 'same-origin') {
    meta.attributes.content.value = 'same-origin';
}
let u, m=$._.match(/id="store-prefetch">({.+?})<\/script/)?.[1];
if(m)m=JSON.parse(m);
if(m?.resources)m=Object.values(m.resources);
if(u=m?.[0]?.videoStreams?.videos?.pop()?.url)return {loop:u};
if(u=$[1]&&m?.find(i=>i.meta?.original))return u.meta.original;
return m?.filter(i=>i.meta?.original||i.meta.xxxlPreview).map(i=>[i.meta.original||i.meta.xxxlPreview])||''