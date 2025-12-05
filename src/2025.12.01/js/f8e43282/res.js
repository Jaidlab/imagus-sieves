var res=[];
var re,a;
var i = $._.indexOf('<img itemprop="image"');
if(i>0) {
  var t = $._.indexOf('<div class="clear"', i);
  if(t>0) {
    var data=$._.substring(i,t);
    re = /src="([^"]+)" alt="([^"]+)"/gi
    a = re.exec(data);
    while(a)   {
      res.push([a[1],a[2]]);
      a = re.exec(data);
    }
  }
}
re = /<source src="([^"]+)" type="video\/mp4">/gi
a = re.exec($._);
while(a)   {
   res.push([a[1]+'#mp4']);
   a = re.exec($._);
}
return res;