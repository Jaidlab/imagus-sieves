if($[1]==='video'){
const max_resolution = 1080 // <- Set maximum video resolution
let x = new XMLHttpRequest()
x.open('Get','https://cdn.jwplayer.com/v2/media/'+$._.match(/data-media-id="([^"]+)/)[1],false)
x.send()
x = JSON.parse(x.responseText).playlist[0]
const t = [x.title,x.description].filter(Boolean).join(" | ")
x = x.sources
x = x.filter(i=>i.type==='video/mp4'&&i.height<=max_resolution).sort((a,b) => b.height-a.height)
return [[['#'+x.shift().file,x.filter(i=>i.height<=540)[0]?.file],t]]
} else {
let m = [...new Map([...$._.matchAll(/<img class="Image" alt="([^"]+)"\s*data-flickity-lazyload-srcset="[^?]+\?url=([^\s"]+)/g)].map(i=>[i[2].replace("https%3A%2F%2F","https://").replaceAll("%2F","/"),i[1]]))]
if(m&&m.length)m.unshift(m.splice(m.findIndex(i=>i[0]===($._.match(/"ImageObject","height":\d+,"url":"[^?]+\?url=([^"]+)/)||[,''])[1].replace("https%3A%2F%2F","https://").replaceAll("%2F","/")),1)[0])
if(!(m&&m.length)){
m = /"og:image" content="[^?]+\?url=([^"]+).+?"og:image:alt" content="([^"]+)/gs.exec($._)
m = m ? [m[1].replace("https%3A%2F%2F","https://").replaceAll("%2F","/"),m[2]] : ''
}
return m
}