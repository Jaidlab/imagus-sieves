let res = [];
//let re = /<meta property=\"og:image\" content=\"([^\"]+)/gi;
let re = /class=\"postImg postImgAligned img-right\" title=\"([^\"]+)/gi;
let a = re.exec($._);
if (a) {
   res.push([a[1]]);
} else return null;
//re = /<a href=\"(http[^\"]+)\" style.+?class=\"highslide\"/gi;
re = /class=\"highslide\".+?<var class=\"postImg\" title=\"(http[^\"]+)/gi;
a = re.exec($._);
while(a) {
   res.push([a[1]]);
   a = re.exec($._);
}
return res;