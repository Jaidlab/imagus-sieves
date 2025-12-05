$=JSON.parse($._.match(/"script_seo_markupProduct">(.+?)<\//)?.[1]||'{}');
const t=$.description;
return $.image?.map((i,n)=>[i.replace('base_action','original'),!n?t:''])||''