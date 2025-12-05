if(!$[1])return $._.match(/"card-body"\s*>\[IMG\]([^[]+)/)?.[1]||'';
const img = i => [u+i.publicFileName,i.name];
const u=$._.match(/cdnUrl\s*=\s*"([^"]+)/)?.[1].replace(/\\/g,'')||'//i.slow.pics/';
let m=[], o=JSON.parse($._.match(/collection\s*=\s*([^;]+)/)?.[1]||'{}'), a=o.key===$[2];
o=o.comparisons||o.images||[];
if(a)o.forEach(i=>i.images?i.images?.forEach(i=>m.push(img(i))):m.push(img(i)));
else o.find(i=>i.key===$[2])?.images.forEach(i=>m.push(img(i)));
return m