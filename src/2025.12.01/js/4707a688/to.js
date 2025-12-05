if($[0].indexOf('.mp4?')>0)return''
var p=this.node
if(window.location.hostname.slice(-13)=='.facebook.com' && (document.evaluate('./ancestor::div[contains(@class, "stageWrapper")]', p, null, 9, null).singleNodeValue || p.matches('.UFICommentContent>div[data-testid], a>abbr>span.timestampContent, #fbProfileCover>a:first-child')))return''
p=p.pathname||(p=p.parentNode)&&p.pathname||(p=p.parentNode)&&p.pathname||p.closest('a')?.href
p=p&&p.match(/^\/([\w.-]+)\/?$/)||p
return 'https://facebook.com/' + (p?.[1].length>1?p[1].replace(/^\w+-(\d{8,})$/, '$1')+'/photos/' : 'photo.php?fbid=') + p?.match(/\/photo\D+(\d+)/)?.[1]||$[1]