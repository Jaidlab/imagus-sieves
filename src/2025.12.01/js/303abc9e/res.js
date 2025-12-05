if($._[0]!=='{'&&!this.alibaba_base){
this.alibaba_base=JSON.parse($._.match(/<script type="application\/ld\+json">([^<]+)/s)?.[1]||'[]').flatMap(i=>i.contentUrl?[[i.contentUrl,[i.name,i.description].filter(Boolean).join(' | ')]]:[]);
return {loop:$[0]}
}
let m=this.alibaba_base;
delete this.alibaba_base;
$=JSON.parse($._).data.productHtmlDescription;
$=new DOMParser().parseFromString($,'text/html');
$=[...$.querySelectorAll('img[data-src]')].map(i=>[i.getAttribute('data-src')]);
m=m.concat($)
return [...new Map(m)]