let m;
if(m=this.node.closest('ul[data-scroll-container]')?.querySelectorAll('figure')){
return 'nrk/no?album/'+[...m].map(i=>i.querySelector('source[type="image/jpeg"]')?.srcset?.split(/,\s*/)?.pop()?.replace(/\s\d+w.*/gs,'')).join('!')
}
let img = document.querySelector(`[srcset*="${$[0]}"]`)?.srcset.split(/,\s*/);
return img ? '#'+img.pop().replace(/\s\d+w.*/gs,'')+'\n'+img.filter(i=>/\s1\d{3}w$/.test(i))[0]?.replace(/\s\d+w.*/gs,'') : $[0]