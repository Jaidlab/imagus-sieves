if($[1]&&$[1]!==location.hostname)return ''
let a=[...document.getElementsByClassName('shopee-rating-media-list-image__content--blur')]
for(let i=0;i<a.length;i++)a[i].remove()
const n=this.node
return n.parentNode.nextSibling?.className==='rating-media-list__video-cover' ? n.closest('.rating-media-list').querySelector('video').src : (/\/[a-z]{2}?-50009109-/.test($[0]) ? n.parentNode.parentNode.querySelector('img[src^="https://down-"]:not([src*="-50009109-"])')?.src||n.attributes?.style?.textContent?.match(/https:[^_]+/)?.[0]||n.nextSibling?.nextSibling?.firstChild?.attributes?.style?.textContent?.match(/https:[^_]+/)?.[0]||'' : $[1] ? n.src||n.querySelector('img[src]')?.src||'' : $[0]).match(/^([^_]+)/)?.[1]||''