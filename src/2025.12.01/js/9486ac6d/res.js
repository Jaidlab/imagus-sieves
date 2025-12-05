if($[2])return [$._.match(/<source type="video\/mp4"\s+src="([^"]+)/)?.[1]||'', $._.match(/="description" content=([^"]+)/)?.[1]||''];

$._=$._.match(RegExp(`href="/([^"]+)" title="[^"]*" itemprop="contentUrl" data-index="\\d+" data-size="\\d+x\\d+"><img src="/files/${$[3]}`))
return $._[1] ? '//'+$[1]+$._[1] : ''