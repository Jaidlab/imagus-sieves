const res = [];
const data = JSON.parse(/window\.__INITIAL_STATE__\s*=\s*({.+})/.exec($._)[1]);
const images = data.catalog.productData[Object.keys(data.catalog.productData)[0]].images;
for (img of images) {
  res.push([img.cropUrlTemplate.replace('%s','1600x1600-fit')]);
}
return res;