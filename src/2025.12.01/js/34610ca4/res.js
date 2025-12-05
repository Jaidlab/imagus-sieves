const max_resolution = 900;

const req = new XMLHttpRequest();
req.open('GET', $[0], false);
req.send();
$._=req.responseText;
const vidId = $._.match(/(?:videoTokenId|newId)":"(?<id>\d+)/)?.groups?.id;
if (!vidId) return;

req.open('POST', `https://www.${$[1]}.com/graphql`, false);
req.setRequestHeader('Content-Type', 'application/json');
req.send(
  `{"operationName":"getToken","variables":{"videoId":"${vidId}","device":"trailer"},"query":"query getToken($videoId: ID!, $device: Device!) {generateVideoToken(input: {videoId: $videoId, device: $device}) {p270 {token}p360 {token}p480 {token}p720 {token}p1080 {token}p2160 {token}}}"}`
);
if (req.status !== 200) return;

let streams = {};
try { streams = JSON.parse(req.responseText)?.data?.generateVideoToken;} catch (e) { return; }

const trailers = Object.keys(streams)
  .map(s => ({ res: Number(s.replace(/\D/g, '')), url: streams[s]?.token }))
  .filter(a => a.res <= max_resolution)
  .sort((a, b) => a.res - b.res);

return trailers.pop()?.url || null;