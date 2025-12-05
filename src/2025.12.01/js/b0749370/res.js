$=JSON.parse($._.match(/__PINIA_INITIAL_STATE__\s*=\s*(.+?);\n/)?.[1]||'{}').product?.product;
return $.media.photoImages.map((i,n)=>[['#'+i.high,i.og],!n?$.description:''])