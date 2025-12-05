$._=JSON.parse($._).data;
$=$[2][0]==='m' ? $._.versions[0].imageGroup : $._;
return $?.images?.map(i=>[i.imageUrl])||''