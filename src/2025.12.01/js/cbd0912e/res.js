$=JSON.parse($._.match(/"story-data" type="application\/json">({.+?})<\//)[1]).attributes.pictures[0].attachments;
return $.map(i=>[[i.src2x?.replace(/.+/,'#$&')||'',i.src1x]])