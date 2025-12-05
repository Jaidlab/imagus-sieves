var y, l, x=this.node, p=x&&x.parentNode;

if (location.hostname==='vk.com'&&x) {
  if ((y=x.getAttribute('onclick')||p.getAttribute('onclick')) && y.indexOf('showPhoto(')>0) {
    x=y.indexOf('temp')>0&&JSON.parse(y.match(/(\{.+\})/)[0]).temp;
    x=x&&(x.w ? '#' + x.w + '\n' : '') + (x.z || x.y || x.x);
    if(x?.length){
    return x;
    }
    y=y.match(/showPhoto\('([^']+)',\s*'([^']+)/);
    return /\/rev$/.test(y[2]) ? '//vk_album/'+y[1] : location.hostname+location.pathname+(location.search==='?own=1'?location.search+'&':'?')+'z=photo'+y[1]+'/'+y[2];
  }
  if(y=p.getAttribute('data-photo-id')){
    l=p.getAttribute('data-list-id');
    if(p.parentNode?.className==="PhotoPrimaryAttachment PhotoPrimaryAttachment--thinBorder PhotoPrimaryAttachment--inCarousel"){
       return '//vk_album/'+l+'!'+y;
    }
    return location.hostname+location.pathname+'?z=photo'+y+(l?'/'+l:'');
  }
if(y=p.href?.match(/photo(-\d+_\d+)/)?.[1]){
    if(l=(!/^vkitImageSingle__image--\w+ vkitOverlay__root--\w+$/.test(x.getAttribute('class'))||p.closest('div[class="vkuiCarouselBase__layer"],.post_info').querySelector('a[data-video]'))&&x.closest('.post_info')?.querySelector('div[class^="PostBottomAction PostBottomAction--transparent PostButtonReactions"]')?.getAttribute('data-reaction-target-object')){
    return '//vk_album/'+l+'!'+y;
    }
  }
  if(y=(/^vkitImageSingle__image--\w+ vkitOverlay__root--\w+$/.test(x.getAttribute('class'))||/^vkitMediaGridImage__image--\w+ vkitOverlay__root--\w+$/.test(x.getAttribute('class')))&&x.closest('[class^="vkitBaseGallery__layer--"],[class^="vkitMediaGrid__root--"][class*="vkitMediaGridTwoRows__root--"],[class="vkuiCarouselBase__layer"],[class="post_info"]')){
    y=[...y.querySelectorAll('[class^="vkitImageSingle__image--"],[class^="vkitMediaGridImage__image--"][class*="vkitOverlay__root--"]')].map(i=>/\/video/.test(i.parentNode?.href)?i.parentNode?.href:i.src);
if(y.length>1)return 'vk_gallery/https://'+$[0]+'!'+y.join('!')
  }
  if(y=p.getAttribute('id')==='pv_photo'){
    y=p.closest('[class="clear_fix pv_photo_wrap"]')?.querySelector('a[class^="like_btn share _share"]');
    l=y?.getAttribute('onclick')?.match(/'list':'([^']+)/)?.[1];
    y=y?.getAttribute('onmouseover')?.match(/this, 'photo([^']+)/)?.[1];
    if(l&&y)return '//vk_album/'+l+'!'+y;
  }
}
return $[4] ? $[1]+$[2]+$[3]+$[4] : $[0];