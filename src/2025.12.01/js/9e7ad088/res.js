const high_res_first = true

this.pageId=$[1]
if($._[0]==='{')this.json=JSON.parse($._).images
if(!this.json)return ''
if(/one!$/.test($[0])){let m = this.json.find(i=>RegExp(`${$[2]}`).test(i.directUrl))
return [[[(high_res_first?'#':'')+m.thumbnails[m.thumbnails.length-1].url,(high_res_first?'':'#')+m.thumbnails.toReversed().filter(i=>i.height<=1000)[0]?.url]]]
}
return this.json?.map(i=>[[(high_res_first?'#':'')+i.thumbnails[i.thumbnails.length-1].url,(high_res_first?'':'#')+i.thumbnails.toReversed().filter(i=>i.height<=1000)[0]?.url]])??''