let n=$[2]!=='post_img'&&this.node.parentNode;
if($[5])n=n.offsetParent;
n=n&&(n?.getAttribute('data-webm')||(n?.getAttribute('data-source')+'.mp4'));
return n||$[1]+$[3]+'.gif\n'+$[1]+'big/'+$[3]+'.jpg\n'+$[1]+'big/'+$[3]+$[4]+'\n'+$[1]+$[3]+$[4]