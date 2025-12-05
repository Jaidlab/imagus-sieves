$=JSON.parse($._.match(/{"\[data-gallery-[^<]+/)?.[0]||'{}')['[data-gallery-role=gallery-placeholder]']?.['mage/gallery/gallery'].data||[];
return $.map(i=>[i.full])