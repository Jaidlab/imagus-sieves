$ = JSON.parse($._).data.children[0].data
if ($.crosspost_parent&&$.crosspost_parent_list?.length) $ = $.crosspost_parent_list[0]

const loop = !$?.url.includes('.reddit.com/')&&this.find({href: $.url})
if(loop !== false && loop !== '')return {loop:$.url}

if ($.preview?.images?.[0]?.variants?.mp4?.source.url) {
    return [$.preview.images[0].variants.mp4.source.url + '#mp4', $.title]
}

if ($.preview?.reddit_video_preview?.hls_url) {
    return { loop: $.preview?.reddit_video_preview?.hls_url }
}

// prevent looping to the same page
//if ($.url.includes($.permalink)) return true;

return !$.url.includes($.permalink) && ($.is_video || $.is_gallery || this.TRG?.matches?.('faceplate-img') || ['youtube.com', 'youtu.be'].includes($.domain)) ? { loop: $.url } : $.preview?.images?.map(i=>i?.source?.url) || Object.values($.media_metadata||{})?.map(i=>i.s?.u) || true