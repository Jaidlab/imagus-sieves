//if set to false, the largest possible media will be selected rather as opposed to web optimized media
let prefer_lowres = false;

if($._[0]!=='{'){
const access_token=/sankakucomplex\.com$/.test(location.hostname)&&document.cookie.match(/(?:^|;\s*)accessToken=([^;]+)/)?.[1];
if(/^data:/.test($.url[0])){
if(access_token&&/sankakucomplex\.com$/.test(location.hostname)){
const x=new XMLHttpRequest();
x.open('GET','https://capi-v2.sankakucomplex.com/posts?lang=en&page=1&limit=1&tags=id_range:'+$[1],false);
x.setRequestHeader("Authorization","Bearer "+access_token);
x.send();
$._=x.responseText;
if(x.status!==200||!/file_url/.test(x.responseText)){
this.no_auth = true
return {loop:$[0]}
}
}else{
this.no_auth = true
return {loop:$[0]}
}
}
}
let meta = document.querySelector('head > meta[name="referrer"]');
if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'referrer';
    meta.content = 'same-origin';
    document.getElementsByTagName('head')[0].appendChild(meta);
} else if (meta.attributes.content.value !== 'same-origin') {
    meta.attributes.content.value = 'same-origin';
}
let lowres_url, highres_url, plr=prefer_lowres;
lowres_url = $._.match(/(?:(?:Resized: <a|<a id="lowres"[^>]+?) href=|sample_url": ?)"([^"]+)/)?.[1];
highres_url = $._.match(/(?:(?:Original: <a|<a id="highres"[^>]+?) href="|file_url":"?)([^(,")]+)/)?.[1];
return highres_url||lowres_url ? [[[(plr?'':'#')+highres_url, (plr?'#':'')+lowres_url]]] : '';