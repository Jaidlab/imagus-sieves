const low_resolution_first = false

if($.base[0]==='d'){
const x=platform.firefox ? new content.XMLHttpRequest() : new XMLHttpRequest();
x.open('GET',$[0],false);
x.send();
$._=x.responseText;
}
if($[2]==='-videos')return {loop:$._.match(/"contentUrl":\s*"([^"]+)/)?.[1]||''};
let title = /<title>([^<]+)/gm.exec($._)[1];
function deobfuscate(r,t){let e=(r=r.split("/").splice(2))[5],n="",l="";l=n=e.substring(0,32);let o="";for(f="",g=1;g<t.length;g++)f+=parseInt(t[g])?parseInt(t[g]):1;for(s=parseInt(f.length/2),$=parseInt(f.substring(0,s+1)),(g=(_=parseInt(f.substring(s)))-$)<0&&(g=-g),f=g,(g=$-_)<0&&(g=-g),f+=g,f*=2,f=""+f,i=10,u="",g=0;g<s+1;g++)for(h=1;h<=4;h++)(a=parseInt(t[g+h])+parseInt(f[g]))>=i&&(a-=i),u+=a;o=u;for(var s=l,$=l.length-1;$>=0;$--){for(var _=$,u=$;u<o.length;u++)_+=parseInt(o[u]);for(;_>=l.length;)_-=l.length;for(var a="",b=0;b<l.length;b++)a+=b==$?l[_]:b==_?l[$]:l[b];l=a}return r[5]=e.replace(n,l),r.join("/")}
let videovars = /var flashvars = ({[\n].+});/gm.exec($._);
eval("videovars = "+videovars[1]);
let l = low_resolution_first, urls = [];
for(el in videovars){
   if(el.match(/^video.*?url\d?$/)){
      urls.push([deobfuscate(videovars[el], videovars.license_code)+'#mp4', videovars[el+'_text'] ? videovars[el+'_text'] : title]);
   }
}
return [[[(!l?'#':'')+urls[urls.length-1][0],(l?'#':'')+urls[0][0]]]];