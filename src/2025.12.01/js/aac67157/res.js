if($[3])return {loop:$._.match(/SourcePathLink"[^>]+href="([^"]+)/)?.[1]||''}
if(!$[1]){
$=JSON.parse($._).content?.streams?.pop()?.url;
return $ ? {loop:$} : ''
}
this.yandex_vid_data=this.yandex_vid_data||Object.values(JSON.parse($._.match(/({"widgets":{"@card\/(?:Actions|StickyOffer|PublicProfileReviewSnippet)":.+?)<\/noframes>/)?.[1]||'{}').collections?.mediaItem);
$=this.yandex_vid_data.find(i=>RegExp($[1].slice(0,-7)).test(i.previewUrl));
return {loop:$.streams[0].url}