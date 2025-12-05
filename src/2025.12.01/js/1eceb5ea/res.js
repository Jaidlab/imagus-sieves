if($[1])return {"":$[2].split('!').map(i=>[i]),idx:Number($[1])};
let o=JSON.parse($._.match(/console.log\((.+?)\)</)?.[1]||'[]');
return o?.length?o.map(i=>[i.local_url_org]):[...$._.matchAll(/<a href="([^"]+)" data-caption=/g)].map(i=>[i[1]]);