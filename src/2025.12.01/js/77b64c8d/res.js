if($.base[0]==='d'){
const x=new XMLHttpRequest();
x.open('GET',$[0],false);
x.send();
$._=x.responseText;
}
if($[2]==='video')return {loop:$._.match(/<iframe src="([^"]+)/)?.[1].replace(/\/iframe.*/,'/manifest/video.mpd?')||''};
const l=$._.match(/"h-full max-w-full"/g);
$=JSON.parse($._.match(/id="__NUXT_DATA__">(.+?)<\//)?.[1]||'[]');
$=$.filter(i=>/^https:\/\/static\.eyecandy\.net\/media\/\d+\/\w+\./.test(i)).map(i=>[i]);
$.length=l?.length||0;
return $