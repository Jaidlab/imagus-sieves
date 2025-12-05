let jsn=JSON.parse($._);
let fUrl=($[1]=='video' ? 'fileMP4URI':'imageFileURI');
let res = jsn.data[$[1]][fUrl] || jsn.data[$[1]].fileWebMURI;
return res;