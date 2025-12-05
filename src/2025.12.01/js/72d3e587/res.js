if($._[0]!=='{')return {loop:$._.match(/"metaUrl":\s+"([^"]+)/)[1]}
$=JSON.parse($._)
return $.videos ? [[['#'+$.videos[0].url,$.videos?.[1]?.url],$.meta?.title||'']] : ''