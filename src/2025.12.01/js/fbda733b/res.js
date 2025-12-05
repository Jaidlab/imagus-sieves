var res=[];
var m1=$._.match(/id="pcash-click-zoom-pic"><img src="(\/allpics\/\d+\/\d+-\d+\/img_)thumb(\/\d+)-thumb(\.\w+)">/);
  console.log('1');
  console.log(m1);
if (m1!=null) {res.push(['https://piccash.net'+m1[1]+'full'+m1[2]+m1[3]]);}
else {
  console.log('2');
  m1=$._.match(/<div class="pcash-pic-full">\s*<img src="([^"]+)">/);
  console.log(m1);
  res.push(['https://piccash.net'+m1[1]]);
}
return res;