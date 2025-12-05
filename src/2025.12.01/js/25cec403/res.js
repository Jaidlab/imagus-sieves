let i = $._.indexOf('<div class="screenbox">');
if(i<0) { return null; }
let t = $._.indexOf('</div>', i);
if(t<0) { return null; }
let res = [];
let re = /a href="([^"]+)"/gi
let data=$._.substring(i,t);
let a = re.exec(data);
while(a)   {
  if (a[1].startsWith('http')) {
    res.push([a[1]]);
  }
  a = re.exec(data);
}
return res;