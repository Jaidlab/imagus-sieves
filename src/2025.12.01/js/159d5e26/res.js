$=JSON.parse($._.match(/view_image\s*=\s*(.+?)<\/script/)[1]);
return $.images.map(i=>[i.pl?.src])