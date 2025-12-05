const low_quality_first = false // True shows lower quality video first. Toggle with TAB.

if(!$[2])return {loop:$._.match(/"embedUrl":"([^"]+)/)?.[1]||''};
$=JSON.parse($._);
const t=[$.title, $.description].join(' | ');
$=$.playback;
const hd=$?.hd_video, sd=$?.video, s=low_quality_first;
return hd||sd ? [[[hd&&(s?'':'#')+hd,sd&&(s?'#':'')+sd],t]] : $?.hls ? {loop:$.hls} : ''