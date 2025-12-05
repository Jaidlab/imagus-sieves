// debugger;
let show_videos = true;
let show_reviews_sidebar = true;

let asyncMode = false;
let hasVideo = false;
var r = [];
var that = this;

// show images only for global.wildberries.ru
if ($[1]) {
  show_videos = false;
  asyncMode = true;
}

const x = new XMLHttpRequest();
const cardInfoUrl = constructHostV2($[2], 'nm') + `/info/ru/card.json`;
x.open('GET', cardInfoUrl, asyncMode);
x.onloadend = function () {
  const info = JSON.parse(this.responseText);

  // fetch item photos
  // skip when triggered by feedback links or elements
  if (($[2] || $[3] == 'detail.aspx') && !$[4]?.includes('#Comments')
    && !that.TRG.className?.includes('product-review')
    && !that.TRG.className?.includes('product-product-review__rating')
    && !that.TRG.className?.includes('product-review__count-review'))
  {
    // const folder = 1e4 * Math.floor(info.nm_id / 1e4);
    if (info.media.has_video && show_videos) {
      // r.push([`https://video.wbstatic.net/video/new/${folder}/${info.nm_id}.mp4`, info.imt_name]);
      r.push(['', `<imagus-extension type="videojs" url="${urlVideoProduct(info.nm_id, "hls", "1440p")}"></imagus-extension>${info.imt_name}`]);
      hasVideo = true;
    }

    for (var i = 1; i <= info.media.photo_count; i++) {
      r.push([imageUrl(info.nm_id, 'big', i), info.imt_name]);
    }
  }

  const x2 = new XMLHttpRequest();

  // fetch feedback photos page by page
  x2.open('GET', `${feedbackDomain(info.imt_id)}/feedbacks/v1/${info.imt_id}`, asyncMode);
  x2.onloadend = function () {
    const resp = JSON.parse(this.responseText);

    // put current item's feedbacks first
    resp.feedbacks?.sort((a, b) => {
      return a.nmId === info.nm_id && b.nmId !== info.nm_id ? -1 :
             a.nmId !== info.nm_id && b.nmId === info.nm_id ? 1 :
             new Date(b.createdDate) - new Date(a.createdDate);
    });

    let fbTexts = [];
    resp.feedbacks?.forEach(f => {
      let text = [
        `<span class="s s${f.productValuation}">&#11088; ${f.productValuation}</span>`,
        f.nmId !== info.nm_id ? `ДРУГОЙ ВАРИАНТ` : '',
        f.text,
        f.pros ? '&#128077; ' + f.pros : '',
        f.cons ? '&#128078; ' + f.cons : '',
        f.createdDate.substring(0, 10),
      ].filter(Boolean).join(' | ');
      f.photo?.forEach(p => r.push([urlFeedbackPhoto(p), text]))

      if ((f.text || f.pros || f.cons) && fbTexts.length < 100) fbTexts.push(text);

      if (show_videos && f.video) {
        hasVideo = true;
        let [idx, id] = f.video.id.split('/');
        let vUrl = `https://videofeedback${String(idx).padStart(2, '0')}.wbbasket.ru/${id}/index.m3u8`;
        r.push(['', `<imagus-extension type="videojs" url="${vUrl}"></imagus-extension>${text}`]);
      }
    });

    if (r.length && !asyncMode && show_reviews_sidebar) {
      const fbIndx = r[0][1].startsWith('<imagus-extension') ? 1 : 0;
      const distr = resp.valuationDistributionPercent;
      const distrKeys = Object.keys(distr).reverse();
      r[fbIndx][1] =
        `<imagus-extension type="sidebar"><div>
          <style>
            #imagus-extension > div { display: flex; flex-direction: column; row-gap: 10px; padding-top: 6px; }
            #imagus-extension .valuation-distr { display: flex; }
            #imagus-extension .valuation-distr > * { padding: 4px 6px; border: 1px solid gray; margin: 0 -1px 0 0; text-align: right; }
            #imagus-extension p { border-bottom: 1px solid #80808080; padding-bottom: 6px; }
            #imagus-extension .s { padding: 2px 4px; border-radius: 4px; }
            #imagus-extension .s1 { background: #cb0000; }
            #imagus-extension .s2 { background: #d16c00; }
            #imagus-extension .s3 { background: #b99300; }
            #imagus-extension .s4 { background: #99b33a; }
            #imagus-extension .s5 { background: #1f8600; }
          </style>
          <div class="valuation">Оценка: &#11088; ${resp.valuation} &bull; ${resp.feedbackCount}</div>
          <div class="valuation-distr">
            <span>${distrKeys.map(k => `${k}&nbsp;&#11088;`).join('<br>')}</span>
            <span>${distrKeys.map(k => `${distr[k]}%`).join('<br>')}</span>
            <span>${distrKeys.map(k => `<progress max="100" value="${distr[k]}">${distr[k]}%</progress>`).join('<br>')}</span>
          </div>
          ${fbTexts.map(t => `<p>${t}</p>`).join('')}
        </div></imagus-extension>${r[fbIndx][1]}`;
    }

    if (r.length == 0) {
      r = false;

    } else if (!asyncMode) {
      that.TRG.IMGS_ext_data = r;
      r = { loop: 'imagus://extension' };
      if (!that.TRG.IMGS_c_resolved?.URL) {
        that.TRG.IMGS_c_resolved = { URL: that.TRG.href };
      }

    } else if (asyncMode && (that.TRG?.IMGS_ext_data?.length || r?.length)) {
      that.TRG.IMGS_album = $[0];
      that.stack[$[0]] = that.TRG?.IMGS_ext_data || r;
      that.stack[$[0]].unshift(1);
      that.album(0);
    }
  }
  x2.send();
}
x.send();

if (asyncMode) {
  return null
}

return r;

function urlFeedbackPhoto(e) {
  const n = parseInt(e, 10);
  return `${constructHostV2(n, "feedbackPhoto")}/photos/fs.webp`
}

function feedbackDomain(t) {
  const e = crc16Arc(t) % 100 >= 50 ? "2" : "1";
  return `https://feedbacks${e}.wb.ru`;
}

function imageUrl(id, size, number) {
  var i = parseInt(id, 10);
  var ext = "webp";
  var url = constructHostV2(i);
  return "".concat(url, "/images/").concat(size, "/").concat(null != number ? number : 1, ".").concat(ext)
}

function volHostV2(e) {
  let r;
  const n = ~~(e / 1e5);
  switch (!0) {
    case n >= 0 && n <= 143: r = "01"; break;
    case n <= 287: r = "02"; break;
    case n <= 431: r = "03"; break;
    case n <= 719: r = "04"; break;
    case n <= 1007: r = "05"; break;
    case n <= 1061: r = "06"; break;
    case n <= 1115: r = "07"; break;
    case n <= 1169: r = "08"; break;
    case n <= 1313: r = "09"; break;
    case n <= 1601: r = "10"; break;
    case n <= 1655: r = "11"; break;
    case n <= 1919: r = "12"; break;
    case n <= 2045: r = "13"; break;
    case n <= 2189: r = "14"; break;
    case n <= 2405: r = "15"; break;
    case n <= 2621: r = "16"; break;
    case n <= 2837: r = "17"; break;
    case n <= 3053: r = "18"; break;
    case n <= 3269: r = "19"; break;
    case n <= 3485: r = "20"; break;
    case n <= 3701: r = "21"; break;
    case n <= 3917: r = "22"; break;
    case n <= 4133: r = "23"; break;
    case n <= 4349: r = "24"; break;
    case n <= 4565: r = "25"; break;
    case n <= 4877: r = "26"; break;
    case n <= 5189: r = "27"; break;
    case n <= 5501: r = "28"; break;
    case n <= 5813: r = "29"; break;
    case n <= 6125: r = "30"; break;
    case n <= 6437: r = "31"; break;
    case n <= 6749: r = "32"; break;
    case n <= 7061: r = "33"; break;
    case n <= 7373: r = "34"; break;
    default: r = "35"
  }
  return `basket-${r}.wbbasket.ru/vol${n}`
}

function volFeedbackPhotoHost(e) {
  let r;
  const n = ~~(e / 1e5);
  switch (!0) {
    case n >= 0 && n <= 431: r = "01"; break;
    case n <= 863: r = "02"; break;
    case n <= 1199: r = "03"; break;
    case n <= 1535: r = "04"; break;
    case n <= 1919: r = "05"; break;
    case n <= 2303: r = "06"; break;
    case n <= 2687: r = "07"; break;
    case n <= 3071: r = "08"; break;
    case n <= 3455: r = "09"; break;
    case n <= 3839: r = "10"; break;
    default: r = "11"
  }
  return `feedback${r}.wbbasket.ru/vol${n}`
}

function volVideoHost(e) {
  let r;
  const n = e % 144;
  switch (!0) {
    case n >= 0 && n <= 11: r = "01"; break;
    case n <= 23: r = "02"; break;
    case n <= 35: r = "03"; break;
    case n <= 47: r = "04"; break;
    case n <= 59: r = "05"; break;
    case n <= 71: r = "06"; break;
    case n <= 83: r = "07"; break;
    case n <= 95: r = "08"; break;
    case n <= 107: r = "09"; break;
    case n <= 119: r = "10"; break;
    case n <= 131: r = "11"; break;
    case n <= 143: r = "12"; break;
    default: r = "13"
  }
  return `videonme-basket-${r}.wbbasket.ru/vol${n}`
}

function constructHostV2(e, t = "nm", r = !1) {
  const n = parseInt(e, 10)
      , s = "video" === t ? ~~(n / 1e4) : ~~(n / 1e3);
  let o;
  return "nm" === t ? o = volHostV2(n, r) : "feedbackPhoto" === t ? o = volFeedbackPhotoHost(n, r) : "video" === t && (o = volVideoHost(n, r)),
      `https://${o}/part${s}/${n}`
}

function urlVideoProduct(e, t = "mp4", r = "360p") {
  const n = parseInt(e, 10);
  return `${constructHostV2(n, "video")}/${t}/${r}/${"mp4" === t ? "1.mp4" : "index.m3u8"}`
}

function numToUint8Array(r) {
  const t = new Uint8Array(8);
  for (let n = 0; n < 8; n++) {
    t[n] = r % 256;
    r = Math.floor(r / 256);
  }
  return t;
}

function crc16Arc(r) {
  const t = numToUint8Array(r);
  let n = 0;
  for (let r = 0; r < t.length; r++) {
    n ^= t[r];
    for (let r = 0; r < 8; r++)
      (1 & n) > 0 ? n = n >> 1 ^ 40961 : n >>= 1;
  }
  return n;
}