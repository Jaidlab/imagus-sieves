const o = JSON.parse($._.match(/window.ASSET = ({.+?);/)[1]).streamUrls
if(o.mp4){
return o.mp4
}else{
this.TRG.IMGS_ext_data = [
  '//' + 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"></svg>',
  `<imagus-extension type="videojs" url="${o.hls}"></imagus-extension>`
]
return {loop:'imagus://extension'}
}