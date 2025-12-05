if($[2])return $[2].split("!").map(i=>[i]);
return [...$._.matchAll(/highres_url:\s*'(.+?)'/g)].map(i => [i[1], '']);