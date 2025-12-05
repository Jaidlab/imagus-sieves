let m;
if(m=['dvd','digital'].includes($[2])&&$._.match(/Screenshots from <a href="([^"]+)/)?.[1])return {loop:m};
if(m=!$[2]&&!$[3]&&/>Filmography</.test($._)&&$._.match(/<center><a href="([^"]+)" onclick="/)?.[1])return m;
if(!$[2]&&!$[3]&&!$[4]&&RegExp(`${$[5]}/#Screenshots`))return {loop:`https://www.${$[1]}products/menu_ajax.php?p=${$[5]}&action=showscreenshots`};
$=[...$._.matchAll(/'<img id="[^"]+" src="([^"]+)|(?:border="0"><img|<img id="screenshot\d+") src="([^"]+)" width=/g)].map(i=>[i[1]||i[2].replace(/_\d+/,'$&_large')]);
return [...new Map($)]