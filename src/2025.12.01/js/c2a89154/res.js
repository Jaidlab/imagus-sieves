if($[2]==='v/video')return {loop:$._.match(/id="player_box" src="([^"]+)/)?.[1]||''}
$=JSON.parse($._.match(/window\.playlist = ([^;]+)/)[1]).sources
return [[['#'+$[0].file+'#mp4',$[1]?.file+'#mp4']]]