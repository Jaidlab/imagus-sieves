let data;
try {
  data = JSON.parse($._);
} catch (error) {
  console.error('Could not fetch data.');
  console.error('Post error on /r/imagus');
  return;
}

const pic = data?.thumbnails?.[0]?.url;
if (pic) return pic;

const gallery = data?.files
  ?.map(obj => obj?.thumbnails?.[0]?.url)
  ?.filter(e => e)
  ?.map(url => [url, '']);
return gallery;