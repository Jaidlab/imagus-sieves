let url;
//if set to false, the largest possible media will be selected rather as opposed to web optimized media
let prefer_lowres=false;
if(prefer_lowres){
 url = ($._.match(/(?:src|large-link" href)="((?=https:\/\/cdn)[^"]+)/) || [])[1];
}else{
 url = ($._.match(/(?:secure_url" content|original-link" href)="([^"]+)/) || [])[1];
}
console.log(url);
return [url];