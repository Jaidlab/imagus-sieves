arr=JSON.parse($._).model;
var res=[];
for (let i = 0; i < arr.slider_images.length; i++) {
  res.push(["https:\/\/3dtoday.ru\/" + arr.slider_images[i].source,arr.name]);
}
return res;