let m, t;
if(m=!$[3]&&$[2]==='user'&&$._.match(/slideshow\.open\(([^\)]+)\)/)?.[1].split(', ').slice(-3))return {loop:`https://${$[1]}js/ssLoad/${m[0]}/${m[1]}/${m[2]}/?&${Date.now()}-xml`};
if($[4]){
m=this._photo_i_ua_imgs||[];
let id=$[4], n=Number($[5])+4||3, o=$._.match(/'(?:last|photos)': '(\[.+?\])'/)?.[1].replace(/\\/g,'');
o=o?JSON.parse(o):[];
o.forEach(i=>m.push([i.src,i.desc]));
if(o.length===4){
this._photo_i_ua_imgs=m;
return {loop:`https://${$[1]}js/ssLoadMore/${id}forward/${n}/?&${Date.now()}-xml`};
}
delete this._photo_i_ua_imgs;
return m;
}
m=$._.match(/\sbsrc="([^"]+)/)?.[1]||$._.match(/"viewer_image">[^>]+?src="([^"]+)/)?.[1], t=$._.match(/"og:description" content="([^"]+)/)?.[1]||'';
return m ? [m,t] : ''