if($[1])return $[1].split("!").map(i=>[i]);
return [...$._.matchAll(/,url:"([^"]+)/g)].map(i=>[i[1].replace(/\\u002F/g,'/')])