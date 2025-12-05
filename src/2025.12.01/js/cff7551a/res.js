var i = $._.indexOf('<video id="mediaplayer"');
if(i<0) { return null; }
var t = $._.indexOf('<div class="normalbox" id="comments">', i);
if(t<0) { return null; }
var res = [];
var re = /<source src="([^"]+)" type="video\/mp4" label="([^"]+)"/gi
var a = re.exec( $._.substring(i,t) );
while(a)   {
   res.push([a[1], a[2]]);
   a = re.exec( $._.substring(i,t) );
}
return res;