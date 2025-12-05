const json = JSON.parse($._);
const res = json.qualities?.auto.length?[json.qualities.auto[0].url,json.title]:''
this.TRG.IMGS_ext_data = [
  '//' + 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720"></svg>',
  `<imagus-extension type="videojs" url="${res}"></imagus-extension>${json.title} | ${json.owner.screenname}`
]
return res.length ? {loop:'imagus://extension'} : ''