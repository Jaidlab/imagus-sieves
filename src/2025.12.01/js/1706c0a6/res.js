if($[1]){
if(!this.dns_shop_json){
const u=document.body.innerHTML.match(/data-product-card="([^"]+)/)?.[1], x=new XMLHttpRequest();
if(!u)return null;
x.open('GET','https://www.dns-shop.ru/catalog/product/get-media-content/?id='+u,false);
x.send();
this.dns_shop_json=x.responseText;
}
return JSON.parse(this.dns_shop_json).data.tabs[0].objects.find(i=>RegExp(`${$[1]}`).test(i.thumbSrc.orig))?.origSrc?.orig||''
}
const imgOrig = (m) => m.replace(/thumb\/st1\/fit\/\d+\/d+\/[^\/]+/,'api/v1/image/getOriginal');
$=JSON.parse($._.match(/type="application\/ld\+json">({.+?})<\//)?.[1]||'{}')['@graph'][0];
const t=[$.about,$.description].filter(Boolean).join(" | ");
const imgs=$.image.map((i,n)=>[imgOrig(i),!n?t:'']);
const vids=$.video?.map(i=>['',`<imagus-extension type="iframe" url="${i.embedUrl}"></imagus-extension>`]);
$=imgs.concat(vids);
if(vids?.length){
this.TRG.IMGS_ext_data=$;
return {loop:'imagus://extension'};
}
return $