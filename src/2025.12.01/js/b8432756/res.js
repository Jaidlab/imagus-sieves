if($.base[0]==='d'){
const x=new XMLHttpRequest();
x.open('Get',$[0],false);
x.send();
$._=x.responseText;
}
let i = $._.indexOf('<div class="slide">');
if(i<0) { return $._.match(/<img width="32" height="32" src="([^"]+)"/)[1]; }
let t = $._.indexOf('</div>', i);
if(t<0) { return null; }
let res = [];
let re = /href="([^"]+)"/gi
let data=$._.substring(i,t);
let a = re.exec(data);
while(a)   {
  res.push([a[1]]);
  a = re.exec(data);
}
return res || 'https://cdn-icons-png.flaticon.com/512/1179/1179237.png';