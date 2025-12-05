const num = n => parseInt(n?.displayName?.value)||0;

if(!$[1])return [getVid($._)];

const that = this, links = [...$._.matchAll(/data-testid="videos-slate-card-title-\d+" href="([^"]+)/g)].map(i => 'https://www.imdb.com' + i[1]);

function getVid(text) {
  let t, m, o = text.match(/"__NEXT_DATA__" type="application\/json">({.+?})<\/script/)?.[1];
  o = o&&JSON.parse(o).props?.pageProps?.videoPlaybackData?.video;
  t = o?.description?.value||'';
  m = o?.playbackURLs?.filter(i => i.videoMimeType === 'MP4').sort((a, b) => num(b) - num(a)) || '';
  return [['#' + m[0]?.url, m[Math.floor(m.length / 2)]?.url], t];
}

const getLinkVid = url => new Promise(resolve => {
  const x = new XMLHttpRequest();
  x.open('GET', url);
  x.onload = () => resolve(getVid(x.responseText));
  x.send();
})

Promise.all(links.map(getLinkVid)).then(album=>{
  that.TRG.IMGS_album = $[0];
  that.stack[$[0]] = album;
  that.stack[$[0]].unshift(1);
  that.album(0);
});
return null