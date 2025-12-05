if($[1]){
this.TRG.IMGS_ext_data = ['//data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"></svg>',`<imagus-extension type="videojs" url="${$._.match(/<meta property="og:video:url" content="([^"]+)/)[1]}"></imagus-extension>${$._.match(/"description":\s*"([^"]+)/)?.[1]}`]
return {loop:'imagus://extension'}
}else{
let m, n=this.node
try{
m=JSON.parse(document.body.outerHTML.match(/Fusion\.globalContent=({.+?});/)[1]).result.related_content.galleries.find(i=>i.content_elements.find(x=>x.alt_text===n.attributes?.alt?.textContent||x.caption?.match(/^[^.]+/)[0]===n.previousSibling?.textContent?.match(/^[^.]+/)[0])).content_elements.map(i=>[i.url,i.caption])
}catch(e){
m=[...n.closest('div[data-testid^="gallery-"],div[data-testid^="primary-gallery"],div[class^="carousel-"][role="presentation"],div[class^="gallery-modal__gallery-carousel__"]')?.querySelectorAll('div[data-testid="Image"]')||[]]
m=m?.length?m.map(i=>[i.querySelector('img[src]')?.src||i.lastChild.innerText.match(/img\s+src="([^"]+)/)[1]]):n.closest('figure').querySelector('img')?.src?.match(/^[^&]+/)[0]
}
const i=$[2]&&m.findIndex(i=>RegExp(`${$[2].replaceAll('.','\\.')}`).test(i[0]))||0
return {"":m,idx:i}
}