if(!$[2]&&!$[4]){
$=$._.match(/searchResult=([^;]+)/)
$=$&&JSON.parse($[1]).hits||[]
return $.map(i=>['https://cdn'+[3,6,9][Math.floor(Math.random()*3)]+'-banquan.ituchong.com/weili/image/l/'+i.image_id+'.jpg',i.title])
}
var p,d='http://photos.'+($[1]||$[3])
$ = JSON.parse($._)
if(!$||!$.images)return null
p=$.post?[$.post.title, $.post.exerpt].filter(Boolean).join(' - '):'';
p = p ? '['+p+' by '+$.post.author.name+'] ':''
$=$.images
return $&&$.length ? $.map(function(x,i) {
 return [d + x.user_id + '/f/' + x.img_id + '.jpg', (!i&&p ? p : '')+[x.title, x.description].filter(Boolean).join(' - ')]
}) : null