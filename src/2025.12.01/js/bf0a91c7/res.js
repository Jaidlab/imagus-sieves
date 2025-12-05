const max_resolution = 1080;

const re = /source src="(?<url>.+?mp4.*?)" size=\"(?<res>\d+)"/g
const mp4s = Array.from($._.matchAll(re))
  .map(a => ({ res: Number(a.groups.res), url: a.groups.url }))
  .filter(a => a.res <= max_resolution)
  .sort((a, b) => a.res - b.res);

return mp4s.pop()?.url || null;