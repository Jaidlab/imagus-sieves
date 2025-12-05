if(!$[3]){
$=JSON.parse($._.match(/"__UNIVERSAL_DATA_FOR_REHYDRATION__" type="application\/json">({.+?})<\/script/)[1]).__DEFAULT_SCOPE__["webapp.video-detail"].itemInfo.itemStruct;
if(/tiktok\.com$/.test(location.hostname)){
let a=$.author?.nickname,m=$.music,t=['[' + new Date($.createTime*1e3).toLocaleString() + ']', '@'+a, $.desc, '&#9834;', m.authorName + ' - ' + m.title].join(' '),v=$.video.playAddr.length?$.video:$.imagePost.images.map((i,n)=>[i.imageURL.urlList[0],(!n?t:'')]);
return Array.isArray(v) ? v : [(v.playAddr || v.downloadAddr) + '#mp4',t]
}
this._TikTokTime=new Date($.createTime*1e3).toLocaleString();
return {loop:'https://www.tiktok.com/embed/v2/'+$.id}
}
$=JSON.parse($._.match(/"__FRONTITY_CONNECT_STATE__" type="application\/json">({.+?})<\/script/)[1]).source.data[`/embed/v2${$[3]}`].videoData;
let a=$.authorInfos?.nickName,m=$.musicInfos,t=[this._TikTokTime?.replace(/.*/,'[ $& ]')||'', '@'+a, $.itemInfos?.text, '&#9834;', m.authorName + ' - ' + m.musicName].join(' '),v=$.itemInfos.video.urls[0];
delete this._TikTokTime;
return [v+'#mp4',t]