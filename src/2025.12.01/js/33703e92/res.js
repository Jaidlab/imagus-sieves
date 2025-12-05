const access_token = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' // <- Put Access token here.

if(/^data:/.test($.url[0])){
if(access_token&&!/^x+$/.test(access_token)&&/sankaku(?:complex\.com|\.app)\//.test(this.node.baseURI)){
const x = new XMLHttpRequest();
x.open('Get','https://capi-v2.sankakucomplex.com/posts?lang=en&page=1&limit=1&tags=id_range:'+$[1],false);
x.setRequestHeader("Authorization","Bearer "+access_token);
x.send();
$._=x.responseText;
if(x.status!==200||!/sample_url/.test(x.responseText)){
this.no_auth = true
return {loop:$[0]}
}
}else{
this.no_auth = true
return {loop:$[0]}
}
}
console.log($._)
let meta = document.querySelector('head > meta[name="referrer"]');
if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'referrer';
    meta.content = 'same-origin';
    document.getElementsByTagName('head')[0].appendChild(meta);
} else if (meta.attributes.content.value !== 'same-origin') {
    meta.attributes.content.value = 'same-origin';
}
let url;
//if set to false, the largest possible media will be selected rather as opposed to web optimized media
let prefer_lowres=true;
if(prefer_lowres){
 url = ($._.match(/(?:(?:sample|file)_url": ?|(?:Original:\s+<a\s+|id="(?:low|high)res"[^<>]+)href=)"([^"]+)/) || [])[1];
}else{
 url = ($._.match(/(?:file_url":"?|(?:Original:\s+<a\s+|id="highres"[^<>]+)href=")([^(,")]+)/) || [])[1];
}
return [url];