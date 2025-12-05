// config options
var config = {
// change the display order of the image/videos by using 1, 2, 3, or 4. disable with 0
  order: {
    "thumb": 1,
    "native (360p)": 2,
    "hls (1080p/4K)": 3,
    "embed (360p-1080p)": 4
  },
  returnDislikes: true, // get dislikes and rating from ReturnYouTubeDislike.com
  useSidebar: true, // show description at the left of the thumbnail (Requires either thumbVideoInfo, nativeVideoInfo, or both to be set to true)
  useSmallerThumbnail: false, // use lower resolution thumbnail
  thumbVideoInfo: true, // display sidebar or detailed caption on thumbnail
  nativeVideoInfo: false, // display sidebar or detailed caption on native player
  showVerticalThumbnail: true, // true shows vertical thumbnails on vertical videos
  removeReferrer: false // if embed player is giving an error, true may fix it. Removing referrer may cause problems on YouTube when logged in.
}

fallback = (error) => {
  this.TRG.IMGS_ext_data = [['', `<imagus-extension type="iframe" url="https://youtube.com/embed/${$[1]}?${timeParam}"></imagus-extension>${error}`]]
  return { loop: 'imagus://extension' }
}

if(config.removeReferrer&&location.href.startsWith('https://www.youtube.com/')&&config.order['embed (360p-1080p)']){
let meta = document.querySelector('head > meta[name="referrer"]');
if (!meta) {
	meta = document.createElement('meta');
	meta.name = 'referrer';
	meta.content = 'no-referrer';
	document.getElementsByTagName('head')[0].appendChild(meta);
} else if (meta.attributes.content.value !== 'same-origin') {
	meta.attributes.content.value = 'no-referrer';
}
}

if(config.order['embed (360p-1080p)']&&!config.order.thumb&&!config.order['native (360p)']&&!config.order['hls (1080p/4K)'])return fallback()

var fL, fH, f = {}, g = false, cipher, decsig, o, vo, mfr, ps, basejs, hls, player_param, visit_id = $._.match(/"VISITOR_DATA":"([^"]+)/)?.[1]
var x = new XMLHttpRequest
window.imagusCache = window.imagusCache || {}

