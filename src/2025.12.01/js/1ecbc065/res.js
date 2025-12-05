const src_img=$._.match(/([^\/.]+)-\d+\./)?.[1];
$=[...$._.matchAll(/ImageObject"><a href="([^"]+)/g)].map(i=>[i[1]]);
if(src_img)$=$.concat($.splice(0,$.findIndex(i=>RegExp(src_img).test(i[0]))));
return $