$=JSON.parse($._.match(/window\.__INITIAL_STATE__\s*=\s*({.+?})</)[1]).product.groupinfo.groupItems[0].itemInfos[0].fileInst;
return $.map(i=>[i.photos?.original])