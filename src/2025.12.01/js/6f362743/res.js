var i = $._.indexOf('<div class="postholder">');
if(i<0) { return null; }
var t = $._.indexOf('<div class="tags">', i);
if(t<0) { return null; }
var res = [];
var re = /class="sidepostimage"\s+src="([^"]+)">/gi
var a = re.exec($._.substring(i,t));
while(a) {
 res.push([a[1]]);
 a = re.exec( $._.substring(i,t) );
}
return res;