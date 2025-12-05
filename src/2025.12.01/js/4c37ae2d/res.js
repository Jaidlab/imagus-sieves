if($.base[0]==='d'){
const x=new XMLHttpRequest();
x.open('GET',$[0],false);
x.send();
$._=x.responseText;
}
var i = $._.indexOf('<div id="galleryimage">');
if(i<0) { return null; }
var t = $._.indexOf('<div class="clearfix">', i);
if(t<0) { return null; }
var res = [];
var re = /<a target=["']_blank["'] href=["']([^"']+)["']>/gi
var a = re.exec( $._.substring(i,t) );
if (a==null) {
  re = /file: '([^']+)',/i
  a = re.exec( $._.substring(i,t) );
}
var author=$._.match(/href="\/artists\/([^"\/]+)\/Gallery"/)?.[1].replace(/[^\w.-]/g,'_');
var name=$._.match(/<img src='\/sys\/GetGalleryItem\.ashx\?ID=[^']+' title='([^']+)/)?.[1].replace(/[^\w.-]/g,'_');
if(author&&name)this.CNT.filename=author+' - '+name;
return a[1];