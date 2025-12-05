let m, x, n=this.node;
if(m=location.pathname.startsWith('/tagged/')&&[...document.scripts].find(i=>/{"@type":"ItemList"/.test(i.textContent))?.textContent){
m=JSON.parse(m).itemListElement;
x=[...n.closest('.grid')?.children||[]];
x=x.findIndex(i=>i.querySelector(`img[src="${n.src}"]`))+1;
if(x)return m.find(i=>i.position===x)?.url?.replace(/(\/\d{8,18})\/.*/,'$1&'+($[3]||$[5]))
}
if(location.hostname.endsWith('tumblr.com')){
const n=this.node, link=n.closest('div[class="LaNUG"]')?.querySelector('[class="MvV_c mVBb2 BSUG4"]')||n.closest('.post-content')?.querySelector('a[class="tumblr_blog"][href*="tumblr.com/"],.date>a[href]')?.href, id=!link&&n.closest('[class="So6RQ i4aRn YSitt"],[class="So6RQ YSitt"]')?.getAttribute('data-id'), domain=id&&n.closest('article[class^="FtjPK"]')?.querySelector('a[class="BSUG4"]')?.href;
if(link||domain&&id)return (link?.replace(/(\/\d{8,18})\/.*/,'$1')||domain.replace(/(\.com\/)$/,'$1post')+'/'+id)+'&'+($[3]||$[5]);
}
return $[5] ? 'tumblr/upgrade/https://'+$[0] : $[4][0]=='f' ? 'vt'+$[2]+'.mp4' : '//'+($[1]||'78.media')+$[2]+$[3]+'#1280 500 400#.'