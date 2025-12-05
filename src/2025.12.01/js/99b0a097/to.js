let n=this.node, m;
if(m=n.closest('.video-resource'))return '//fave.api.cnn.io/v1/video?id='+m.getAttribute('data-video-id')+'&stellarUri='+m.getAttribute('data-uri');
return $[1] ? $[1]+'?c=original' : n.querySelector('img')?.src?.replace(/(\?c=).+/,'$1original')||''