const upgrade = (x) => ['#'+x?.replace(/_[^_.]+\.(?!.*\.)/,'.').replace(/webp[/#]/g,''), x?.replace(/_[^_.]+\.(?!.*\.)/,'_medium2.').replace(/webp[/#]/g,'')];

$=new DOMParser().parseFromString($._,"text/html");
$=[...$.querySelectorAll('img[data-photo-id]')];
return $.map(i=>[upgrade(i.src),i.alt])