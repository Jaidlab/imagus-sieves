$._=JSON.parse($._).Media
if($._.some(i=>i.galleryIndex))return $._.map((i,n)=>$._.filter(i=>i.galleryIndex===n).sort((a,b)=>b.height-a.height)[0]).filter(Boolean).map(i=>['https://'+$[1]+i.loc+$[2]+i.id])
if($._.some(i=>i.type==='video')){
$._=$._.filter(i=>i.type==='video').sort((a,b)=>b.height-a.height)[0]
return 'https://'+$[1]+$._.loc+$[2]+$._.id
}
$._=$._.sort((a,b)=>b.height-a.height)[0]
return 'https://'+$[1]+$._.loc+$[2]+$._.id