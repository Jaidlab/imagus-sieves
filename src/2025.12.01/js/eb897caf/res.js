const lower_quality_first = false

const xhr = new XMLHttpRequest()
xhr.open('GET', `https://www.instagram.com/p${$[1]}/`, false)
xhr.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8')
xhr.send()
const item = JSON.parse(xhr.responseText.match(/xdt_api__v1__media__shortcode__web_info":(.+)},"extensions/)[1]).items[0]
const l = cfg.hz.hiRes&&lower_quality_first
let user = item.user.username, media = item.carousel_media?.[0]||item
media = item.video_versions?.[0]?.url || item.image_versions2?.candidates?.[0]?.url
this.CNT.filename = (user + '_' + media?.match(/\/([^\/.]+)\.\w{3,4}(?:$|\?)/)?.[1]||'').replace(/[^\w.-]/g,'_')
const capt = [
  `@${item.user.username}${item.user.full_name ? ` (${item.user.full_name})` : ''}`,
  new Date(item.taken_at * 1000).toLocaleString(navigator.language, { dateStyle: 'medium', timeStyle: 'medium' }),
  item.caption?.text
].filter(Boolean).join(' | ')
const res = (i) => [ i.video_versions?.[0].url || [(l?'':'#')+i.image_versions2.candidates[0].url, (l?'#':'')+i.image_versions2.candidates.toReversed().filter(i => i.height > 600 && i.height !== i.width)?.[0]?.url], capt ]
return item.carousel_media?.map((e) => res(e)) || [res(item)]