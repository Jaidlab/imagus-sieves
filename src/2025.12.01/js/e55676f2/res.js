const max_images = 300 // Maximum number of images in album. Lower number loads faster.

let vk_data = this.vk_data || {}, n=this.node, m;
delete this.vk_data;
const getVid=u=>{
let x=new XMLHttpRequest()
x.open('POST','https://vk.com/al_video.php?act=show',false);
x.setRequestHeader('content-type','application/x-www-form-urlencoded');
x.setRequestHeader('x-requested-with','XMLHttpRequest');
x.send(`act=show&al=1&video=${u.match(/\/video([\d_-]+)/)[1]}`);
x=JSON.parse(x.responseText).payload[1][4].player?.params?.[0];
return Object.entries(x).filter(i=>/^url\d+/.test(i[0])).pop()[1]+'#mp4'
}
if($[1]){
const t=[...$._.matchAll(/"photo_\d+":"(https:\\\/\\\/sun[\-0-9]+\.userapi\.com\\\/(?:s\\\/v1\\\/i\w\d\\\/[^.]+\.jpg\?quality=\d+&crop=(?:\d+,?)+&as=(?:(\d+x\d+),?)+&ava=\d&u=[^&]+&cs=|impf\\\/[^"]+))[^"]*/g)].pop();
return t?.length?t[2]?t[1].replace(/\\/g,'')+t[2]:t[1]:''
}
if($[2])return $._.match(/"docUrl":"([^"]+)/)?.[1].replace(/\\/g,'')
if($[9]&&$.base[0]==='d'){
const m=$[10].split('!'), n=m.indexOf($[9]);
return {"":m.map(i=>[/\/video/.test(i)?getVid(i):i.replace(/=(\d+x\d+)$/,'='+i.match(/&as=(\d+x\d+,?)+/)?.[1])]),idx:n<0?0:n}
}
if(m=$[6]&&(/^vkitImageSingle__image--\w+ vkitOverlay__root--\w+$/.test(n.getAttribute('class'))||/^vkitMediaGridImage__image--\w+ vkitOverlay__root--\w+$/.test(n.getAttribute('class')))&&n.closest('[class="vkitBaseGallery__layer--JNMtq"],[class="vkitMediaGrid__root--FEt3Y vkitMediaGridTwoRows__root--ItwHW"],[class="vkuiCarouselBase__layer"],[class="post_info"]')){
m=[...m.querySelectorAll('[class^="vkitImageSingle__image--"][class*="vkitOverlay__root--"],[class^="vkitMediaGridImage__image--"][class*="vkitOverlay__root--"]')].sort((a,b)=>/\/video/.test(a.parentNode?.href) ? 0 : -1)
if(m.length>1)return m.map(i=>[/\/video/.test(i.parentNode?.href)?getVid(i.parentNode?.href):i.src?.replace(/=(\d+x\d+)$/,'='+i.src.match(/&as=(\d+x\d+,?)+/)?.[1])])
}
if($[6]&&$.base[0]==='d')return {loop:$[0].replace('?','&')}
if(!$[7]&&$[8]&&!vk_data.album?.length){
$=JSON.parse($._.slice($._.indexOf('{'))).payload[1][3].find(i=>$[8]===i.id);
return $&&($.w_src||$.z_src||$.y_src||$.x_src)
}
if($[3]||$[4]||$[6]||$[7]||$[8]){
let s, has_video=false;
vk_data.vids=vk_data.vids||[...n.closest('.post_content,post_info')?.querySelectorAll('div[class^="vkitOverlay__root--"]>a[data-video],a[class^="vkitInteractiveWrapper__root--"][href*="video"]')||[]];
vk_data.vid_length=vk_data.vid_length||vk_data.vids.length;
vk_data.vid_num=vk_data.vid_num||0;
vk_data.num;
vk_data.gallery_length=vk_data.gallery_length||n.closest('.post_content')?.querySelectorAll('div[class^="PhotoPrimaryAttachment__"]')?.length;
vk_data.album=vk_data.album||[];
vk_data.loop_stop=vk_data.loop_stop||0;
vk_data.loop_stop++;
if(this.enable_on_video&&$[3]||($[6]&&(n.getAttribute('data-list')||n.parentNode?.getAttribute('data-video')||n.parentNode?.className==='lnk'||n.className==='MediaGrid__imageElement'))&&!/al_photos\.php/.test($.url[0])){
has_video=true;
$=JSON.parse($._.match(/var playerParams = ({.+?});/)?.[1]||$._.match(/'al_video\.php[^[]+(.+])\)/)?.[1]||'{}');
$=($[4]?.player?.params||$.params)?.[0]||[];
if($.extra_data)return {loop:'https://www.youtube.com/embed/'+$.extra_data};
$=Object.entries($).filter(i=>/^url\d+$/.test(i[0])).map(i=>i[1]).reverse();
if($?.length)vk_data.album.push([['#'+$[0]+'#mp4',$[Math.floor($.length/2)]+'#mp4']])
}else{
const l=$[4]||$[7], src=$[8];
$=JSON.parse($._.slice($._.indexOf('{'))).payload[1];
s=$[1];
$=$[3]||[];
vk_data.num=n.nodeName==='IMG'&&$.findIndex(i=>i.id===src);
const id=$.length?$[$.length-1].id:'';
$=$.flatMap((i,n)=>!vk_data.album.some(x=>x[0][1]===(i.z_src||i.y_src||i.x_src))?[[[(i.w_src?'#'+i.w_src:''),(i.z_src||i.y_src||i.x_src)]]]:[]);
if(vk_data.gallery_length===1)$=[$[4]];
vk_data.album.push(...$);
if((!vk_data.gallery_length||vk_data.gallery_length>1)&&vk_data.album.length<s&&vk_data.album.length<max_images&&$.length>0&&vk_data.loop_stop<150){
this.vk_data=vk_data;
return {loop:'//vk_album/'+(l?l+'!':'')+id}}
}
const vid=(vk_data.vids[vk_data.vid_num]?.getAttribute('data-video')||vk_data.vids[vk_data.vid_num]?.getAttribute('href')?.match(/\/video([\w-]+)/)?.[1])?.split('_');
vk_data.vid_num++;
if(this.enable_on_video&&vid){
this.vk_data=vk_data;
return {loop:'https://vk.com/video_ext.php?oid='+vid[0]+'&id='+vid[1]}
}
$=vk_data.album;
return vk_data.num ? {"":$,idx:vk_data.num} : $
}
$=JSON.parse($._.match(/{"zFields"[^\)]+/)[0])?.zOpts?.temp;
return $&&($.w||$.w_||$.z||$.z_||$.y||$.y_||$.x||$.x_) ? [[[($.w||$.w_)&&'#'+($.w||$.w_),($.z||$.z_||$.y||$.y_||$.x||$.x_)?.[0]]]] : !1