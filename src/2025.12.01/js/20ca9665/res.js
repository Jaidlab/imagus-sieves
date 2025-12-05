$._ = $._.match(/var videoObject = (\{[^\n]+\})/)
if(!$._) return null
$._=JSON.parse($._[1])
var t;
if($._.group) {t=$._.name;$._=$._.group.videos} else {$._=[$._]}
return $._.map(function(x,i) {
 var f=x.files, u=[];
 ['mp4', 'webm', 'mp4-mobile', 'webm-mobile'].forEach(function(t,ii){
  f[t]&&u.push((ii<2?'#':'')+f[t].url)
 })
 return [u, (!i&&t ? '['+t+'] ':'') + ($._.title || '')]
})