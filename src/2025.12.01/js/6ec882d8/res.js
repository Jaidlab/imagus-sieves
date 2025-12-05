const doc = new DOMParser().parseFromString($._, "text/html");
var i =  doc.querySelector('#main-image');
if (i) return i.src;

i = doc.querySelector('.thumb > a');
return i ? { loop: i.href } : '';