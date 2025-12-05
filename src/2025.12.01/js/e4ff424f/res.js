if($[1]){
if(/serie/.test($[0]))return /data-program-id="/.test($._)?{loop:'https://tv.nrk.no/program/'+$._.match(/data-program-id="([^"]+)/)[1]}:''
const max_resolution = 1080; // <- Set highest resolution
let media = JSON.parse($._).playable?.assets[0].url
if(!media)return ''
const baseURL = media.match(/^(.+?\/)playlist/)[1]
var x = new XMLHttpRequest()
x.open('GET',media,false)
x.send()
let res = [...x.responseText.matchAll(/RESOLUTION=(\d+)x(\d+)[^\n]+\n([^\n]+)/g)].filter(i=>parseInt(i[2])<=max_resolution).sort((a,b)=>parseInt(b[2])-parseInt(a[2]))[0]
this.TRG.IMGS_ext_data = [
  '//' + `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="${res[1]}" height="${res[2]}"></svg>`,
  `<imagus-extension type="videojs" url="${baseURL+res[3]}"></imagus-extension>`
]
return res ? {loop:'imagus://extension'} : ''
}else{
return $[2].split('!').map(i=>[i])
}