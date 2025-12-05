const max_resolution = 720;

const m = /jwt":"([^"]+)/g.exec($._);
const token = m ? m[1] : null;
if (!token) return;

const req = new XMLHttpRequest();
req.open(
  'GET',
  `https://site-api.project1service.com/v2/releases/${$[1]}`,
  false
);
req.setRequestHeader('instance', token);
req.send();
if (req.status !== 200) return;

let data = {};
try {
  data = JSON.parse(req.responseText);
console.log(data);
} catch (e) {
  return;
}

let streams = data.result.children.find(
  (c) => c.type.toLowerCase() === 'trailer'
)?.videos?.full?.files;

if (!streams) {
  streams = data?.result?.videos?.mediabook?.files;
  streams = Object.keys(streams).map((key) => streams[key]);
}
if (!streams) return;

const trailers = streams
  .map((s) => ({
    res: Number(s.format.replace(/\D/g, '')),
    url: s.urls.view,
  }))
  .filter((a) => a.res <= max_resolution)
  .sort((a, b) => b.res - a.res);

return trailers?.[0]?.url;