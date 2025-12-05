if($[2][0]==='v')return '//'+$[1]+$._.match(/url_v = "([^"]+)/)[1].replace(/(play)_/,'$1')+'#mp4';
$='https://'+$[1]+$._.match(/var src = "([^"]+)/)[1]+'#.m3u8';
this.TRG.IMGS_ext_data=['//data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"></svg>',`<imagus-extension type="videojs" url="${$}"></imagus-extension>`];
return {loop:'imagus://extension'}