if($[1]){
let m=$._.match(/{"versionId":"([^"]+)/);
this.bbc_desc=$._.match(/name="description" content="[^"]+/)?.[1]||''
return m?{loop:'https://open.live.bbc.co.uk/mediaselector/6/select/version/2.0/mediaset/pc/vpid/'+m[1]}:''
}
this.TRG.IMGS_ext_data=['//data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540"></svg>',`<imagus-extension type="videojs" url="${JSON.parse($._).media[1].connection[0].href}"></imagus-extension>${this.bbc_desc}`]
return {loop:'imagus://extension'}