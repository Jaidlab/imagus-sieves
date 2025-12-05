var res=[];
JSON.parse($._).body.images.forEach(function(item){
  res.push(['https://img.mvideo.ru/'+item]);
});
return res;