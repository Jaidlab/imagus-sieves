const u='https://thumb.cloud.mail.ru/weblink/thumb/xw'
$=JSON.parse($._.match(/cloudSettings=({.+?})<\//)[1].replace(/,"FOOTER":.+?\/footer>"/,'').replace(/\\x3c/g,'\\\\x3c')||'{}').params
if(/\.(?:3g[2p]|a(?:mv|sf|vi)|drc|f(?:lv|4[vpab])|gifv?|m[42ko]v|mng|mp[g42ev]|mpeg|m2?ts|ts|mxf|nsv|og[vg]|r(?:m(?:vb)?|oq)|svi|v(?:iv|ob)|w(?:ebm|mv)|yuv)$/i.test($?.serverSideFolders?.name||'')){
this.TRG.IMGS_ext_data = [
  '//' + 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"></svg>',
  `<imagus-extension type="videojs" url="${$?.DISPATCHERS.videowl_view.url}/0p/${btoa($.serverSideFolders.weblink)}.m3u8?double_encode=1"></imagus-extension>`
]
return {loop:'imagus://extension'}
}
const t=`<imagus-extension type=""></imagus-extension>` // This is needed to fix a bug where [Extension] sometimes interferes with albums.
$=$?.serverSideFolders
return $?.list?$.list.map(i=>[['#'+u+'1/'+i.weblink,u+'0/'+i.weblink],t]):$?.weblink?[[['#'+u+'1/'+$.weblink,u+'0/'+$.weblink]]]:''