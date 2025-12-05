$data = JSON.parse($._);
if($data['video'] != null){
    $url = $data['video']['video'];
}else {$url = $data['image'];}
$caption = `${$data['title']} - by ${$data['owner_displayname']}`;
$res = [$url, $caption];
return $res;