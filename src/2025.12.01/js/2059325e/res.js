var u,g,i=0,r=[], o=JSON.parse($._),rg='redgifs';
if(o.errorMessage)return $[1]==rg ? null : {loop: $[0].replace($[1], rg)}
o=o.publishedGfys||[o.gfyItem]
while(g=o[i++]) {
 u=['#'+g.webmUrl, '#'+g.mp4Url]
 g.mobileUrl&&u.push(g.mobileUrl)
 r.push([u, (g.title||'') + (g.tags&&g.tags.length ? ' ['+g.tags.join(', ')+']':'')])
}
return r.length ? r : null