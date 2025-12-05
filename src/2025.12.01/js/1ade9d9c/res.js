var p = this,x = new XMLHttpRequest
x.open('POST', 'https://gql.twitch.tv/gql')
x.timeout = 3000
x.setRequestHeader('Client-ID', 'kimne78kx3ncx6brgo4mv6wki5h1ko')
x.send('[{"operationName":null,"variables":{},"query":' + JSON.stringify('{clip(slug:"' + $[1] + '"){broadcaster{displayName} createdAt game{name} video{id} title}}') + '},{"operationName":"VideoAccessToken_Clip","variables":{"slug":"' + $[1] + '"},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"36b89d2507fce29e5ca551df756d27c1cfe079e2609642b4390aa4c35796eb11"}}}]');
x.onloadend = function() {
 const response = JSON.parse(this.responseText);
 const c = response[0].data.clip;
 const c2 = response[1].data.clip;
 const signature = c2.playbackAccessToken.signature;
 const token = JSON.parse(c2.playbackAccessToken.value);
 p.prepareCaption(p.node, '[' + (c.game && c.game.name) + '] ' + [c.title, c.broadcaster && c.broadcaster.displayName, (new Date(c.createdAt)).toLocaleString(), c.video && 'https://twitch.tv/videos/' + c.video.id].filter(Boolean).join(' | '));
 p.set(c2.videoQualities.sort((a, b) => parseInt(b.quality) - parseInt(a.quality)).map(function(v, i) { return (i ? '' : '#') + (v.sourceURL + '?sig=' + signature + '&token=' + encodeURIComponent(JSON.stringify(token)))}));
}
return null