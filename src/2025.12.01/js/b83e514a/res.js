let url;
const json = $._.match(/^\{/);
if (json) {
  return parseConfig($._);
}

const config = $._.match(/config_url":".*?"/);
if (config) {
  url = config[0].replace(/config_url":"(.*)?"/, '$1').replace(/\\\//g, '/');
  return url;
}

const vUrl = $._.match(/<meta property="og:video:url" content="(.+?)"/)?.[1];
if (vUrl) {
  return vUrl.replace(/&amp;/g, '&');
}

const embedConfig = $._.match(/{.+"progressive":\[.*?\].+}/);
if (embedConfig) {
  return parseConfig(embedConfig[0]);
}

let chanVidID = $._.match(/ content="https:\/\/vimeo\.com\/channels\/.*?\/\d+"/);
if (chanVidID) {
  chanVidID = chanVidID[0].replace(/.*\/channels\/.*?\/(\d+)"/, '$1');
  const regex = new RegExp(`data-config-url=".*?\\/${chanVidID}.*?"`) 
  const chanVidConfig = $._.match(regex);
  if (chanVidConfig) {
    url = chanVidConfig[0].replace(/data-config-url="(.*?)"/, '$1').replace(/&amp;/g, '&');
    return url;
  }
}

const id = $[0].match(/\/(\d+)(\?|\/|$)/)?.[1];
const pUrl = `https://player.vimeo.com/video/${id}?autoplay=1`;
if (id && pUrl != $[0]) {
  return pUrl;
}

function parseConfig(config) {
  config = JSON.parse(config);

  const qualities = config.request.files.progressive;
  if (qualities?.length) {
    return selectQuality(qualities);
  }

  const cdns = config.request.files.hls.cdns;
  const cdn = cdns.akfire_interconnect_quic || cdns.google_mediacdn;
  return cdn.url;
}

function selectQuality(qualities) {
  let res = qualities[0].width;
  let url = qualities[0].url;
  for (let i = 0; i < qualities.length; i++) {
    if (qualities[i].width > res) {
      res = qualities[i].width;
      url = qualities[i].url;
    }
  }

  return url;
}