const include_360_images = false // True includes images from 360 view in album if available.

let m = [];
const o=JSON.parse($._.match(/\["product__serverData"\]\s*=\s*JSON\.parse\("({.+?})"\);<\/script/)?.[1].replace(/\\"/g,'"').replace(/\\\\/g,'\\'));
o.media.items.filter(i=>i.src||i.videoSrc).forEach(i=>m.push([[(i.srcIncreased||i.videoSrc)?.replace(/.+/,'#$&'),i.src||i.videoSrc]])); o.reviews?.items?.filter(i=>i.photos?.length).forEach(i=>i.photos?.forEach(x=>m.push([x.src,i.text])));
if(include_360_images)o.media.items.find(i=>i.type==='360')?.photos?.forEach(i=>m.push([i]));
return m