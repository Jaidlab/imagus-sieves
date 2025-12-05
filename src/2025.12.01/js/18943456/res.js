$=new DOMParser().parseFromString($._,'text/html')?.getElementById('app')?.getAttribute('data-page');
$=$&&JSON.parse($).props?.post?.files;
return $?$.map(i=>[i.link,i.description||'']):''