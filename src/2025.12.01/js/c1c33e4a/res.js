const video_first = false

$=JSON.parse($._.match(/window\.__INIT_DATA=([^\n]+)/)[1]);
$=Object.values($.data).find(i=>i.data?.offerImgList||i.data?.video)?.data||[];
$=video_first ? [$.video?.videoUrl].concat($.offerImgList) : ($.offerImgList||[]).concat($.video?.videoUrl);
return $.filter(Boolean).map(i=>[i])