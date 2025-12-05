max_resolution = 1080;

let medias
try { medias = JSON.parse($._)?.medias || []; } catch (e) { return; }
const mediaId = medias.find(a => a.title === "Trailer")?.media_id;
if (!mediaId) return;

const req = new XMLHttpRequest();
req.open('GET', `https://pornbox.com/media/${mediaId}/stream`, false);
req.send();
if (req.status !== 200) return;

let streams;
try { streams = JSON.parse(req.responseText).qualities; } catch (e) { return; }

const res_map = { '1080p': 1080, hd: 720, vga: 480, web: 240 };
const trailers = streams
  .map(a => ({ res: res_map[a.quality], url: a.src }))
  .filter(a => a.res <= max_resolution)
  .sort((a, b) => a.res - b.res);

return trailers.pop()?.url || null;