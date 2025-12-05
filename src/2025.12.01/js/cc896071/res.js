const m=($._.match(/="og:video:secure_url" content="([^"]+)/)||[,''])[1]
const t=($._.match(/="og:title" content="([^"]+)/)||[,''])[1]
const h=($._.match(/video:height" content="(\d+)/)||[,''])[1]
const w=($._.match(/video:width" content="(\d+)/)||[,''])[1]
this.TRG.IMGS_ext_data = [
  '//' + `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"></svg>`,
  `<imagus-extension type="videojs" url="${m}"></imagus-extension>${t}!`
]
return m?{loop:'imagus://extension'}:''