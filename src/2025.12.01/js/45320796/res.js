let jsn=JSON.parse($._);
let res=[];
for (pin of jsn.pins) {
  let url='https://'+pin.file.bucket+'.huaban.com/'+pin.file.key;
  let title=pin.raw_text;
  res.push([url,title]);
}
return res;