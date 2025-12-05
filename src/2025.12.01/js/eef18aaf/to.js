const disable_on_links = false

if($[1])return '#'+$[1]+'\n'+$[1]+'?imwidth=1280'
let t=this.node;
t=t.closest('article')?.querySelector('img[src]:not([src*="%20"])')?.src?.match(/^([^?]+).*/)?.[1];
return !disable_on_links&&t?.length?'#'+t+'\n'+t+'?imwidth=1200':''