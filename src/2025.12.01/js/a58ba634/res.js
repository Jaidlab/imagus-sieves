if($.base[0]==='d'){
var x=new XMLHttpRequest();
x.open('GET',$[0],false);
x.send();
$._=x.responseText;
}
var i = $._.indexOf('id="thumbnail-container"');
if(i<0) { return null; }
var t = $._.indexOf('</a></div></div></div>', i);
if(t<0) { return null; }
var res = [];
var re = /data-src="([^"]+)"/gi
var a = re.exec( $._.substring(i,t) );
while(a)   {
  res.push([a[1].replace(/t(\d?.nhentai)/,'i$1').replace(/t(\.\w+).*/,'$1')]);
   a = re.exec( $._.substring(i,t) );
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