if($[4])return [...$._.matchAll(/src="([^"]+)" class="img-responsive center-block"/g)].map(i=>[['#'+i[1].replace(/\d+x\d+/,'1920x1080'),i[1].replace(/\d+x\d+/,'1024x768')],'Gallery Cover Image'])
if($[2]){
let lo=$._.match(/"bb_link_\d+x\d{3}">[^<]+/)?.[0]||[]
if(!lo.length)return {loop:'https://'+$[1]+'?fotosets'}
$=$._.match(/bb_link_">[^<]+/g)?.reverse()[0]||[]
$=[...$.matchAll(/\[img\]([^\[]+)/g)].reverse()
lo=lo.length?[...lo.matchAll(/\[img\]([^\[]+)/g)].reverse():[]
return $.map((i,n)=>[['#'+i[1],lo[n]?.[1]||'']])
}
$=[...$._.matchAll(/<a\s+download\s+href="([^"]+)">\d+x(\d+)/g)]
return [[['#'+$.pop()[1],$.filter(i=>i[2]<1080).reverse()[0]]]]