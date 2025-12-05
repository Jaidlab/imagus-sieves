const max_resolution = 2160
const low_resolution_first = true

if($._[0]!=='[')return {loop:JSON.parse($._.match(/var flashvars_\d+\s*=\s*({.+?});/)[1]).mediaDefinitions.find(i=>i.format==='mp4').videoUrl}
$=JSON.parse($._).filter(i=>i.quality<=max_resolution)
return [[[(!low_resolution_first?'#':'')+$.pop().videoUrl,(!low_resolution_first?'':'#')+$[Math.floor($.length/2)]?.videoUrl]]]