let videoSource = /:video_source="([^"]+)/gm.exec($._)[1];
function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}
let finalUrls = [];
let urls = JSON.parse(htmlDecode(videoSource));
for(let el of urls){
   finalUrls.push([el, /(\d+p\.mp4)/gm.exec(el)[1]]);
}
return finalUrls.reverse();