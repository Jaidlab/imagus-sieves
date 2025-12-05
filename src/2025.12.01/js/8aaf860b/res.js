const video=this._video_backup, album=this._album_backup;
delete this._video_backup;
delete this._album_backup;
if($[3]&&$[4]){
let array=$[4].split("!").map(i=>[i]), num=(array.findIndex(i=>RegExp(`${$[3]}`).test(i[0])))
this.TRG.IMGS_album=$[3];
this.stack[$[3]]=array;
this.stack[$[3]].unshift(1);
this.album(num);
return [[['','']]]
}
$=JSON.parse($._);
const t=(new Date($.created_at)?.toLocaleString().replace(/.+/,'[$&] ')||'')+($.text_raw||'');
if($.pic_infos){
$=Object.values($.pic_infos).slice(this._num);
delete this._num;
$=$.map((i,n)=>[i.video?.replace(/.+/,'$&#mp4')||i.largest?.url||i.large.url,!n?t:''])
if(this._imgId){
$=$.slice($.findIndex(i=>RegExp(`${this._imgId}`).test(i[0])));
$[0][1]=t
delete this._imgId;
}
return $
}
if($.mix_media_info?.items){
return $.mix_media_info?.items.map(i=>[i.media_info?.mp4_hd_url||i.data?.media_info?.mp4_hd_url||i.data?.video?.replace(/.+/,'$&#mp4')||i.data?.large?.url,t])
}
if($.page_info?.media_info){
$=$.page_info?.media_info;
const hd=Object.entries($).find(i=>/^mp4_\d+p_mp4$/.test(i[0]))?.[1]||'';
return [[[hd?.replace(/.+/,'#$&'),$.mp4_hd_url||''],t]]
}
$=video||album||'';
return $