if($._[0]!=='{'){
const id=$._.match(/data-id="([^"]+)/)?.[1]||$._.match(/previewItem\('([^']+)/)?.[1]
if(!id)return ''
return {loop:'https://api.'+$[1]+'API/Internal/V2/?request='+(/data-id="/.test($._)?'collection&type=public&folderI':'file-preview&i')+'d='+id}
}
const o=JSON.parse($._)
return o.download_url ? o.download_url+"#"+o.extension : o.data ? [...o.data.map(i=>[i.thumbnail.replace(/&w=[^&]+&h=[^&]+&m=.*/,'&w=1024&h=1024')])] : ''