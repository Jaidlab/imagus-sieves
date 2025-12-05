const lower_quality_first = false // True displays lower quality image first. Show full size with image TAB
const hide_quality_message = false // True hides caption message about quality switch

var data = JSON.parse($._), l = cfg.hz.hiRes&&lower_quality_first, m = hide_quality_message;
return data.results[0].observation_photos.map(v=>[[(l?'':'#')+v.photo.url.replace(/square(\.\w+)$/,'original$1'), (l?'#':'')+v.photo.url.replace(/square(\.\w+)$/,'large$1')], v.photo.attribution+(l&&!m?' | Press TAB to switch to full size image':'')]);