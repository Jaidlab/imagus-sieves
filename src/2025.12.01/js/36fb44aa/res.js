let urls;
try {
  urls = JSON.parse($._)?.object?.preview?.urls;
} catch (error) {
  console.error('Could not fetch data');
  console.error('Post on /r/imagus');
}

const url =
  urls?.mp4 ||
  urls?.large ||
  urls?.poster ||
  urls?.medium ||
  urls?.min ||
  urls?.small ||
  urls?.thumb ||
  urls?.tiny;
return url && `https://download.ru${url}`;