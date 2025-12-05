// To have the sieve work on media from private accounts, change 'use_account_token' in the above text box to true. When logged in, the sieve will use the token when requesting the media data file.

const config = {
  // Edit these variables to change how the sieve shows media

  show_480p_video_first: false, // Show 480p video, switch to higher with TAB

  show_thumbs_as_album: true, // Multi-image posts show images as an album

  show_pfp_if_no_media: false, // Show profile image instead of 'No Media' message

  use_vxtwitter_api_fallback: true, // Use third party API VXTwitter as backup

  use_fxtwitter_api_fallback: true, // Use third party API FXTwitter as backup

  // If both VXTwitter and FXTwitter are set to true, one is randomly chosen

  hide_third_party_api_message: false // Remove third party API caption message
}

const filename = $[0].match(/^https:\/\/[^\/]+\/([^\/]+)\/status\/(\d+).*/);
if(filename)this.CNT.filename = filename[1]+'-'+filename[2];

if($.base[0]==='d'){
const token = document.cookie.match(/\bct0=([^;]+)/)?.[1], lang = document.cookie.match(/\blang=([^;]+)/)?.[1], x = new XMLHttpRequest();
if(!token)return '';
x.open('GET',`https://x.com/i/api/graphql/nBS-WpgA6ZG0CyNHD517JQ/TweetDetail?variables=%7B%22focalTweetId%22:%22${$[2]}%22,%22with_rux_injections%22:false,%22rankingMode%22:%22Relevance%22,%22includePromotedContent%22:false,%22withCommunity%22:false,%22withQuickPromoteEligibilityTweetFields%22:false,%22withBirdwatchNotes%22:false,%22withVoice%22:false%7D&features=%7B%22rweb_tipjar_consumption_enabled%22:false,%22responsive_web_graphql_exclude_directive_enabled%22:false,%22verified_phone_label_enabled%22:false,%22creator_subscriptions_tweet_preview_api_enabled%22:false,%22responsive_web_graphql_timeline_navigation_enabled%22:false,%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22:false,%22communities_web_enable_tweet_community_results_fetch%22:false,%22c9s_tweet_anatomy_moderator_badge_enabled%22:false,%22articles_preview_enabled%22:false,%22responsive_web_edit_tweet_api_enabled%22:false,%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22:false,%22view_counts_everywhere_api_enabled%22:false,%22longform_notetweets_consumption_enabled%22:false,%22responsive_web_twitter_article_tweet_consumption_enabled%22:false,%22tweet_awards_web_tipping_enabled%22:false,%22creator_subscriptions_quote_tweet_preview_enabled%22:false,%22freedom_of_speech_not_reach_fetch_enabled%22:false,%22standardized_nudges_misinfo%22:false,%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22:false,%22rweb_video_timestamps_enabled%22:false,%22longform_notetweets_rich_text_read_enabled%22:false,%22longform_notetweets_inline_media_enabled%22:false,%22responsive_web_enhance_cards_enabled%22:false%7D`,false);
x.setRequestHeader('authorization','Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA');
x.setRequestHeader('content-type','application/json');
x.setRequestHeader('x-twitter-client-language',lang);
x.setRequestHeader('x-csrf-token',token);
x.send();
if(x.status!==200)return '';
$._=x.responseText;
}
let data = $._[0]==='{'&&JSON.parse($._);
if(!data)return null;
let qtData = data.data?.threaded_conversation_with_injections_v2?.instructions?.find(i=>i.entries)?.entries?.find(i=>i.entryId==='tweet-'+$[2])?.content?.itemContent?.tweet_results?.result?.quoted_status_result?.result || data.quoted_tweet;
data = data.data?.threaded_conversation_with_injections_v2?.instructions?.find(i=>i.entries)?.entries?.find(i=>i.entryId==='tweet-'+$[2])?.content?.itemContent?.tweet_results?.result || data;
data = data.tweet || data;
qtData = qtData?.tweet || qtData;
const upgradeImage = img => ['#'+img+'?name=orig'.replace('webp','jpg'), '#'+img+'?name=orig'.replace('webp','png'), img+'?name=large'.replace('webp','jpg'), img+'?name=large'.replace('webp','png')];
let idx, media = [], l = cfg.hz.hiRes&&config.show_480p_video_first;
const imgIdRegex = new RegExp(`${$[3]}`), pfp = (data.user||data.core?.user_results?.result?.legacy)?.profile_image_url_https?.replace(/_[a-z0-9]+\./, '.'), backupURL = config.use_fxtwitter_api_fallback&&config.use_vxtwitter_api_fallback ? ['v', 'f'][Math.floor(Math.random()*2)] : config.use_vxtwitter_api_fallback ? 'v' : config.use_fxtwitter_api_fallback ? 'f' : '';
if(!$[1]){
const text = data.text||data.legacy?.full_text||'', qtText = qtData?.text||qtData?.legacy?.full_text||'';
let mediaDetails = data.mediaDetails||data.legacy?.entities?.media||[], qtMediaDetails = qtData?.mediaDetails||qtData?.legacy?.entities?.media||[], card = data.card?.legacy?.binding_values||data.card?.binding_values?.unified_card?.string_value||data.card?.binding_values;
if(!$[3]){
if(mediaDetails)mediaDetails.forEach(i => {
	const isVideo = i.video_info ? true : false;
	i = isVideo ? i?.video_info?.variants.filter(i=>i.content_type==='video/mp4').sort((a,b)=>b.bitrate-a.bitrate).map(i=>i.url) : i.media_url_https;
	media.push(isVideo ? [[(l?'':'#')+i[0],(l?'#':'')+i.find(i=>/x[2,3,4]\d{2}\//.test(i))||''],(qtMediaDetails?.length?'Main tweet media: ':'')+text+(!qtMediaDetails?.length&&qtText?' | Quote tweet text: '+qtText:'')] : [upgradeImage(i),(qtMediaDetails?.length?'Main tweet media: ':'')+text+(!qtMediaDetails?.length&&qtText?' | Quote tweet text: '+qtText:'')]);
	})
if(qtMediaDetails)qtMediaDetails.forEach(i => {
	const isVideo = i.video_info ? true : false;
	i = isVideo ? i?.video_info?.variants.filter(i=>i.content_type==='video/mp4').sort((a,b)=>b.bitrate-a.bitrate).map(i=>i.url) : i.media_url_https;
	media.push(isVideo ? [[(l?'':'#')+i[0],(l?'#':'')+i.find(i=>/x[2,3,4]\d{2}\//.test(i))||''],'Quote tweet media: '+qtText+(!mediaDetails?.length&&text?' | Main tweet text: '+text:'')] : [upgradeImage(i),'Quote tweet media: '+qtText+(!mediaDetails?.length&&text?' | Main tweet text: '+text:'')]);
	})
   if(card){
   const embed = card.player_url?.string_value||Array.isArray(card)&&card.find(i=>i.key==='player_url')?.value?.string_value;
   if(embed){
     const loop = this.find({href:embed});
     if(loop !== false && loop !== '')return {loop:embed};
   }
   if(Array.isArray(card)){
media.push([card.find(i=>i.value?.type==='IMAGE').value.image_value.url.replace(/(&name=).+/,'$1orig'),text]);
   }else{
   media.push([typeof card==='string' ? [Object.values(JSON.parse(card)?.media_entities)?.[0]?.media_url_https,text] : ['#'+(card.photo_image_full_size_original||card.player_image_original||card.thumbnail_image_x_large)?.image_value?.url, (card.photo_image_full_size_large||card.player_image_x_large)?.image_value?.url],text]);
   }
  }
}else{
    const videoId = mediaDetails.concat(qtMediaDetails).find(i=>imgIdRegex.test(i.media_url_https))?.video_info?.variants?.filter(i=>i.content_type==='video/mp4').sort((a,b)=>b.bitrate-a.bitrate)?.[0].url?.match(/\/([^\/.]+)\.mp4/)?.[1]||'', videoIdRegex = videoId ? new RegExp(videoId) : null;
if(mediaDetails?.video_info?.variants?.some(i=>imgIdRegex.test(i.poster))||mediaDetails?.some(i=>imgIdRegex.test(i.media_url_https)))mediaDetails.forEach(i => {
	const isVideo = i.video_info ? true : false;
	i = isVideo ? i.video_info.variants.filter(i=>i.content_type==='video/mp4').sort((a,b)=>b.bitrate-a.bitrate).map(i=>i.url) : i.media_url_https;
	media.push(isVideo ? [[(l?'':'#')+i[0],(l?'#':'')+i.find(i=>/x[2,3,4]\d{2}\//.test(i))||''],text] : [upgradeImage(i),text]);
	})
	if(qtMediaDetails?.video_info?.variants?.some(i=>imgIdRegex.test(i.poster))||qtMediaDetails?.some(i=>imgIdRegex.test(i.media_url_https)))qtMediaDetails.forEach(i => {
	const isVideo = i.video_info ? true : false;
	i = isVideo ? i.video_info.variants.filter(i=>i.content_type==='video/mp4').sort((a,b)=>b.bitrate-a.bitrate).map(i=>i.url) : i.media_url_https;
	media.push(isVideo ? [[(l?'':'#')+i[0],(l?'#':'')+i.find(i=>/x[2,3,4]\d{2}\//.test(i))||''],qtText] : [upgradeImage(i),qtText]);
	})
   if(card){
   const embed = card.player_url?.string_value||Array.isArray(card)&&card.find(i=>i.key==='player_url')?.value?.string_value;
   if(embed){
     const loop = this.find({href:embed});
     if(loop !== false && loop !== '')return {loop:embed};
   }
     if(Array.isArray(card)){
  media.push([card.find(i=>i.value?.type==='IMAGE').value.image_value.url.replace(/(&name=).+/,'$1orig'),text]);
  }else{
   media.push([typeof card==='string' ? [Object.values(JSON.parse(card)?.media_entities)?.[0]?.media_url_https,text] : ['#'+(card.photo_image_full_size_original||card.player_image_original||card.thumbnail_image_x_large)?.image_value?.url, (card.photo_image_full_size_large||card.player_image_x_large)?.image_value?.url],text]);
    }
   }
idx = $[3]&&media.findIndex(i=>imgIdRegex.test(i[0][0])||videoIdRegex?.test(i[0][0]));
	}
return media?.length ? (!$[3] ? media : !config.show_thumbs_as_album ? [media[idx]] : {"":media,idx:idx}) : !text&&!qtText&&backupURL ? {loop:'https://api.'+backupURL+'xtwitter.com/status/'+$[2]+($[3]?'?img_id/'+$[3]:'')} : no_media(text)
} else {
   const backupMessage = !config.hide_third_party_api_message?'A third party API, '+$[1].slice(4).toUpperCase()+'Twitter, was used to get this media. For faster loading, the sieve can be set to use the account token when logged in. For more information, see the notes section of the X.COM-h-p sieve. | ':'';
   let videoId, videoIdRegex;
   if($[1][4]==='v'){
   this.loopStop = this.loopStop||0;
   const text = data.text;
   let mediaURLs = data.media_extended;
   if($[3]){
   if(!mediaURLs.some(i=>imgIdRegex.test(i.thumbnail_url))&&this.loopStop===0&&data.qrtURL){
   this.loopStop=1;
   return {loop:data.qrtURL.replace(/^.+(\.com\/).*(status\/\d+).*/,(t,g1,g2)=>'https://api.vxtwitter'+g1+g2+($[3]?'?img_id'+$[3]:''))};
   }
   videoId = mediaURLs.find(i=>imgIdRegex.test(i.thumbnail_url))?.url?.match(/\/([^\/.]+)\.mp4/)?.[1]||'', videoIdRegex = videoId ? new RegExp(videoId) : null;
   }
   media = mediaURLs.map(i=>[(i.type==='video'||/\.mp4/.test(i.url)?i.url:upgradeImage(i.url)),backupMessage+text]);
   idx = $[3]&&media.findIndex(i=>imgIdRegex.test(i[0])||videoIdRegex?.test(i[0]));
   delete this.loopStop;
} else {
   const text = data.tweet?.text||'',qtText = data.quote?.text||'';
   let mediaURLs = data.media?.all||[],qtMediaURLs = data.quote?.media?.all||[];
   if(!$[3]){
    mediaURLs.forEach(i => {
	const isVideo = /\.mp4/.test(i.url) ? true : false;
	i = isVideo ? i?.variants.filter(i=>i.content_type==='video/mp4').sort((a,b)=>b.bitrate-a.bitrate).map(i=>i.url) : i.url;
	media.push(isVideo ? [[(l?'':'#')+i[0],(l?'#':'')+i.find(i=>/x[2,3,4]\d{2}\//.test(i))||''],backupMessage+text] : [upgradeImage(i),backupMessage+text]);
	})
    }else{
    videoId = mediaURLs.concat(qtMediaURLs).find(i=>imgIdRegex.test(i.thumbnail_url))?.variants?.filter(i=>i.content_type==='video/mp4').sort((a,b)=>b.bitrate-a.bitrate)?.[0].url?.match(/\/([^\/.]+)\.mp4/)?.[1]||'', videoIdRegex = videoId ? new RegExp(videoId) : null;
    if(mediaURLs?.some(i=>imgIdRegex.test(i.thumbnail_url))||mediaURLs?.some(i=>imgIdRegex.test(i.url)))mediaURLs.forEach(i => {
	const isVideo = /\.mp4/.test(i.url) ? true : false;
	i = isVideo ? i.variants.filter(i=>i.content_type==='video/mp4').sort((a,b)=>b.bitrate-a.bitrate).map(i=>i.url) : i.url;
	media.push(isVideo ? [[(l?'':'#')+i[0],(l?'#':'')+i.find(i=>/x[2,3,4]\d{2}\//.test(i))||''],backupMessage+text] : [upgradeImage(i),backupMessage+text]);
	})
	if(qtMediaURLs?.some(i=>imgIdRegex.test(i.thumbnail_url))||qtMediaURLs?.some(i=>imgIdRegex.test(i.url)))qtMediaURLs.forEach(i => {
	const isVideo = i.format?.startsWith('video') ? true : false;
	i = isVideo ? i.variants.filter(i=>i.content_type==='video/mp4').sort((a,b)=>b.bitrate-a.bitrate).map(i=>i.url) : i.url;
	media.push(isVideo ? [[(l?'':'#')+i[0],(l?'#':'')+i.find(i=>/x[2,3,4]\d{2}\//.test(i))||''],qtText] : [upgradeImage(i),backupMessage+qtText]);
	})
  idx = media.findIndex(i=>imgIdRegex.test(i[0][0])||videoIdRegex?.test(i[0][0]));
	}
	}
return media?.length ? (!$[3] ? media : !config.show_thumbs_as_album ? [media[idx]] : {"":media,idx:idx}) : ''
}
function no_media(t){
return config.show_pfp_if_no_media&&pfp ? [pfp,'No media. Tweet text: '+t] : [ 'data:image/svg+xml,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" height="100" width="540" style="background-color: #2a2a2a;">
      <foreignObject height="100%" width="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display: table; height: 100%; width: 100%;">
          <span style="color: tomato; display: table-cell; font: 36px sans-serif; vertical-align: middle; text-align: center; white-space: pre-wrap;">
            No media
          </span>
        </div>
      </foreignObject>
    </svg>`.replace(/\n\s+/g, '')), 'Tweet text: '+t ]
}