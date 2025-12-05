var i = $._.indexOf('var fotos =')
if(i<0) { return null; }
var t = $._.indexOf('function BootFotoViewer', i);
if(t<0) { return null; }
var res = []
var re = new RegExp("fotoID: "+$[1]+",[\\S\\s]+?originalURL: '(https?:\/\/cdn\\.promodj\\.com\/afs\/[^']+)',","mg");
var a = re.exec( $._.substring(i,t) );
if (a) {res.push([a[1]]);}
return res