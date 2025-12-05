try {
 $ = JSON.parse($._).objects, i = $.length, u = '//puu.sh/';
 while(i--) $[i] = [u + $[i].id + '/' + $[i].name, null, u + 't/' + $[i].id];
 return $;
} catch (ex) {return null}