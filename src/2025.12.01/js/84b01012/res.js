const low_quality_first = false // Set to true to show lower quality image first. Switch to high quality with TAB when hovering over links. To have it show lower quality first when hovering over image thumbnails, edit the variable in the 'to' field below.

if($.base[0]==='d'){
const x=platform.firefox ? new content.XMLHttpRequest() : new XMLHttpRequest();
x.open('GET',$[0],false);
x.send();
$._=x.responseText;
}
const l=cfg.hz.hiRes&&low_quality_first, hd_url=$._.match(/"og:image" itemprop="image" content="([^"]+)/)?.[1], sd_url=$._.match(/src=["']([^"']+\/samples\/[^"']+)/)?.[1], t=$._.match(/<meta name="keywords" content="[^"]+?, ([\da-h][^"]+)/)?.[1]||'';
if(t)this.CNT.filename=t.match(/(?:\S+\s?){1,3}/)?.[0]?.replace(/[^\w.-]/g,'_')?.trim()+'-'+(hd_url||sd_url)?.match(/([\w-]+)\.\w+(?:\?|$)/)?.[1];
return [[[hd_url?(l?'':'#')+hd_url:'',sd_url?(l?'#':'')+sd_url:''],t]]