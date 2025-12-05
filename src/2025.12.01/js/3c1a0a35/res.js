const upgrade = r => r?.replace(/preview(\.redd.it\/[^?]+).*/, 'i$1');
$=JSON.parse($._).data.children[0].data, n=0, s=this.node?.src;
$=($.gallery_data && $.gallery_data.items || []).map(function(c, i) {
 var m=$.media_metadata[c.media_id], u=m.s, l=u.y>1080 && u.x>1920 && m.p?.filter(x=>x.y<=1080 || x.x<=1920).pop()?.u;
if(s&&u.u&&upgrade(s)===upgrade(u.u))n=i;
 return [
  (u.u ? l ? ['#'+upgrade(u.u), l] : upgrade(u.u) : (u.mp4 ? u.mp4 + '#mp4' : u.gif)),
  (!i ? '[' + new Date($.created_utc*1e3).toLocaleString() + ' | ' + $.title + '] ' : '') + (c.caption || '')
 ]
})
return s ? {"":$,idx:n} : $