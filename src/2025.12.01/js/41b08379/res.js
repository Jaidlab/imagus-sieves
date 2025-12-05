var i = $._.indexOf('JSON.parse');
if(i<0) { return null; }
var t = $._.indexOf('");</script>', i);
if(t<0) { return null; }
var jsr=$._.substring(i+12,t).replace(/\\"/g,'"').replace(/\\\\/g,'');
var json=JSON.parse(jsr);
if (json.data.post.type=='Animated')
  {return json.data.post.images.image460sv.vp9Url;}
return json.data.post.images.image700.webpUrl;