let cloud_vid = [...$._.matchAll(/cloud_vid = '([^']+)/g)];
if(cloud_vid.length > 0) return {loop: 'https://videodelivery.net/'+cloud_vid[1][1]+'/manifest/video.m3u8'};
let i = $._.indexOf('<div class="gallery-photo');
if(i<0) { return null; }
let t = $._.indexOf('</section>', i);
if(t<0) { return null; }
let res = [];
let re = /href="([^"]+)" target="_blank"/gi
let data = $._.substring(i,t);
let a = re.exec(data);
while(a) {
 res.push([a[1]]);
 a = re.exec(data);
}
return res;