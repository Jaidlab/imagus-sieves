// Convert OfferUp image thumbnails to high resolution
const dimensions = $[2];
let newDimensions;

// Map thumbnail sizes to high-res equivalents
switch (dimensions) {
  case '250x250':
  case '300x400':
    newDimensions = '1440x1920';
    break;
  case '250x333':
    newDimensions = '1512x2016';
    break;
  default:
    // If already high-res or unknown, keep as is
    return 'https://' + $[1] + dimensions + '/' + $[3];
}

return 'https://' + $[1] + newDimensions + '/' + $[3];