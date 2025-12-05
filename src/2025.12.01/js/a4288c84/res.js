kick_json=JSON.parse($._)
kick_clip_playlist=kick_json.clip.video_url
if(!/\.m(?:3u8|pd)\b/.test(kick_clip_playlist))return kick_clip_playlist
this.TRG.IMGS_ext_data = [
  '//' + 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"></svg>',
  `<imagus-extension type="videojs" url="${kick_clip_playlist}"></imagus-extension>`
]
return {loop:'imagus://extension'}