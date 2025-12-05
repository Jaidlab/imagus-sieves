if ($[1]) {
  var c = $._;
  var i = c.indexOf('<ul class="thumbnails_');
  if(i<0) { return null; }
  var t = c.indexOf('</ul>', i);
  if(t<0) { return null; }
  var res = [];
  var re = /<img src="([^"]+)"/gi
  var a = re.exec( c.substring(i,t) );
  while(a)   {
    res.push([a[1]]);
    a = re.exec( c.substring(i,t) );
  }
  return res;
}
else {
  var re = /class=".+" href="([^"]+)"><div class=".+"><picture>/gi;
  var a = re.exec( $._);
  if (a==null) return null;
  const url_selector = $[0].split("/").slice(3).join("/");
  const a_elem = document.querySelector(`a[href*="${url_selector}"]`);
  a_elem.href += `#${btoa("https://www.discogs.com"+a[1])}`
  a_elem.style.cssText = "border-bottom: 3px solid #ebff00; !important";
  return;
}