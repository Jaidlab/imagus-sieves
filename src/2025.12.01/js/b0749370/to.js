let o=document.body.outerHTML.match(/__PINIA_INITIAL_STATE__\s*=\s*(.+?);\n/)?.[1]
o=o&&JSON.parse(o).product?.product?.media?.photoImages?.find(i=>Object.values(i).find(x=>RegExp($[1]).test(x)));
return o?.high||''