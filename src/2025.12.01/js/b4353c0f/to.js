const n=this.node;
let s=n.closest('div[class="x1xmf6yo"]')?.querySelectorAll('picture');
s=s&&[...s].map(i=>(i.querySelector('img[srcset]')||i.querySelector('img'))?.src);
const m=(n.querySelector('img[srcset]')||n.querySelector('img'))?.src, b=s?.length>1, i=m&&b&&s.indexOf(m);
return b&&i>-1 ? '//threads.net/?'+i+'!'+s.join('!') : m||$[0]