const show_gallery_thumbs_as_album = true // Show posts with multiple thumbnail images as album
const truncate_album = true // Removes images before hovered thumbnail in album
const show_caption_with_video = true // Displays the caption with the video but is slower to load

const n=this.node, l=n.parentNode?.querySelector('video')?.src, h=n.closest('[class^=Feed_body_],.card-feed')?.querySelector('[class^=head-info_time],a[href][target="_blank"][suda-data$="click:wb_time"]')?.href?.match(/^[^?]+/)?.[0].replace('//','//imagus.');
if($[4]){
this._imgId=$[5];
return h?.replace(/(imagus)/,'$1album')
}
if(show_gallery_thumbs_as_album){
const m=show_gallery_thumbs_as_album&&[...n.closest('.wbpro-feed-content,div[class="media media-piclist"]')?.querySelectorAll('img[class*="_focusImg"],img[data-gifviedo=""],img[class="woo-picture-img"]')||[]].map(i=>[i.src?.replace(/\/(?:orj?|mw|thumb)\d+\//,'/original/')]);
this._num=m&&m.findIndex(i=>RegExp(`${$[3]}`).test(i[0]));
this._video_backup=l;
this._album_backup=m;
if(truncate_album)this._album_backup=this._album_backup.slice(this._num);
return l?.length ? show_caption_with_video&&h||l : m?.length>1 ? truncate_album&&h?.replace(/(imagus)/,'$1album')||'//weiboalbum/'+$[3]+'/'+m.join("!") : ($[2]=='mu' ? 'http://' : $[1]+'large/') + $[3]
}
return l||($[2]=='mu' ? 'http://' : $[1]+'large/') + $[3]