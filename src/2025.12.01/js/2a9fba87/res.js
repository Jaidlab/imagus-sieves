var i = $._.indexOf('id="thumbnail-container"');
if(i<0) { return null; }
var t = $._.indexOf('<script src="', i);
if(t<0) { return null; }
var res = [];
var re = /data-src="([^"]+)"/gi
var a = re.exec( $._.substring(i,t) );
var data=$._.substring(i,t);
while(a)   {
  res.push([a[1].replace('t.','.')]);
  a = re.exec(data);
}
let meta = document.querySelector('head > meta[name="referrer"]');
if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'referrer';
    meta.content = 'same-origin';
    document.getElementsByTagName('head')[0].appendChild(meta);
} else if (meta.attributes.content.value !== 'same-origin') {
    meta.attributes.content.value = 'same-origin';
}
return res;