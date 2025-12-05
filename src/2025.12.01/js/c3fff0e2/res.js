const f=this.find
$=$._.match(/\\"dop\\":(\[[^\]]+\])/)?.[1].replace(/\\"/g,'"')
$=JSON.parse($)
return $?.map(i=>[[f({src:Object.values(i.src)[0]}),i.src['600']||'']])||''