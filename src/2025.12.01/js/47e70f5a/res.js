var r=JSON.parse($._), x = r&&r.items&&r.items[0]
this.TRG.IMGS_ext_data = x.media.map(function(m,i){
  var v = {};
  m.variants.forEach(function(m){return v[m.version]=m.uri})
  m = [v['720p'] || v.tablet || v.mobile || v.photo, !i && [x.date, x.title, x.description].filter(Boolean).join(' | ')]
return /\.m(?:3u8|pd)?\b/.test(m[0]) ? ['',`<imagus-extension type="videojs" url="${m[0]}"></imagus-extension>${m[1]||''}`] : m
})
return {loop:'imagus://extension'}