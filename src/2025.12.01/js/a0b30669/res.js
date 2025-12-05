const res = [];
const images = JSON.parse(/"allImages":\s*(\[.+?\])/.exec($._)[1]);
for (let img of images) {
   res.push([img.url]);
}
return res;