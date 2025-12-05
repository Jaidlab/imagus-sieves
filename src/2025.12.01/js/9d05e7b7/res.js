const x=new XMLHttpRequest();
x.open('GET',$[0].replace(/promo-page(\/details\/)#\?slug=([^&]+).*/,'catalog$1$2'),false);
x.send();
if(/get_cookie_spsc_encrypted_part/.test(x.responseText)&&!/\?/.test($[0])){
x.open('GET',$[0]+'?oirutpspid'+document.cookie.match(/spid(=[^;]+)/)[1]+'&oirutpspsc'+document.cookie.match(/spsc(=[^;]+)/)[1]+'&oirutpspjs'+document.cookie.match(/spjs(=[^;]+)/)[1],false);
x.send();
}
$._=x.responseText;
var i = $._.indexOf('<div class="scroller__content scroller_enlarged">');
if(i<0) {i = $._.indexOf('<div class="pdp-first-screen-regular__gallery-and-attr">');}
if(i<0) {return null; }
var t = $._.indexOf('</div></div>', i);
if(t<0) {return null; }
var res = [];
var re = /gallery[_-][^"]+?"><img src="([^"]+)"/gi
var data=$._.substring(i,t);
var a = re.exec(data);
while(a)   {
   res.push([a[1]]);
   a = re.exec(data);
}
// reviewPhoto
x.open('POST', 'https://megamarket.ru/api/mobile/v1/catalogService/productCardReviewInfo/get',false);
x.setRequestHeader('content-type', 'application/json');
x.send('{"goodsId":"' + $[1] +'","auth":{"locationId":"50","appPlatform":"WEB","analyticsDeviceId":"","os":"UNKNOWN_OS"}}');
if (x.readyState != 4) return res;
if (x.status != 200) return res;
var c = JSON.parse(x.responseText).previewMediaGalleryItems;
c.forEach(function(obj) {
  res.push([obj.url]);
});

return res;