let toptext = $._.match(/<h1 class="capMultiLine">([^<]*)<\/h1>/)[1];

let mediaurl = "";

if($[1] == "photos") {
    mediaurl = $._.match(/<img class="photoPlayer" src="([^"]*)" alt/)[1];
}
else { //($[1] == "videos")
    mediaurl = $._.match(/<source src="([^"]*)" type/)[1];
}

return [mediaurl, toptext];