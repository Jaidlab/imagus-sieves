if($[2]) this.flickr_album=$[2];
if($[4]) {
  let res=[];
  let jsn=JSON.parse($._);
  for (img of jsn.photoset.photo) {
    res.push([img.url_6k || img.url_5k || img.url_4k || img.url_3k || img.url_o || img.url_k || img.url_h, img.title]);
  }
  let i = this.flickr_album;
  delete this.flickr_album;
  i = jsn.photoset.photo.findIndex(x=>x.id===i);
  return i ? {"":res,idx:i} : res;
}
let api=$._.match(/root\.YUI_config\.flickr\.api\.site_key = "([^"]+)";/)[1];
let length=$._.match(/<span class="stat photo-count">\n\s+(\d+) photo/s)[1];
let vnsid2=$._.match(/class="gn-title you"\s+href="\/photos\/([^\/]+)\/"\s/);
let vnsid=vnsid2 ? vnsid2[1] : null;
let csrf2=$._.match(/root.auth = {"signedIn":true,"csrf":"([^"]+)/);
let csrf=csrf2? csrf2[1] : null;
return api&&{loop:'https://www.flickr.com/photos/' + $[3] + '/' + api + '/' + length +'/'+(csrf ? vnsid+'/'+csrf+'/' : "")};