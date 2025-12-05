let link=$._.match(/var VideoPlayer = \{[\s\S]+?url: ?'([^']+)'/)[1];
const x = new XMLHttpRequest();
x.open('GET',link,false);
x.send();
let xml=x.responseXML;
let res = [];
let videoFileSources = xml.getElementsByTagName('quality')[0];
if (videoFileSources) {
  videoFileSources = videoFileSources.getElementsByTagName('item');
  console.log(videoFileSources[videoFileSources.length-1]);
  res.push(videoFileSources[videoFileSources.length-1].getElementsByTagName('videoLink')[0].childNodes[0].nodeValue);
}
return res;