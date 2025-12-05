let json=JSON.parse($._);
let res=[];
for (picture of json.data.slider.pictures) {
  res.push([picture.src]);
}
return res;