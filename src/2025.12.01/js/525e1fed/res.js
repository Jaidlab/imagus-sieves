const use_HLS = true // <- For sound with HLS player, set to true. For mp4 video without sound, set to false.

if($.base[0]==='d'){
const x=new XMLHttpRequest();
x.open('GET',$[0],false);
x.send();
$._=x.responseText;
}
const u = 'https://'+$[1];
let m, t;
if($[2]){
t = $._.match(/(?:"user_description">([^<]+)<.+?)?<label>(Karma)<\/label>[^<]+<label>(Created)<\/label>[^<]+<div>([^<]+)<\/div>[^<]+<div>([^<]+)<\/div>/s);
return [u+$._.match(/id="user_icon"\n?\s+src="([^"]+)/)?.[1].replace(/&#38;/g,'&'),[t[1],t[2]+': '+t[4],t[3]+': '+t[5]].filter(Boolean).join(', ')];
}
t = $._.match(/<div class="post_body">(?:\n\s+)?<!-- SC_OFF --><div class="md"><p>(.+?)<\/p>/s)?.[1]||'';
m = [...$._.matchAll(/<figure>[^<]+<a href="([^"]+)".+?<figcaption>[^<]+<p>([^<]*)<\/p>/gs)].map((i,n)=>[u+i[1].replace(/&#38;/g,'&'),[(!n?t:''),i[2]].filter(Boolean).join(' | ')]);
if(!m?.length)m = ($._.match(/"og:video" content="([^"]+)/)?.[1]||$._.match(/<a id="post_url" href="([^"]+)/)?.[1]||$._.match(/<a href="([^"]+)" class="post_media_image"/)?.[1])?.replace(/&#38;/g,'&').replace(/^\//,u+'/')||'';
if(use_HLS&&/vid\/[^/]+\/\d+\.mp4$/.test(m)){
m = m.replace(/vid(\/[^/]+\/)\d+\.mp4/,'hls$1HLSPlaylist.m3u8');
this.TRG.IMGS_ext_data = ['//data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480"></svg>',`<imagus-extension type="videojs" url="${m}"></imagus-extension>${t}`];
return 'imagus://extension'
}
return Array.isArray(m) ? m : [m,t]