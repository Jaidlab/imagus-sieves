$=JSON.parse($._.match(/data-product-json="([^"]+)/)[1].replaceAll('&quot;','"'))
const t=$.title+' | '+$.short_description
return $.images.map((i,n)=>[i.original_url,!n?t:''])