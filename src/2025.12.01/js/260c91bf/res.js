let jsonEnc=$._.match(/window\.__PRERENDERED_STATE__= "({.+})";/)[1];
let json=JSON.parse(eval('"'+jsonEnc+'"'));
let res = [];
for (obj in json.ad.ad.photos) {
  res.push([json.ad.ad.photos[obj]]);
}
return res;