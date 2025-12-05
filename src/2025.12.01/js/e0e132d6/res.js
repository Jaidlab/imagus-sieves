$=JSON.parse($._).thread?.post;
if(!$.embed)return '';
const t=$.record?.text;
$=$.embed;
if($.playlist){
this.TRG.IMGS_ext_data=['//data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"></svg>',`<imagus-extension type="videojs" url="${$.playlist}"></imagus-extension>${t}`];
return {loop:'imagus://extension'}
}
return $.images?.map((i,n)=>[['#'+i.fullsize,i.thumb],[!n&&t,i.alt].filter(Boolean).join(' | ')])||$.external?.uri&&[$.external.uri,$.external.title||'']||''