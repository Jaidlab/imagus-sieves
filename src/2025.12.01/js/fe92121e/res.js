let o=JSON.parse(($._.match(/<script type="application\/ld\+json">\n(\{.+?})\n<\//s)||'{}')?.[1]);
if(!o.image)return null;
return o.image.map((i,n)=>[i,!n?o.description:''])