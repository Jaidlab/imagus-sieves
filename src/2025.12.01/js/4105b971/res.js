if(!$[2]){
const combine = (...n) => n.filter(Boolean).join(" - ")
let isDir = false
const cast=(JSON.parse($._.match(/"castAndCrewData" type="application\/json">({.+?})<\/script/)?.[1]||'{}')?.people||[...$._.matchAll(/"cast-crew-item-link">[^<]+<p>([^<]+)<\/p>.+?<p class="p--small">[^\w]+([^<]+)/gs)]).flatMap(i=>{if(/Director/.test(i[2]))isDir=true;return !isDir?[[i.name||i[1],i.role||!/^p>/.test(i[2])&&i[2].replace(/\n\s*/g,' ').replace(/\s(Voice)/,' ($1)')].filter(Boolean).join(" - ")]:[]}).join("\n").replace(/.+/,'\n<b>Top Cast</b>\n$&')
$._=JSON.parse($._.match(/type="application\/ld\+json">(?:\n\s+)?({.+?})(?:\n|<\/script)/)[1])
const title=`<span style="font-size: 120%; font-weight: bold;">${$._.name}</span>`
const duration=$._.duration
const date=new Date($._.dateCreated).toLocaleDateString(navigator.language,{year:'numeric',month:'short',day:'2-digit'})
const genre=$._.genre.join(", ")
const rating=$._.contentRating
const tomatoRating=$._.aggregateRating?.ratingValue.replace(/.+/,'TomatoMeter: $&%')
const director=$._.director?.map(i=>i.name)?.join(", ").replace(/.+/,(t)=>'\n<b>Director'+($._.director.length>1?'s':'')+': </b>'+t)
const author=$._.author?.map(i=>i.name)?.join(", ").replace(/.+/,(t)=>'<b>Writer'+($._.author.length>1?'s':'')+': </b>'+t)
const plot=$._.description?.replace(/.+/,'\n<b>Plot</b>\n$&')
const info=[title, combine(duration,date), combine(genre,rating), tomatoRating, plot, director, author, cast].filter(Boolean).join("\n")
this._RT_imgs=[[$._.image,`<imagus-extension type="sidebar">${info}</imagus-extension>`]]
return {loop:'https://www.'+$[1]+'/pictures'}
}
if($[2][1]==='p'){
$._=JSON.parse($._.match(/"pictures-json"\s+type="application\/json">(\[.+?\])<\/script/)?.[1]||'[]').map(i=>[i.srcFull?.replace(/^https:\/\/resizing\.flixster.+\/(https:\/\/)/,'$1'),i.caption||''])
if(!this._RT_imgs)return $._
$._.forEach(i=>this._RT_imgs.push(i))
return {loop:'https://www.'+$[1]+'/videos'}
}
if(/^[vt]$/.test($[2][1])){
$=JSON.parse($._.match(/id="videos"\s+type="application\/json">(\[.+?\])<\/script/)?.[1]||'[]').map(i=>[i.file?.match(/^[^?]+/)[0]+'#mp4',i.description||''])
if(!this._RT_imgs)return $
$.forEach(i=>this._RT_imgs.push(i))
}
this.TRG.IMGS_ext_data=this._RT_imgs
delete this._RT_imgs
return {loop:'imagus://extension'}