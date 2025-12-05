// Extract unique high-resolution images from OfferUp item pages
const doc = new DOMParser().parseFromString($._, "text/html");
const images = [];
const seenFileHashes = new Set(); // Track unique images by their file hash

// Extract all image URLs from the page source using regex
const imageRegex = /https:\/\/images\.offerup\.com\/([^"'\s\/]+)=\/(\d+x\d+)\/([a-f0-9]{4})\/([a-f0-9]{32})\.(jpg|jpeg|png|webp)/g;
const matches = [...$._.matchAll(imageRegex)];

// Group images by their file hash (last part of URL) to identify unique images
const imageGroups = new Map();

for (const match of matches) {
  const [fullUrl, hash, dimensions, folder, filename, ext] = match;
  
  // Skip very small images (likely profile pics or icons)
  if (dimensions === '100x100' || dimensions === '50x50' || dimensions === '64x64') continue;
  
  // Use filename as unique identifier for the image
  const imageId = filename;
  
  if (!imageGroups.has(imageId)) {
    imageGroups.set(imageId, []);
  }
  
  imageGroups.get(imageId).push({
    url: fullUrl,
    hash: hash,
    dimensions: dimensions,
    folder: folder,
    filename: filename,
    ext: ext,
    width: parseInt(dimensions.split('x')[0]),
    height: parseInt(dimensions.split('x')[1])
  });
}

// For each unique image, pick the best quality version
for (const [imageId, variants] of imageGroups) {
  // Sort by total pixels (width * height) to get highest quality
  variants.sort((a, b) => (b.width * b.height) - (a.width * a.height));
  
  // Take the highest quality version that's not square-cropped
  let bestImage = variants[0];
  
  // Prefer non-square images if available (they're usually not cropped)
  for (const variant of variants) {
    if (variant.width !== variant.height && (variant.width * variant.height) >= 400000) {
      bestImage = variant;
      break;
    }
  }
  
  // If we only have square images, pick the largest one
  if (!bestImage || bestImage.width === bestImage.height) {
    // Look for the largest available version, but try common high-res dimensions first
    const preferredDimensions = ['750x1000', '1000x750', '1440x1920', '1512x2016', '2016x1512'];
    
    for (const prefDim of preferredDimensions) {
      const found = variants.find(v => v.dimensions === prefDim);
      if (found) {
        bestImage = found;
        break;
      }
    }
  }
  
  if (bestImage) {
    images.push([bestImage.url, '']);
  }
}

// If we didn't get any images, try DOM parsing as fallback
if (images.length === 0) {
  const imgElements = doc.querySelectorAll('img[src*="images.offerup.com"]');
  
  for (const img of imgElements) {
    let src = img.src;
    
    // Skip small images
    if (src.includes('/100x100/') || src.includes('/50x50/') || src.includes('/64x64/')) continue;
    
    // Extract filename to check for duplicates
    const filenameMatch = src.match(/\/([a-f0-9]{32})\./); 
    if (filenameMatch && !seenFileHashes.has(filenameMatch[1])) {
      seenFileHashes.add(filenameMatch[1]);
      images.push([src, img.alt || '']);
    }
  }
}

return images.length > 0 ? images : null;