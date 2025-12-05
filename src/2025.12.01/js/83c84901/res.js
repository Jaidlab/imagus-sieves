var re=/data-product-card="([^"]+)"/gi
var az=$._
var url=re.exec(az)[1];
if (url==null) { return null; }
x = new XMLHttpRequest();
x.open('GET', 'https://www.dns-shop.ru/catalog/product/get-media-content/?id=' + url,false)
x.send();
if (x.readyState != 4) return;
if (x.status != 200) return;
var rawJson=x.responseText;
var res=[];
var re1=/"origSrc":{"orig":"([^"]+)"/gi
var a = re1.exec(rawJson);
while(a) {
   res.push([a[1]]);
   a = re1.exec(rawJson);
}
return res;