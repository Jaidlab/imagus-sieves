$=JSON.parse($._.match(/window\.__PRELOADED_STATE__ARTICLE\s*=\s*({.+?})[\n;]/)[1]).article;
const t=$.description;
$=$.content.find(i=>i.type==='picture')?.attrs?.images?.large?.url;
return $ ? [$,t] : ''