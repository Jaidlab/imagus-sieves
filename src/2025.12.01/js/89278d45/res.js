if($[2]){
this.TRG.IMGS_ext_data=[...$._.matchAll(/data-src="([h\/][^"]+)/g)].map(i=>!/\/\/video\.tophotels\.ru|\.mp4\b/.test(i[1])?['',`<imagus-extension type="iframe" url="${i[1].replace(/^\/\//,'https://')}"></imagus-extension>`]:[i[1]+'#mp4','']);
return {loop:'imagus://extension'}
}
$=JSON.parse($._).items||[];
return $.map(i=>[i.src,i.description])