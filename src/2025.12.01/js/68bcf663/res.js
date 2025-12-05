let o=$._.match(/"(?:photo|total":\d+,"item)s":(\[[^\]]+\])/), n=$._.match(/href="([^"]+)" rel="next"/), m=this._xh_||[];
delete this._xh_;
o=o?JSON.parse(o[1]):[];
if($[1])return o.find(i=>i.id==$[1])?.imageURL;
o.forEach(i=>m.push([i.imageURL]));
if(n&&n[1]!==$[0]){
this._xh_=m;
return {loop:n[1]};
}
return  m