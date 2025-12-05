// Video matching switch. Set to true to enable, false to disable.
const enableVideoMatching = false;

// Extracts preview source or returns empty array if not found.
const previewSource = $._.match(/preview-video[\s\S]*?article/)?.[0];
if (!previewSource) return [];

// Extracts image URLs and cover URL.
const imageUrls = [...previewSource.matchAll(/href="([^"]+\.jpg)"/g)].map(m => [m[1]]);
const coverUrl = previewSource.match(/src="([^"]+\.jpg)"/)?.[1];

// Extracts and processes video URL if enabled.
let videoUrl = enableVideoMatching ? previewSource.match(/src="([^"]*\.mp4)"/)?.[1]?.replace(/_?(sm|dm|dmb|mmb|hmb|mhb)_?w?\.mp4/g, 'hhb.mp4') : null;
if (videoUrl) videoUrl = 'https:' + videoUrl;

// Builds the results array.
const results = [];
if (coverUrl) results.push([coverUrl]);
if (videoUrl) results.push([videoUrl]);
if (imageUrls.length > 1) results.push(...imageUrls.slice(1));

// Returns the final results array.
return results;