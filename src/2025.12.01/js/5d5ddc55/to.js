const n=this.node;
let m;
if(m=location.hostname.endsWith('seaart.ai')&&n.closest('a[class="waterfall-item"][href*="/explore/detail/"]')?.href)return m;
return (n.src||n.querySelector('img')?.src||n.closest('[class="content-box"]')?.querySelector('img')?.src||n.offsetParent.querySelector('img')?.src)?.replace(/temp-convert-\w+\/(\w+)\/([^_]+).*/,'$2.$1').replace('.highwebp','_high.webp')||''