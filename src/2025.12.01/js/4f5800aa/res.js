const visible_gallery_image_first = true // <- Set to true for the visible image to be the first image in the album, false to keep the first gallery image as the first album image.
const a = visible_gallery_image_first
if(!$[1]){
const o=JSON.parse(($._.match(/__PRELOADED_STATE__ = ({.+?});/)||[,'{}'])[1]).transformed?.video
if(!o)return null
return [o.sources.mp4.src,o.title+' | '+o.description]
}else{try{
let m = Object.values(JSON.parse([...document.scripts].find(i=>RegExp(`${$[1]}`).test(i.textContent)).textContent.match(/^[^{]+({.+?});/)[1]).transformed.article.body).find(i=>i[1]?.props?.contentType==='gallery')[1].props.slides.map(i=>[['#'+i.image.sources.md.url.replace(/\/w_\d+[^/]+/,''),i.image.sources.md.url],i.dangerousHed])
if(a)m=m.concat(m.splice(0,m.findIndex(i=>RegExp(`${$[1]}`).test(i[0]))))
return m
}catch{
return this.node.src?.replace(/\/(?:4:3\/[^/]+|master\/w_[^/]+)/,'/master')
}
}