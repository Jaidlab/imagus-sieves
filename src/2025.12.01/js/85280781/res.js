const f=this.find, u=$._.match(/data-src="(https:\/\/(?:[^\/]+\/)+)1(t\.[^"]+)/), n=parseInt($._.match(/<li class="pages">Pages:\s*(\d+)/)?.[1]||0)
if(!u||!n)return this.node.src?{loop:this.node.src.replace('thumb','1t')}:''
$=[]
for(i=1;i<=n;i++)$.push([f({src: u[1]+i+u[2]})])
return $