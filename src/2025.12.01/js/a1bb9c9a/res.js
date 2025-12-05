var i = $._.indexOf('window.initialState=');
if(i<0) { return null; }
var t = $._.indexOf('};</script>', i);
if(t<0) { return null; }
var sources=JSON.parse($._.substring(i+20,t+1));
var res = [];
for (var k in sources.photos) {
 var url='https://auto.ria.com/photos/'+ sources.photos[k].src;
 res.push([url]);
}
return res;