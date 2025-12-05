if(!((this.node.dataset || {}).ploi || (((this.node.parentNode || {}).dataset) || {}).ploi)){
const x=new XMLHttpRequest()
x.open('Get','https://www.facebook.com/' + ($[1] ? $[1] + $[2] : 'photo/?fbid=' + $[2]),false)
x.setRequestHeader("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8")
x.send()
$._=x.responseText
}
if($._===void 0)return this.node.dataset.ploi||this.node.parentNode.dataset.ploi
var u=$._.match(RegExp('='+($[2]||$[1])+'(?:[^">]+"\\s+)+?data-ploi="([^"]+)')) || $._.match(RegExp(',"image":{"uri":"(https:[^"]+)')) || $._.match(/="og:image" content="([^"]+)/)
return u && u[1].replace(/\\/g, '') || !1