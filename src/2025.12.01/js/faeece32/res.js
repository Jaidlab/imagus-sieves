$=$._.match(/window\.__playinfo__=({.+?})<\//);
$=$&&JSON.parse($[1]).data?.dash?.video?.sort((a,b)=>b.width-a.width);
return $?.length ? [[['#'+$[0].baseUrl+'#mp4','#'+$[0].backupUrl?.[0]+'#mp4',$[$.length-1].baseUrl+'#mp4',$[$.length-1].backupUrl?.[0]+'#mp4']]] : ''