var timeParam = ($[3] ? 't=' + $[3] + ($[4] ? ',' + $[4] : '') + '&' : '')
var baseJsUrl = 'https://www.youtube.com' + JSON.parse($._.match(/\"[^\"]+player_[^\"]+\/base.js\"/)[0].replace(/(\/s\/player\/)([^\/]+)/,'$10004de42'))
if (window.imagusCache[baseJsUrl]) {
  basejs = window.imagusCache[baseJsUrl]
} else {
  try {
    x.open('GET', baseJsUrl, false)
    x.send()
    basejs = x.responseText
    window.imagusCache[baseJsUrl] = basejs
  } catch (e) {
    return fallback(this)
  }
}

const escapeRegExp = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const parseunthrottle = data => {
  const helper = [/'use strict';(var [A-Za-z0-9_$]+=["'][^\n]+?["']\.split\(["'][^\n]+?["']\)),/.exec(data)?.[1]||/'use strict';(var [A-Za-z0-9_$]+=\[.+?\]),[A-Za-z0-9_$]{1,3}[;,]/s.exec(data)?.[1], /[\n;,]((?:var [A-Za-z0-9_$]{1,3}=function.+?;\n\n?){5,})[A-Za-z0-9_$]{1,3}=function/s.exec(data)?.[1]].filter(Boolean).join('\n')
  const fnnameresult = /[A-Za-z0-9_$]=[A-Za-z0-9_$]\[[A-Za-z0-9_$]\[\d+\]\]\[[A-Za-z0-9_$]\[\d+\]\]\|\|null\)&&\([A-Za-z]=([^(]+?)(?:\[(\d+)\])?\([a-zA-Z0-9]\)/.exec(data)
  var fnname = fnnameresult[1]
  if (fnnameresult[2]) fnname = new RegExp('var ' + escapeRegExp(fnname) + '\\s*=\\s*\\[(.+?)\\][,;]').exec(data)[1].split(',')[parseInt(fnnameresult[2])]
  const _argnamefnbodyresult = new RegExp(escapeRegExp(fnname) + '=function\\(([^\\)]+)\\){(.+?return \\w(?:\\.join\\([^\\)]+|\\[[A-Za-z0-9_$]\\[\\d+\\]\\]\\([A-Za-z0-9_$]\\[\\d+\\])\\))};', 's').exec(data)
  const [_, argname, fnbody] = _argnamefnbodyresult
    return new Function([argname], helper + '\n' + fnbody.replace(/if\(typeof [a-zA-Z0-9\$_]+===[^\),;]+\)return \w;/,''))
}
try {
  var unthrottle = window.imagusCache[baseJsUrl + '_unthrottle'] || parseunthrottle(basejs)
  window.imagusCache[baseJsUrl + '_unthrottle'] = unthrottle
} catch(e) {
  console.error('Imagus: cannot parse unthrottle function. Error:', e)
}

function nt(s) {
  var u = new URL(s)
  var p = u.searchParams
  var n = p.get('n')
  if (!n) return s
  p.set('n', unthrottle ? unthrottle(n) : '')
  u.search = p.toString()
  return u.toString()
}

const getParam = (u='') => {
  try {
    x.open('GET', 'https://www.youtube.com/'+u+'#youtube_pp', false)
    x.send()
    var param = x.responseText.match(/"playerParams":"([^"]+)","playerExtra/)?.[1]
    this._yt_player_param_ = param
    return param
  } catch (e) {
    console.error('Failed to get player param',e)
    return null
  }
}
player_param = this._yt_player_param_

const api_key = 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8'
const client_ver = '2.20211221.00.00'
const sigtime = Number(basejs.match(/signatureTimestamp\s*:\s*(\d+)/)[1])
const vid = $[1]
function player_response(embed) {
  x.open('POST', 'https://www.youtube.com/youtubei/v1/%70%6C%61%79%65%72?imagus&key=' + api_key, false)
  x.setRequestHeader('Content-Type', 'application/json')
  if (player_param) x.setRequestHeader('X-Goog-Visitor-Id', visit_id)
  var data = {
    context: {
      client: {
        clientName: 'WEB',
        clientVersion: client_ver
      }
    },
    videoId: vid,
    playbackContext: {
      contentPlaybackContext: {
        signatureTimestamp: sigtime,
        html5Preference: 'HTML5_PREF_WANTS'
      }
    },
    contentCheckOk: true,
    racyCheckOk: true
  }
  if (embed === 'agegate') data.context.client.clientScreen = 'EMBED'
  if (embed === 'embed') data.context.client = { clientName: 'TVHTML5_SIMPLY_EMBEDDED_PLAYER', clientVersion: '2.0' }
  if (embed) data.context.thirdParty = { embedUrl: 'https://www.youtube.com/' }
  if (player_param) data.params = player_param
  x.send(JSON.stringify(data))
  o = JSON.parse(x.responseText)
  mfr = o.microformat || mfr
  ps = o.playabilityStatus
  return ps.status === 'OK'
}

function video_response(embed) {
  x.open('POST', 'https://www.youtube.com/youtubei/v1/%70%6C%61%79%65%72?imagus&key=' + api_key, false)
  x.setRequestHeader('Content-Type', 'application/json')
  if (player_param) x.setRequestHeader('X-Goog-Visitor-Id', visit_id)
  var data = {
    context: {
      client: {
        clientName: 'ANDROID',
        clientVersion: '20.10.38',
        userAgent: 'com.google.android.youtube/20.10.38 (Linux; U; Android 11) gzip',
        osName: 'Android',
        osVersion: '11',
      }
    },
    videoId: vid,
    playbackContext: {
      contentPlaybackContext: {
        signatureTimestamp: sigtime,
        html5Preference: 'HTML5_PREF_WANTS'
      }
    },
    contentCheckOk: true,
    racyCheckOk: true
  }
  if (embed === 'agegate') data.context.client.clientScreen = 'EMBED'
  if (embed === 'embed') data.context.client = { clientName: 'TVHTML5_SIMPLY_EMBEDDED_PLAYER', clientVersion: '2.0' }
  if (embed) data.context.thirdParty = { embedUrl: 'https://www.youtube.com/' }
  if (player_param) data.params = player_param
  x.send(JSON.stringify(data))
  vo = JSON.parse(x.responseText)
  ps = o.playabilityStatus
  return ps.status === 'OK'
}

function getDislikes(id) {
  try {
    x.open('GET', `https://returnyoutubedislikeapi.com/Votes?videoId=${id}`, false)
    x.send()
    return JSON.parse(x.responseText)
  } catch (e) { }
}

const prepResult = (res, content) => {
  // hls
  if(hls)res.push(['', `<imagus-extension type="videojs" url="${hls}"></imagus-extension>${title}`])
  // embeded player
  res.push(['', `<imagus-extension type="videojs" url="https://youtube.com/embed/${$[1]}?${timeParam}"></imagus-extension>`])

  if (config.useSmallerThumbnail) res[0][0] = res[0][0].replace('maxresdefault', '0')

  if (config.useSidebar) {
    content = content.replace(/https?:\/\/[\w\.\/?=&+@#\-]+/g, '<a href="$&" target="_blank">$&</a>')
    if(config.nativeVideoInfo&&fL?.length)res.find(i=>/\.googlevideo\.com\/videoplayback\?/.test(i[0]))[1] = `<imagus-extension type="sidebar">${content}</imagus-extension>`
    if(config.thumbVideoInfo)res.find(i=>/\.ytimg\.com\//.test(i[0]))[1] = `<imagus-extension type="sidebar">${content}</imagus-extension>`
  } else {
    content = content.replace(/https?:\/\/[\w\.\/?=&+@#\-]+/g, '')
    content = content.replace(/[\s\n]*\n[\s\n]*/g, ' | ')
    if(config.nativeVideoInfo&&fL?.length)res.find(i=>/\.googlevideo\.com\/videoplayback\?/.test(i[0]))[1] = content
    if(config.thumbVideoInfo)res.find(i=>/\.ytimg\.com\//.test(i[0]))[1] = content
  }
  var orderSort = Object.entries(config.order).filter(i=>i[1]>0).sort((a,b)=>a[1]-b[1]).map(i=>i[0])
  var ordered = orderSort.map(type => {
    switch (type) {
      case 'thumb':  return res[0]
      case 'native (360p)': return res[1] || res[2]
      case 'hls (1080p/4K)':    return res[2] || res[1]
      case 'embed (360p-1080p)':  return res[3] || res[2] || res[1]
    }
  })
  ordered.length = res.length
  ordered = ordered.filter(Boolean)
  this.TRG.IMGS_ext_data = ordered
  return { loop: 'imagus://extension' }
}

if (!player_param) {
  for (let i of [null, 'embed', 'agegate']) if (player_response(i)) break
  if (['ERROR', 'LOGIN_REQUIRED'].indexOf(ps.status) != -1) player_param = getParam()||getParam('results?search_query=z')
}

if (player_param) for (let i of [null, 'embed', 'agegate']) if (player_response(i)) break

if (['ERROR', 'LOGIN_REQUIRED'].indexOf(ps.status) != -1) return fallback('Failed to get thumbnail and video. Error: [' + ps.status + ', ' + ps.reason + ']. Using embed player as backup')
// [ps.errorScreen.playerErrorMessageRenderer.thumbnail.thumbnails[0].url, '[' + ps.status + ', ' + ps.reason + ']']

for (let i of [null, 'embed', 'agegate']) if (video_response(i)) break

var q = o.videoDetails, r = mfr.playerMicroformatRenderer
var title = q.title, lenSec = parseInt(q.lengthSeconds), sText = r.title.simpleText, thumbnail = r.thumbnail.thumbnails[0].url+'?noloop'
var ss = lenSec % 60, mm = (lenSec - ss) / 60 % 60, hh = (lenSec - ss - mm * 60) / 3600
var lenStr = (hh === 0 ? '' : hh + ':') + ('0' + mm).slice(-2) + ':' + ('0' + ss).slice(-2)
var rt = Number(q.averageRating)
var dl = config.returnDislikes ? getDislikes(q.videoId) : undefined
if (dl?.rating) {
  var colorShift = Math.round(120 * Math.max(0, dl.rating - 3) / 2) // rates from 0 to 3 will be red; from 3 to 5: scale from red to green
  var rateStyle = `background-color: hsl(${colorShift} 100% 31%); padding: 0 3px 0 1px; border-radius: 2px; color: white; line-height: 18px; display: inline-block`
  dl.rating = `<span style="${rateStyle}">&#11088;${Math.round(dl.rating * 20 * 10) / 10}%</span>`
}
var descr = [
  `<h3>${title}</h3>`,
  title !== sText && sText,
  'Author:\t<a href="//www.youtube.com/channel/' + q.channelId + '" target="_blank" style="color:white">' + q.author + '</a>',
  'Date:\t' + (r.publishDate ? new Date(Date.parse(r.publishDate)).toLocaleString() : ''),
  'Length:\t' + lenStr,
  'Views:\t' + (q.viewCount | 0).toLocaleString(),
  dl ? `Rating:\t${dl.rating}  | &#128077;&#127995;${dl.likes?.toLocaleString()}  | &#128078;&#127995;${dl.dislikes?.toLocaleString()} <br>(by returnyoutubedislike.com)` : '',
  '\n' + q.shortDescription
].filter(Boolean).join('\n')

if (ps.status !== 'OK') return prepResult([[thumbnail, '']], `<h3>${ps.status} - ${ps.reason}</h3><br>` + descr)

var fs = vo.streamingData.formats

if (config.showVerticalThumbnail&&fs?.[0]?.height > fs?.[0]?.width) {
  try {
    var oar_thumbnail
    for (let i of ['default', '2']) {
      oar_thumbnail = thumbnail.replace(/\/maxres[^.]+(\.[^?]+).*/, '/oar' + i + '$1')
      x.open('HEAD', oar_thumbnail, false)
      x.send()
      if (x.status == 200) {
        thumbnail = oar_thumbnail + '?noloop'
        break
      }
    }
  } catch (e) {}
}

if(Number(config.order['hls (1080p/4K)']) > 0 && visit_id){
  x.open('POST', 'https://www.youtube.com/youtubei/v1/%70%6C%61%79%65%72?imagus&key=' + api_key, false)
  x.setRequestHeader('Content-Type', 'application/json')
  x.setRequestHeader('X-Goog-Visitor-Id', visit_id)
  var hls_data = {
    context: {
      client: {
        clientName: 'IOS',
        clientVersion: '20.10.4',
        deviceModel: 'iPhone16,2',
        'userAgent': 'com.google.ios.youtube/20.10.4 (iPhone16,2; U; CPU iOS 18_3_2 like Mac OS X;)',
      }
    },
    videoId: vid,
    playbackContext: {
      contentPlaybackContext: {
        signatureTimestamp: sigtime,
        html5Preference: 'HTML5_PREF_WANTS'
      }
    },
    contentCheckOk: true,
    racyCheckOk: true
  }
  x.send(JSON.stringify(hls_data))
  hls = JSON.parse(x.responseText).streamingData?.hlsManifestUrl
  }
if (!fs) return prepResult([[thumbnail, '']], '<h3>No suitable formats to download, probably livestreaming</h3><br>' + descr)
fs.forEach(function (format) {
  if (format.url) { f[format.itag] = nt(format.url); return; }
  cipher = new URLSearchParams(format.signatureCipher)
  if (cipher.get('sig')) { f[format.itag] = `${cipher.get('url')}&signature=${cipher.get('sig')}`; return; }
  g = true
})
if (g) {
  try {
    descr = '*' + descr
    const parseDecsig = data => {
      if (data.startsWith('var script')) {
        // they inject the script via script tag
        const obj = {}
        const document = {
          createElement: () => obj,
          head: { appendChild: () => { } }
        }
        eval(data)
        data = obj.innerHTML
      }
      const fnnameresult = /=([a-zA-Z0-9\$_]+?)\(decodeURIComponent/.exec(data)
      const fnname = fnnameresult[1]
      const _argnamefnbodyresult = new RegExp(escapeRegExp(fnname) + '=function\\((.+?)\\){(.+?)}').exec(data)
      const [_, argname, fnbody] = _argnamefnbodyresult
      const helpernameresult = /;(.+?)\..+?\(/.exec(fnbody)||/;([A-Za-z0-9_$]+)/.exec(fnbody)
      const helpername = helpernameresult[1]
      const helperresult = new RegExp('var ' + escapeRegExp(helpername) + '={[\\s\\S]+?};').exec(data)
      const helper = helperresult[0]
      const helper2 = /'use strict';(var [A-Za-z0-9_$]+=["'][^\n]+?["']\.split\(["'][^\n]+?["']\)),/.exec(data)?.[1]||/'use strict';(var [A-Za-z0-9_$]+=\[.+?\]),[A-Za-z0-9_$]{1,3}[;,]/s.exec(data)?.[1]||''
      return new Function([argname], helper + '\n' + helper2 + '\n' + fnbody)
    }
    decsig = parseDecsig(basejs)
  } catch (ex) {
    decsig = () => { return }
    console.error(ex)
  }
  fs.forEach(function (format) {
    if (f[format.itag]) return
    cipher = new URLSearchParams(format.signatureCipher)
    f[format.itag] = nt(`${cipher.get('url')}&${cipher.get('sp') || 'signature'}=${decsig(cipher.get('s'))}`)
  })
}

fL = f[18] || f[59] || f[78] || f[46] || f[45] || f[44] || f[43] || f[37] || f[22]
fH = f[37] || f[22] || f[18] || f[59] || f[78] || f[46] || f[45] || f[44] || f[43] || fL
var ct = (timeParam ? '#' + timeParam : '') + '#mp4'

var res = [[thumbnail, title]]
if (fH) {
  fH = ['#' + fH + ct, fL + ct]
  res.push([fH, title])
}
return prepResult(res, descr)