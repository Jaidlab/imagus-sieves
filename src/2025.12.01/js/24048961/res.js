if($[2])this.t_me_urls=$[2].split('!');
let m=this.t_me_imgs||[];
const t=$._.match(/js-message_text" dir="\w+">(.+?)<\/div>/)?.[1]||'', idx=[...this.node.closest('div[class="tgme_widget_message_grouped_layer js-message_grouped_layer"]')?.querySelectorAll('a[href]')||[]].findIndex(i=>i.href===$[0]);
$=[...$._.matchAll(/(?:<video[^>]+src=\\?"|(?![\W\w]+<video src=);background-image:url\(')([^"']+)/g)];
$=[...new Map($)].map((i,n)=>[i[1],!n?t:'']);
m.push(...$);
if(this.t_me_urls?.length){
this.t_me_imgs=m;
return {loop:this.t_me_urls.shift()}
}
delete this.t_me_urls;
delete this.t_me_imgs;
return idx>0 ? {"":m,idx:idx} : m