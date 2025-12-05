let i = $._.indexOf('<div id="morephotosroot"');
if(i<0) { return null; }
let t = $._.indexOf("<table class='prod-menu'>", i);
if(t<0) { return null; }
let res = [];
let re = /data-href="([^"]+)"/gi
let data=$._.substring(i,t);
let a = re.exec(data);
while(a) {
  res.push([a[1]]);
   a = re.exec(data);
}
return res;