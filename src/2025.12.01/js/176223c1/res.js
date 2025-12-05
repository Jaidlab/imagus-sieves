if($[1]==='artist'){
const t=$._.match(/description blrclass"><p>(.+?)<\/div>/s)?.[1].replace(/<\/?p>/,'')||'';
return [...$._.matchAll(/class="lazy"\s+src="(https:\/\/[^\/]+\/)[a-z]+(\/\d+[a-z]{2})([^"]+)/g)].map(i=>[['#'+i[1]+'sdl'+i[2]+'sdl'+i[3],i[1]+'sftb'+i[2]+i[3]],t])
}
$=[...$._.matchAll(/(?:rel="nofollow" href|"og:image" content)="([^"]+)"(?:>Download<\/a|\s*\/)>/g)];
return [[['#'+$[$.length-1][1],$[0][1]]]]