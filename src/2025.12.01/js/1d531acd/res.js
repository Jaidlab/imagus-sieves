if($._[0]!=='{'&&!this._flickr_key_){
  this._flickr_key_ = $._.match(/YUI_config\.flickr\.api\.site_key\s*=\s*"([^"]+)/)?.[1]||'9bb671af308f509d0c82146cbc936b3c';
  return {loop:$[0]};
}
  let res = [];
  let sizeAr = JSON.parse($._).sizes.size;
  let last = sizeAr.pop();
  if (last.media == 'video') {
    let best_quality = 0;
    let best_videoUrl = '';
    do {
      if (parseInt(last.height) > best_quality) {
        best_quality = parseInt(last.height);
        best_videoUrl = last.source;
      }
      last = sizeAr.pop();
    } while (last.media == 'video');
    res.push([best_videoUrl + '#mp4']);
  } else {
    res.push([last.source]);
  }
  return res;