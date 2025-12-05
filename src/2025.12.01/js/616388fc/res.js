if($.base[0]==='d'){const x=new XMLHttpRequest();x.open('GET',$[0],false);x.send();$._=x.responseText}

$=$._.match(/videoCoverUrl\s*=\s*"([^"]+)/)?.[1]?.replace(/^(https:\\?\/\\?\/[^\\\/]+)\\?\/thumbs\\?(\/[^.]+\.[^_]+)_.*/,'$1$2')||$._.match(/text-xl"\s+href\s*=\s*"([^"]+)/)?.[1]||'';
return $+'?__bunkr__'+(/\.m[ok]v$/i.test($)?'#mp4':'')