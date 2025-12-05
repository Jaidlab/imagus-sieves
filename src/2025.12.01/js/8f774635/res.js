var i = $._.indexOf('<div class="zoom-button">');
if(i<0) { return null; }
var t = $._.indexOf('</div></div>', i);
if(t<0) { return null; }
var res = [];
var re = /<link itemprop="contentUrl" href="([^"]+)"/gi
var data=$._.substring(i,t);
var a = re.exec(data);
while(a)   {
   res.push([a[1]]);
   a = re.exec(data);
}
return res;