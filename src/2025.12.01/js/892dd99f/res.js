const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
const media_pk = [...$[1]].reduce((a, v, i) => a + BigInt(alphabet.length ** ($[1].length - i - 1) * alphabet.indexOf(v)), 0n)
const x = new XMLHttpRequest()
x.open('GET', `https://i.instagram.com/api/v1/media/${media_pk}/info/`, false)
x.setRequestHeader('X-IG-App-ID', '936619743392459')
if (!/firefox/i.test(navigator.userAgent)) {
  x.withCredentials = true
}
x.send()
if (x.status !== 200) {
  return [ 'data:image/svg+xml,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" height="120" width="360" style="background-color: #2a2a2a;">
      <foreignObject height="100%" width="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display: table; height: 100%; width: 100%;">
          <span style="color: tomato; display: table-cell; font: 18px sans-serif; vertical-align: middle; text-align: center; white-space: pre-wrap;">
            Something went wrong\nHTTP status ${x.status}: ${x.statusText}
          </span>
        </div>
      </foreignObject>
    </svg>`.replace(/\n\s+/g, '')), ' ' ]
}
const item = JSON.parse(x.responseText).items[0]
const capt = [
  `@${item.user.username}${item.user.full_name ? ` (${item.user.full_name})` : ''}`,
  new Date(item.taken_at * 1000).toLocaleString(navigator.language, { dateStyle: 'medium', timeStyle: 'medium' }),
  item.caption?.text
].filter(Boolean).join(' | ')
const res = (i) => [ i.video_versions?.[0].url || i.image_versions2.candidates[0].url, capt ]
return item.carousel_media?.map((e) => res(e)) || res(item)