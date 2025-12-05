$=$._.match(/gallery:(\[[^\]]+\])/)?.[1].replace(/main:[^",]+,/g,'').replace(/(retina|main|thumbnail):/g,'"$1":');
$=$?JSON.parse($):[];
return $.map(i=>[i.retina])