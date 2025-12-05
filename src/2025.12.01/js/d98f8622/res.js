var i = $._.indexOf('<div class="fotorama"');
if(i<0) { return null; }
var t = $._.indexOf('<div class="offer__block">', i);
if(t<0) { return null; }
var res = [];
var re = /href="(https:\/\/static\.auction\.ru\/offer_images\/(?:\w+\/)?\d{4}(?:\/\d\d){3}\/big\/\w\/\w+\/\w+\.\w+)"/gi
var a = re.exec( $._.substring(i,t) );
while(a)   {
   res.push([a[1]]);
   a = re.exec( $._.substring(i,t) );
}
return res;