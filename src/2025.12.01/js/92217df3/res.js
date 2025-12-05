let i = $._.indexOf('images:[');
if(i<0) { return null; }
let t = $._.indexOf(']', i);
if(t<0) { return null; }
let jsn=JSON.parse('{"images":'+$._.substring(i+7,t+1)+'}');
let res = [];
for (img of jsn.images) {
  res.push([img]);
}
return res;