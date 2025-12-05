// Valid options are:
// 1080p60, 720p60, 480p30, 360p30, 160p30. For quality selctor in player use null. It could vary by streamer.
const quality = null

const source=JSON.parse($._).source
const quality_playlist = quality ? quality + "/playlist.m3u8" : 'master.m3u8'
const vod_playlist = source.replace("master.m3u8", quality_playlist)
this.TRG.IMGS_ext_data = [
  '//data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"></svg>',
  `<imagus-extension type="videojs" url="${vod_playlist}"></imagus-extension>`
]
return {loop:'imagus://extension'}