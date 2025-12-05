var i = $._.indexOf('window.__YOULA_STATE__ = {');
if(i<0) {return null;}
var t = $._.indexOf('};', i);
if(t<0) {return null;}
var js=JSON.parse($._.substring(i+25,t+1));
var res = [];
for (let img of js.entities.products[0].images){
   res.push([img.url]);
}
return res;