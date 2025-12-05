if($[2]&&this.node.closest('div[class^="carousel"][role="presentation"]'))return 'https://www.reutersagency.com/null'+this.node.src
try{
return JSON.parse(document.scripts.__NEXT_DATA__.innerText).props.initialState.video.playlist.find(i=>RegExp(`${$[1].replace('?','\\?')}`).test(i.image)).canonical_url
}catch(e){
const u=document.body.outerHTML.match(/https:\/\/[^\/]+\/reuters\//)?.[0]
return $[2]&&u?u+$[2].match(/([^\/?]+)\?/)?.[1]+'\n//'+$[2]:'//'+($[2]||$[0]).replace(/.*filters:quality\(\d+\)\/(.*)/,'$1')
}