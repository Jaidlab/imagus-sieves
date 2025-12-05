let m,o=$._;

if(m=o.match(/src="[^"]+(\.webcaster\.pro\/)iframe\/feed(\/[^?]+)/))return {loop:'//bl'+m[1]+'media'+m[2]+'.m3u8'};

if(m=o.match(/href="(https:\/\/vk(?:video\.ru|\.com)\/video[^"]+)/))return {loop:m[1].replace(/_ext.php\?oid=([^&]+)&(?:amp;)?id=([^&]+).*/,'-$1_$2')};

m=[...o.matchAll(/data-telegram-post="([^"]+)/g)];
if(m?.length)return {loop:m.map(i=>'//t.me/'+i[1]).join('!')};

if(m=o.match(/"sb-iframe" src="([^"]+)/)?.[1]?.replace(/&amp;/g,'&')){
const l=this.find({href:m});
if(l!==false&&l!=='')return {loop:m};
this.TRG.IMGS_ext_data=[['',`<imagus-extension type="iframe" url="${m}"></imagus-extension>`]];
return {loop:'imagus://extension'};
}

return [...o.matchAll(/data-hight-src="([^?"]+)(?![^"]*"><picture>)/g)].map(i=>[i[1]]);