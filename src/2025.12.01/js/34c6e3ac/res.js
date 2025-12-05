let parser = new DOMParser().parseFromString($._, "text/html");
let episodes = parser.querySelectorAll('.imagen a');
if(!episodes) return null;
let title = parser.querySelector('.data h1').textContent;
function xmlhttp(type, url, data){
	let x = new XMLHttpRequest;
	//x.timeout = 3000;
	if(type == "get"){
		x.open('GET', url, false);
		x.send();
	}
	else if(type == "post"){
		x.open('POST', url, false);
		x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		x.send(data);
	}
	return x.responseText;
}

function getVideoUrl(episodeUrl){
	let url = "https://hentaisea.com/wp-admin/admin-ajax.php";
	let html = xmlhttp('get', episodeUrl);
	let videoParser = new DOMParser().parseFromString(html, "text/html");
	let id = /(\d+)/.exec(videoParser.querySelector('link[rel=shortlink]').href)[1];
	let data = `action=doo_player_ajax&post=${id}&nume=1&type=tv`;
	html = xmlhttp('post', url, data);
	url = /src='([^']+)/.exec(html)[1];
	html = xmlhttp('get', url);
	let videoUrl = /file":"([^"]+)/.exec(html)[1];
	return videoUrl
}

function getAllEpiseodes(){
	let urls = [];
	let i = 1;
	let videoName = "";
	for(episode of episodes){
		let url = episode.href;
		let result = getVideoUrl(url);
		videoName = episodes.length > 1 ? `${title} - episode ${i}` : title;
		urls.push([result+'#mp4', videoName]);
		i++;
	}
	return urls;
}
let urls = getAllEpiseodes();
return urls;