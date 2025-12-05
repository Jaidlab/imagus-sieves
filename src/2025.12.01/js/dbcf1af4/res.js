if($[1]==='u'){
const hosts=$._.match(/arrFileHost = \["([^\]]+)"\]/)?.[1].split('","')
return [...new DOMParser().parseFromString($._,"text/html").querySelectorAll('div[class^="item file video-item"],div[class^="item file audio-item"],div[class^="item file image-item"]')].map(i=>{const id=i.attributes.file_hash.value;return ['//'+hosts[Math.floor(Math.random()*hosts.length)]+(i.classList[2]==='video-item'?'/thumb_video/'+id+'.mp4':i.classList[2]==='audio-item'?'/down.php?i='+id+'#mp3':'/thumb_show.php?i='+id)]})
}
const host=$._.match(/arrFileHost = \["([^"]+)/)?.[1]||''
const type=$._.match(/arrFileTypes = \["([^"]+)/)?.[1]||''
if(host){
if(type==='video')return '//'+host+'/thumb_video/'+$[2]+'.mp4'
if(type==='audio')return '//'+host+'/down.php?i='+$[2]+'#mp3'
return $._.match(/"og:image" content="([^"]+)/)?.[1]||''
}
return ''