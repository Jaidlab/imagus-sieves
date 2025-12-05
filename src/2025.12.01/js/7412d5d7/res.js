if(!$._.length)$._=document.body.outerHTML
try{
$=JSON.parse($._.match(/":({"images?":.+?})},"/)[1])
return $.images?$.images.map(i=>[i.backstageImageRenderer.image.thumbnails[0].url.match(/^[^=]+=/)+'s0']):$.image.thumbnails[0].url.match(/^[^=]+=/)+'s0'
}catch(e){
console.error('YouTube Gallery Error: '+e)
return this.node.src?this.node.src.match(/^[^=]+/)+'=s0':''
}