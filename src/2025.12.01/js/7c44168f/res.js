let i = $._.search(/<div class="styles_root__[^ ]+ styles_gallery__/);
if(i<0) { return null; }
let t = $._.indexOf('<div class="styles_bannerContainer__', i);
if(t<0) { return null; }
let res = [];
let re = /<a href="([^"]+)" target="_blank"/gi
let data=$._.substring(i,t)
let a = re.exec(data);
while(a) {
 res.push([a[1]]);
 a = re.exec(data);
}
return res;