const url = $[0];

function syncFetch(u) {
  const x = new XMLHttpRequest();
  x.open('GET', u, false);
  x.send();
  if (x.readyState != 4) return;
  if (x.status != 200) return;
  return JSON.parse(x.responseText);
}

function findLargestImage(displays) {
  if (!displays) {
    return;
  }
  let largest = {
    width: 0,
  };
  for (const val of Object.values(displays)) {
    if (val.width > largest.width) {
      largest = val;
    }
  }
  // console.log(largest);
  return largest.src;
}

function removeQueryParams(string) {
  if (!string) {
    return string;
  }
  const index = string.indexOf('?');
  if (index < 0) {
    return string;
  }
  return string.substring(0, index);
}

function getIdFromSlug(slug) {
  const splits = slug.split('-');
  if (splits.length === 0) {
    return;
  }
  return removeQueryParams(splits[splits.length - 1]);
}

const profileGalleryRegex = /shutterstock\.com\/(.*\/)*g\/(.*)/;
match = url.match(profileGalleryRegex);
if (match && match.length >= 2) {
  console.log(match[match.length - 1]);
  const profile = removeQueryParams(match[match.length - 1]);
  if (!profile) {
    return;
  }
  console.log(profile);
  const json = syncFetch(`https://www.shutterstock.com/_next/data/123/en/_shutterstock/g/${profile}.json`);
  const assets = json.pageProps.assets;
  return assets.map(asset => {
    const imageUrl = findLargestImage(asset.displays);
    const caption = asset.title;
    return [imageUrl, caption];
  });
}
const imageEditorialRegex = /shutterstock\.com\/(.*\/)*editorial\/image-editorial\/(.*)/;
match = url.match(imageEditorialRegex);
if (match && match.length >= 2) {
  const slug = match[match.length - 1];
  const id = getIdFromSlug(slug);
  if (!id) {
    return;
  }
  // console.log(id);
  const json = syncFetch(`https://www.shutterstock.com/_next/data/123/en/_shutterstock/editorial/image-editorial/${id}.json`);
  const imageUrl = findLargestImage(json.pageProps.asset.displays);
  const caption = json.pageProps.asset.title;
  return [imageUrl, caption];
}
const imagePhotoRegex = /shutterstock\.com\/(.*\/)*image-photo\/(.*)/;
match = url.match(imagePhotoRegex);
if (match && match.length >= 2) {
  const slug = match[match.length - 1];
  const id = getIdFromSlug(slug);
  if (!id) {
    return;
  }
  // console.log(id);
  const json = syncFetch(`https://www.shutterstock.com/studioapi/images/${id}`);
  const imageUrl = findLargestImage(json.data.attributes.displays);
  const caption = json.data.attributes.title;
  return [imageUrl, caption];
}
const videoSearchRegex = /shutterstock\.com\/(.*\/)*video\/search\/(.*)\/*/;
match = url.match(videoSearchRegex);
if (match && match.length >= 2) {
  const term = removeQueryParams(match[match.length - 1]);
  const json = syncFetch(`https://www.shutterstock.com/_next/data/123/en/_shutterstock/video/search/${term}.json`)
  // console.log(json);
  if (!json || !json.pageProps || !json.pageProps.videos) {
    return;
  }
  const videos = json.pageProps.videos;
  const caption = (json.pageProps.query && json.pageProps.query.term) || term;
  return videos.map(video => [video.previewVideoUrls.mp4, caption]);
}
const imgSearchRegex = /shutterstock\.com\/(.*\/)*search\/(.*)\/*/;
match = url.match(imgSearchRegex);
if (match && match.length >= 2) {
  const term = removeQueryParams(match[match.length - 1]);
  const json = syncFetch(`https://www.shutterstock.com/_next/data/123/en/_shutterstock/search/${term}.json`)
  // console.log(json);
  if (!json || !json.pageProps || !json.pageProps.assets) {
    return;
  }
  const assets = json.pageProps.assets;
  const caption = (json.pageProps.query && json.pageProps.query.term) || term;
  // console.log(assets);
  return assets.map(asset => [findLargestImage(asset.displays), caption]);
}