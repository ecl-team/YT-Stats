function getPageContent(url) {
	var req = new XMLHttpRequest();
	req.open("GET", url, false);
	req.send();
	return req.responseText;
}
function Json(url) {
	return JSON.parse(getPageContent(url));
}

function channelJson(part, channel) {
	return Json("https://www.googleapis.com/youtube/v3/channels?part=" + part + "&id=" + channel.id + "&key=AIzaSyBZuZRr7b-LpYKHl4IilXp1ZCrSh64dznc");
}
function channelJsonFromId(part, id) {
	return Json("https://www.googleapis.com/youtube/v3/channels?part=" + part + "&id=" + id + "&key=AIzaSyBZuZRr7b-LpYKHl4IilXp1ZCrSh64dznc");
}
function channelJsonFromName(part, name) {
	return Json("https://www.googleapis.com/youtube/v3/channels?part=" + part + "&forUsername=" + name + "&key=AIzaSyBZuZRr7b-LpYKHl4IilXp1ZCrSh64dznc");
}
class Channel {
	constructor(channel) {
		if (channel.length == 24)
			this.id = channel;
		else
			this.id = channelJsonFromName("snippet", channel)["items"][0]["id"];
	}
	name() {
		return channelJson("snippet", this)["items"][0]["snippet"]["title"];
	}
	subs() {
		return parseInt(channelJson("statistics", this)["items"][0]["statistics"]["subscriberCount"]);
	}
	views() {
		return parseInt(channelJson("statistics", this)["items"][0]["statistics"]["viewCount"]);
	}
	uploads() {
		return parseInt(channelJson("statistics", this)["items"][0]["statistics"]["videoCount"]);
	}
}

function videoJson(part, video) {
	return Json("https://www.googleapis.com/youtube/v3/videos?part=" + part + "&id=" + video.id + "&key=AIzaSyBZuZRr7b-LpYKHl4IilXp1ZCrSh64dznc");
}
function videoJsonFromId(part, id) {
	return Json("https://www.googleapis.com/youtube/v3/videos?part=" + part + "&id=" + id + "&key=AIzaSyBZuZRr7b-LpYKHl4IilXp1ZCrSh64dznc");
}
class Video {
	constructor(video) {
		this.id = video;
	}
	name() {
		return channelJson("snippet", this)["items"][0]["snippet"]["title"];
	}
	views() {
		return parseInt(channelJson("statistics", this)["items"][0]["statistics"]["viewCount"]);
	}
	likes() {
		return parseInt(channelJson("statistics", this)["items"][0]["statistics"]["likeCount"]);
	}
	dislikes() {
		return parseInt(channelJson("statistics", this)["items"][0]["statistics"]["dislikeCount"]);
	}
	comments() {
		return parseInt(channelJson("statistics", this)["items"][0]["statistics"]["commentCount"]);
	}
}