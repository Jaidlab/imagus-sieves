if($[1][0]==='i')return {loop:$._.match(/vnd\.apple\.mpegURL" src="([^"]+)/)?.[1]||''}
const v=$._.match(/<iframe\n?\s+src="([^?"]+)/)?.[1]
$=[...new DOMParser().parseFromString($._,'text/html').querySelectorAll('div[x-data]')].find(i=>/thumbnail_url_complete/.test(i.getAttribute('wire:initial-data')))?.getAttribute('wire:initial-data')
$=$&&JSON.parse($)?.serverMemo?.data?.post?.media
return $?.[0]?.url_complete ? $.map(i=>[['#'+i.url_complete,i.low_res_url_complete],i.description||'']) : v ? {loop:v} : ''