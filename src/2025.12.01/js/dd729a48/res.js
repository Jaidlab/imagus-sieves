const n=this.node, s=n.src||n.currentSrc
const upgrade=url=>{
try{
const x=new XMLHttpRequest(), newUrl=url.replace(/\/s\d+x\d+\//,'/s999999999x999999999/')
if(url===newUrl||url.includes('.gifv'))return url
x.open('GET',newUrl,false)
x.setRequestHeader('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8')
x.send()
return x.responseText.match(/"requestedImage":"([^"]+)/)[1]
}catch(e){
return url
}
}
if($[5])return upgrade($[5])
$=JSON.parse($._)
if($.meta.status!=200)return s ? upgrade(s) : ''
$=$.response.posts[0]
var t=$.caption||''
$=$.body ? [...new DOMParser().parseFromString($.body,'text/html').querySelectorAll('img,source')].map((i,n)=>[i.srcset?upgrade(i.srcset?.split(/\s+\d+w(?:,\s+)?/).filter(Boolean).pop()):i.src,!n?t:'']) : $.photos ? $.photos.map((i,n)=>[upgrade(i.original_size?.url),!n?t:'']) : $.video_url ? [$.video_url,t] : $.permalink_url ? {loop:$.permalink_url} : s ? upgrade(s) : ''
const idx=s&&Array.isArray($)&&$.findIndex(([i])=>s.slice(11,80)===i.slice(11,80))
return idx>0 ? {"":$,idx:idx} : $