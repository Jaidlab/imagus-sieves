const max_resolution = 1080;

if($[2]==='gallery')return [...$._.matchAll(/<img id="[^"]+" src="([^"]+)/g)].map(i=>[i[1].replace(/_[^.]+/,'')])

const re = new RegExp(
  '<a href="(?<url>/dload.*?)" >Download.*?\\((?<res>\\d+)',
  'g'
);
const streams = [...$._.matchAll(re)]
  .map(a => ({
    res: a.groups.res,
    url: `//www.${$[1]+a.groups.url}`,
  }))
  .sort((a, b) => b.res - a.res)
  .filter(a => a.res <= max_resolution);

if (streams.length) return streams[0].url;
return;