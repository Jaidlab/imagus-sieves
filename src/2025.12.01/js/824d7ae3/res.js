const max_images = 300 // Maximum images in album. Lower number loads faster.

const x=new XMLHttpRequest(), u=$._.match(/(biz_photos)(\/[\w-]+)(?=[?"])/);
let o, m=[];
for(i=0;i<max_images;i+=30){
x.open('GET','https://www.yelp.com/'+u[1]+'/get_media_slice'+u[2]+'?start='+i+'&dir=f',false);
x.setRequestHeader("X-Requested-With","XMLHttpRequest");
x.send();
o=x.responseText[0]==='{'&&JSON.parse(x.responseText).media||[];
m.push(...o.map(x=>[x.src?.replace(/(video_contribution\/\d+\/)[^\/]+(\/.+)/,'$1progressive_video_high$2#mp4'),x.media_data?.caption]));
if(o.length<30)break;
}
return m