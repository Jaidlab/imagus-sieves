const low_resolution_first = false

if($[2][0]==='n'){
const t=$._.match(/"post__content">\n<pre>(.+?)<\/pre>/s)?.[1]||'';
const m=[...$._.matchAll(/(?:class="fileThumb"[^\w]+href|src(?=="[^>]+type="video\/[^"]{3,4}"))="([^"]+)"(?:[^>]+>[^>]+src="([^"]+))?/g)].map((i,n)=>[[(!low_resolution_first?'#':'')+i[1]?.replace(/^\/[^\/]/,'//'+$[1]+'$&'),(!low_resolution_first?'':'#')+i[2]?.replace(/^\/[^\/]/,'//'+$[1]+'$&')],!n?t:'']);
this.CNT.filename=$._.match(/href="\/[^\/]+\/user\/\d+">\n\s+(\S+)/s)?.[1]+'_'+m[0]?.[0]?.[0].match(/([\w-]+)\.[^\/]+$/)[1];
return m
}
let res=[];
const img = (s,m,v=false) => {
const l=low_resolution_first, u=s+'/data'+m;
return v ? [u+'#mp4',u+'#mp3'] : [(l?'':'#')+u,!/\.gif/.test(u)&&(l?'#':'')+'//img.'+$[2]+'/thumbnail/data'+m];
}
const x=new XMLHttpRequest();
x.open('GET',`https://${$[1]}/api/v1${$[3]}#kemono_header`,false);
x.setRequestHeader('accept','text/css');
x.send();
$._=x.responseText;
$._=JSON.parse($._);
$._.attachments?.forEach(i=>i.server&&i.path&&!/^\.(?:7z|bin|docx?|pdf|rar|txt|zip)/.test(i.extension)&&res.push([img(i.server,i.path,true)]));
if($._.post?.embed?.url?.length&&!res.length)return {loop:$._.post.embed.url};
$._.previews?.forEach(i=>i.server&&i.path&&res.push([img(i.server,i.path)]));
$._=$._.post;
if(res[0])res[0][1]=[($._.published?'Publish':'Add')+'ed '+new Date($._.published||$._.added).toLocaleString(),$._.content||'',$._.tags&&'Tags:[ '+$._.tags?.join(', ')+' ]'].filter(Boolean).join(' | ');
[...$._.content?.matchAll(/ src="([^"]+)/g)||[]].forEach(i=>res.push([i[1],$._.content.replace(/<[^>]+>/g,' ')]));
let n=document.querySelector('span[itemprop="name"]')?.textContent;
if(!n){
try{
const x=new XMLHttpRequest();
x.open('GET',`https://${$[2]}/api/v1/${$._.service}/user/${$._.user}/profile`,false);
x.send();
n=JSON.parse(x.responseText).name;
}catch(e){}
}
this.CNT.filename=(n||$._.user).replace(/[^\w.-]/g,'_')+' - '+$._.title?.replace(/[^\w.-]/g,'_')||'';
return res