var pageSourceCode = $._; // Get the source code of the current page.
var coverImageUrlRegex = /"(https[^"]+pl\.jpg)"/i; // Regular expression to find a cover image URL ending with "pl.jpg".
var coverImageUrlMatch = pageSourceCode.match(coverImageUrlRegex); // Attempt to find a match for the cover image URL in the page source.
var imageUrls = []; // Initialize an empty array to store the extracted image URLs.
var foundCoverImage = false; // Flag to track if a cover image was found and added.

if (coverImageUrlMatch && coverImageUrlMatch[1]) {
 const coverImageUrl = coverImageUrlMatch[1]; // Extract the matched cover image URL.
 imageUrls.push([coverImageUrl]); // Add the cover image URL to the results array.
 foundCoverImage = true; // Set the flag to indicate that a cover image has been added.
}

var sampleImageBlockStart = pageSourceCode.indexOf('id="sample-image-block"'); // Find the starting index of the target image block using its ID.
if (sampleImageBlockStart < 0) {
 return null; // If the starting index is not found, return null as the target area cannot be located.
}

var imageAreaEnd = pageSourceCode.indexOf('画像はイメージです', sampleImageBlockStart); // Find the ending index of the target image block by searching for specific text after the starting index.
if (imageAreaEnd < 0) {
 return null; // If the ending index is not found, return null as the target area cannot be fully located.
}

var imageLinkRegex = /"([^"]+\.jpg)"/gi; // Regular expression to find image URLs within double quotes with the ".jpg" extension.
var targetImageData = pageSourceCode.substring(sampleImageBlockStart, imageAreaEnd); // Extract the content of the target image block from the page source.
var currentMatch; // Variable to store the current match found by the regular expression.
var processedLinks = new Set(); // Use a Set to store processed image links to automatically handle duplicates.
var isFirstMatch = true; // Flag to track if it's the first match of imageLinkRegex.

while ((currentMatch = imageLinkRegex.exec(targetImageData)) !== null) {
 const originalUrl = currentMatch[1]; // Extract the matched image URL.

 if (isFirstMatch && foundCoverImage && imageUrls.length > 0 && imageUrls[0][0] === originalUrl) {
 isFirstMatch = false; // Set the flag to false for subsequent matches.
 continue; // Skip to the next iteration of the loop.
 }

 let processedUrl = originalUrl; // Initialize the processed URL with the original URL.
 if (!originalUrl.includes('jp-')) { // Check if the URL does not already contain "jp-".
 const lastHyphenIndex = originalUrl.lastIndexOf('-'); // Find the index of the last hyphen in the URL.
 if (lastHyphenIndex !== -1) { // If a hyphen is found, replace it with "jp-" to potentially get a higher resolution image.
 processedUrl = originalUrl.substring(0, lastHyphenIndex) + 'jp-' + originalUrl.substring(lastHyphenIndex + 1);
 }
 }
 if (!processedUrl.includes('ps.jpg')) { // Check if the processed URL does not contain "ps.jpg".
 processedLinks.add(processedUrl); // Add the processed URL to the Set.
 }
 isFirstMatch = false; // Ensure the flag is set to false after the first match.
}

processedLinks.forEach(url => {
 imageUrls.push([url]); // Add each unique URL from the Set to the final results array.
});

return imageUrls; // Return the array containing the extracted image URLs.