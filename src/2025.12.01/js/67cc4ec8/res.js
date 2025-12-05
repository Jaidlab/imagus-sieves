const use_mp4 = true; // <- Set to true for mp4 video, false for HLS.
if(!use_mp4){
$=$._.match(/html5player\.setVideoHLS\('([^']+)/)?.[1]||''
this.TRG.IMGS_ext_data = [
  '//' + `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480"></svg>`,
  `<imagus-extension type="videojs" url="${$}"></imagus-extension>`
]
return $?{loop:'imagus://extension'}:''
}
return $._.match(/setVideoUrlHigh\(["']([^"']+)/)?.[1]||''