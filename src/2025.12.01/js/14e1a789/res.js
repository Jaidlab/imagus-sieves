const max_resolution = 2160;

const m = /applicationID":"([^"]+)","apiKey":"([^"]+)/g.exec($._);
if (!m) return;
const [appId, apiKey] = [m[1], m[2]];
const sceneId = $[2];

const xml = new XMLHttpRequest();
const url = `https://tsmkfa364q-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.27.1%3BJS%20Helper%202.26.0&x-algolia-application-id=${appId}&x-algolia-api-key=${apiKey}`
xml.open('POST', url, false);
xml.send(
  `{"requests": [{"indexName": "all_scenes", "params": "facetFilters=[[\\"clip_id:${sceneId}\\"]]"}]}`
);
if (xml.status !== 200) return;

let streams = {};
try { streams = JSON.parse(xml.responseText)?.results?.[0]?.hits?.[0]?.trailers;} catch (e) { return; }

const trailers = Object.keys(streams)
  .map(s => ({ res: parseInt(s.replace("4k", '2160'), 10), url: streams[s] }))
  .filter(a => a.res <= max_resolution)
  .sort((a, b) => a.res - b.res);

if (!trailers.length) return;
return trailers[trailers.length-1].url;