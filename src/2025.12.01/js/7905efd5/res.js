const low_resolution_first = false // Set to true to show 1200px image first. Press TAB to switch to full size image.

$=JSON.parse($._)
if($.error)return !1
var i=0,r=[],l=low_resolution_first,$=$.body
for(;i<$.pageCount;++i) r.push([[(!l?'#':'')+$.urls.original.replace('_p0', '_p' + i),(!l?'':'#')+$.urls.regular.replace('_p0', '_p' + i)]])
r[0][1] = '['+$.title+' by ' + $.userName + ' | ' + new Date($.uploadDate).toLocaleString() + '] ' + $.description
this.CNT.filename=$.userName+'_'+r[0]?.[0]?.[0].match(/img-original\/([\w\/-]+)/)?.[1].replace(/\//g,'_')
return r