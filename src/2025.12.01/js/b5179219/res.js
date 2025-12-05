let jsn=JSON.parse($._);
let url='pr0gramm.com/'+jsn.items[0].image;

if (url.slice(-3)=='mp4')
{
  return 'https://vid.' + url;
}
else {
  return 'https://img.' + url;
}