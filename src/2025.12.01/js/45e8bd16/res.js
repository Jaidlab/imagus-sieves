const max_album_images = 100 // Maximum images in album. Lower number loads faster

if($[2]==='a'){
  this.cd_album={
    links: [...$._.matchAll(/<a id="file" href="([^"]+)/g)].map(i=>'//'+$[1]+i[1]),
    num: 0
  }
  return {loop:this.cd_album.links[0]}
}
let m=this.cd_album?.vids||[];
$=JSON.parse($._).url;
m.push([[$,$+'#mp4']]);
if (this.cd_album) {
  this.cd_album.num++;
  const n=this.cd_album.num, l=this.cd_album.links;
  if(n<l.length&&n<max_album_images){
    this.cd_album.vids = m;
    return {loop:l[n]}
  }
  delete this.cd_album;
}
return m