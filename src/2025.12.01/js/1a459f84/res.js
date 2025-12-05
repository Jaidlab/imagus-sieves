if (location.hostname !== 'www.instagram.com') return null

const use_60fps_video = true // If set to true, uses a silent 60 fps video if available.

const elem = document.createElement('script')
elem.textContent = 'sessionStorage.setItem("__imagus_fb_dtsg", fb_dtsg); sessionStorage.setItem("__imagus_doc_id", require("PolarisPostRootQuery").params.id); document.currentScript.remove();'
document.head.appendChild(elem)
const fb_dtsg = sessionStorage.getItem('__imagus_fb_dtsg')
const doc_id = sessionStorage.getItem('__imagus_doc_id')
sessionStorage.removeItem('__imagus_fb_dtsg')
sessionStorage.removeItem('__imagus_doc_id')

const xhr = new XMLHttpRequest()
xhr.open('POST', 'https://www.instagram.com/api/graphql', false)
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
xhr.setRequestHeader('X-IG-App-ID', '936619743392459') // not required, just in case
xhr.send(`fb_dtsg=${encodeURIComponent(fb_dtsg)}&variables=%7B%22shortcode%22%3A%22${$[1]}%22%7D&doc_id=${doc_id}`)
console.log('Instagram data:',xhr.responseText)
const item = JSON.parse(xhr.responseText).data.xdt_api__v1__media__shortcode__web_info.items[0]

const capt = [
  `@${item.user.username}${item.user.full_name ? ` (${item.user.full_name})` : ''}`,
  new Date(item.taken_at * 1000).toLocaleString(navigator.language, { dateStyle: 'medium', timeStyle: 'medium' }),
  item.caption?.text
].filter(Boolean).join(' | ')
const res = (i) => [ use_60fps_video&&i.video_dash_manifest.match(/(?:frameRate=[^"]*"60[^"]*"\s+ sar=|-hfr_).+?<BaseURL>([^<]+)/)?.[1] || i.video_versions?.[0].url || i.image_versions2.candidates[0].url, capt ]

return item.carousel_media?.map((e) => res(e)) || res(item)