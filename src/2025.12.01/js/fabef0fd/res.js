if(this.use_reddit_MP4){
var v=0,u,m=$._.match(/width="\d+">\s*<BaseURL>([^<]+)/g)
if(!m)return m
m.forEach(function(m){
 m=m.match(/"(\d+)">[^>]+>(.+)/)
 if(m[1] > v) {v=m[1]|0; u=m[2]}
})
return (/^https:\/\//.test(u)?u:'//v.redd.it'+$[1]+'/'+u)+'#mp4'
}
this.TRG.IMGS_ext_data = [
  '//' + 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720"></svg>',
  `<imagus-extension type="videojs" url="https://v.redd.it${$[1]}/DASHPlaylist.mpd"></imagus-extension>${this.TRG.IMGS_caption}`
]
return {loop:'imagus://extension'}