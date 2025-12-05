var res=[];
x = new XMLHttpRequest();
x.open('GET', 'https://api.thingiverse.com/things/' + $[2] + '/images',false);
//x.timeout=3000;
x.setRequestHeader('Authorization', 'Bearer 56edfc79ecf25922b98202dd79a291aa');
x.send();
if (x.readyState != 4) return;
if (x.status != 200) return;
var c = JSON.parse(x.responseText);
c.forEach(function(obj) {
  obj.sizes.forEach(function(obj1) {
    if (obj1.type=='display' && obj1.size=='large') {
      res.push([obj1.url, obj.name]);
    }
  });
});
return res;