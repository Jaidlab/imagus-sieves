const n=this.node;
if((location.pathname?.startsWith('/maps/')&&/\d:\d{2}$/.test(n.offsetParent?.offsetParent?.querySelector('div[class^="fontLabelMedium "]')?.innerText||''))||(location.hostname.slice(0,14)==='photos.google.'&&n.parentNode?.parentNode?.querySelector('svg[aria-hidden="true"]'))){
return '#'+$[0].replace(/=.+/,'=m37')+'#mp4\n#'+$[0].replace(/=.+/,'=m22')+'#mp4\n'+$[0].replace(/=.+/,'=m18')+'#mp4\n'+$[0].replace(/=.+/,'=s0')
}
var c=$[3]&&$[3].match(/-?(?:Ic\d\d|mo)/); c=c&&('-'+c[0])||'';
return /youtube\.com$/.test(location.hostname)&&n.closest('ytd-post-multi-image-renderer') ? (n.closest('ytd-post-multi-image-renderer')?.querySelector('a[href^="/post/"]')?.href||'ytgallery/album'+$[1]) : $[5] ? $[1] + $[5] : '#' + $[1] + ($[6] ? $[6] + '=' : $[2]) + (c?'s1600'+c:'s0') + ($[4]||($[6]?'':'/')) + '\n' + $[1] + ($[6] ? $[6] + '=' : $[2]) + 's1024' + c + ($[4]||($[6]?'':'/'))