if($[1])return `#${$[1]}${$[2]}\n${$[1]}max/1024/${$[2]}`
if(!/medium\.com$/.test(location.hostname))return ''
const m=[...this.node.offsetParent.querySelectorAll('img')||[]].sort((a,b)=>(b.height*b.width)-(a.height*a.width))?.[0]?.src?.match(/^(https:\/\/(?:cdn-images-\d|miro)\.medium\.com\/)[^?]+\/([^?]+).*/);
return m ? `#${m[1]}${m[2]}\n${m[1]}max/1024/${m[2]}` : ''