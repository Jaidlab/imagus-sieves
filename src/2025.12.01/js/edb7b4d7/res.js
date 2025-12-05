const use_sidebar = true

$=JSON.parse($._.match(/__INITIAL_STATE__\s*=\s*({.+?})<\//)[1].replace(/:undefined/g,':""')).note.noteDetailMap[$[1]].note;
const t=[$.title,$.user?.nickname,new Date($.time).toLocaleDateString(),$.desc].filter(Boolean).join(use_sidebar?'\n':' | ');
$=($.video?.media?.stream?.h264||$.imageList||[]).map((i,n)=>[i.urlDefault||i.masterUrl,!n?t:'']);
if(use_sidebar){
$[0][1]=`<imagus-extension type="sidebar">${t}</imagus-extension>`;
this.TRG.IMGS_ext_data=$;
}
return use_sidebar?{loop:'imagus://extension'}:$