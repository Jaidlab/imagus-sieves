// Full size images sometimes have different extensions than thumbnails. Trying multiple URLs didn't work in 'to' field.

if(!$[1])return [...$._.matchAll(/data-origin="([^"]+)/g)].map(i=>[i[1]])
const u='//'+$[1]+$[2]+'.', e=['jpg','png','jpeg'].filter(i=>i!==$[3]);
return [[[u+$[3],u+e[0],u+e[1],$[0]]]]