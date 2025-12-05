let data=$._.match(/type="application\/ld\+json">({"@context":"https:\/\/schema\.org\/","@type":"Product"[^<]+)<\/script>/i);
let res=[];
for (image of JSON.parse(data[1]).image) {
  res.push([image]);
}
return res;