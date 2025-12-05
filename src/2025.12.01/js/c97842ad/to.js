var l = ($[2][0]=='i' ? '//' : '')+'i.'+($[1]||'')+$[2]+'/'+$[3];
var res='';
if ($[4]) {
  res= l+'.'+$[4].replace('gifv','mp4');
}
else {
  res= l + '.mp4\n'+ l + '.gif\n' + l + 'h.jpg';
}
let meta = document.querySelector('head > meta[name="referrer"]');
if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'referrer';
    meta.content = 'same-origin';
    document.getElementsByTagName('head')[0].appendChild(meta);
} else if (meta.attributes.content.value !== 'same-origin') {
    meta.attributes.content.value = 'same-origin';
}
return res;