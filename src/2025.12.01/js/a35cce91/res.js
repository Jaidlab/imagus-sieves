if($[2]){
this.cd_type=JSON.parse($._).type
return {loop:'https://api.cyberdrop.me/api/file/auth/'+$[2]}
}
$=JSON.parse($._).url+(this.cd_type.startsWith('video')?'#mp4':'')
delete this.cd_type
return $